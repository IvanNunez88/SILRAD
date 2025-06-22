import { CargoService } from '@/layout/service/Cargo.service';
import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { SolicitudService } from '@/layout/service/Solicitud.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilidadService } from '@/layout/service/Utilidad.service';

@Component({
    selector: 'app-ModalSecundariaCostoAdicional',
    templateUrl: './ModalSecundariaCostoAdicional.component.html',
    styleUrls: ['./ModalSecundariaCostoAdicional.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalSecundariaCostoAdicionalComponent implements OnInit {
    mostrarLoading: boolean = false;
    frmCosto: FormGroup;
    listaCatCargo: iCatCargo[] = [];
    embarque?: iReporteProveedorRuta;
    listaConsulSolicitudCargos: iConsultaCargos[] = [];
    columnasTabla: string[] = ['cargo', 'monto', 'usuario', 'fecRegistro'];

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private _cargoServicio: CargoService,
        private messageService: MessageService,
        private _utilidadServicio: UtilidadService,
        private _solicitudServicio: SolicitudService,
        private confirmationService: ConfirmationService
    ) {
        this.frmCosto = this.fb.group({
            idCargo: [0],
            monto: [0]
        });

        if (this.config.data != null) {
            this.embarque = this.config.data as iReporteProveedorRuta;
        }
    }

    async ngOnInit(): Promise<void> {
        await this.cargaCargos();
        await this.cargaCatCargo();
    }

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async cargaCatCargo() {
        this._cargoServicio.listaCatCargoBySolicitudRuta(this.embarque?.idSolicitud!, this.embarque?.idRuta!).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatCargo = await data.value;
                } else {
                    this.listaCatCargo = [];
                }
            }
        });
    }

    async cargaCargos() {
        this.mostrarLoading = true;

        this._solicitudServicio.listaSolicitudCargos(this.embarque?.idSolicitud!, this.embarque?.idRuta!).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaConsulSolicitudCargos = await data.value;
                } else {
                    this.listaConsulSolicitudCargos = [];
                }
            },
            complete: () => {
                this.mostrarLoading = false;
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error, favor de contactar al administrador del sitio.', life: 3000 });
                this.mostrarLoading = false;
            }
        });
    }

    async guardarCargo() {
        this.mostrarLoading = true;

        const usuario: any = await this._utilidadServicio.obtenerSesionUsuario();

        const dicDatos: Record<string, any> = {
            ['idSolicitud']: this.embarque?.idSolicitud!,
            ['idUsuario']: usuario[0].idUsuario,
            ['idRuta']: this.embarque?.idRuta!,
            ['idCargo']: this.frmCosto.value.idCargo,
            ['monto']: this.frmCosto.value.monto == null ? 0 : this.frmCosto.value.monto
        };

        this._solicitudServicio.guardarCargo(dicDatos).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Cargo registrado con éxito', life: 3000 });
                    await this.cargaCargos();
                    await this.cargaCatCargo();
                    await this.borrarDatos();
                    this.mostrarLoading = false;
                } else {
                    this.mostrarLoading = false;
                    this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: data.msg, life: 3000 });
                }
            },
            complete: () => {
                this.mostrarLoading = false;
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error, favor de contactar al administrador del sitio.', life: 3000 });
                this.mostrarLoading = false;
            }
        });
    }

    async borrarDatos() {
        this.frmCosto.patchValue({
            idCargo: 0,
            monto: 0
        });
    }

    async borrarCargo(event: Event, registrado: iConsultaCargos) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            header: 'Confirmación',
            message: `¿Deseas borrar el cargo ${registrado.cargo}? `,
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Borrar',
                severity: 'danger'
            },
            accept: () => {
                this.mostrarLoading = true;

                this._solicitudServicio.borrarCargo(this.embarque?.idSolicitud!, this.embarque?.idRuta!, registrado.idCargo).subscribe({
                    next: async (data) => {
                        if (data.status) {
                            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Cargo eliminado', life: 3000 });
                            await this.cargaCargos();
                            await this.cargaCatCargo();
                            this.mostrarLoading = false;
                        } else {
                            this.mostrarLoading = false;
                            this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: data.msg, life: 3000 });
                        }
                    },
                    complete: () => {
                        this.mostrarLoading = false;
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error, favor de contactar al administrador del sitio.', life: 3000 });
                        this.mostrarLoading = false;
                    }
                });
            }
        });
    }
}

interface iCatCargo {
    idCargo: number;
    cargo: string;
}

interface iConsultaCargos {
    idSolicitud: number;
    idRuta: number;
    usuario: string;
    idCargo: number;
    cargo: string;
    monto: number;
    codMoneda: string;
    fecRegistro: string;
}

interface iReporteProveedorRuta {
    idSolicitud: number;
    idEmbarque: number;
    idRuta: number;
    noUnidad: string;
    proveedor: string;
    codMoneda: string;
    tarifa: number;
    origen: string;
    destino: string;
}
