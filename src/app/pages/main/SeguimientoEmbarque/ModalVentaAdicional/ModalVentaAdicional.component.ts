import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CargoService } from '@/layout/service/Cargo.service';
import { EmbarqueService } from '@/layout/service/Embarque.service';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilidadService } from '@/layout/service/Utilidad.service';

@Component({
    selector: 'app-ModalVentaAdicional',
    templateUrl: './ModalVentaAdicional.component.html',
    styleUrls: ['./ModalVentaAdicional.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalVentaAdicionalComponent implements OnInit {
    mostrarLoading: boolean = false;
    frmVenta: FormGroup;
    idEmbarque: number = 0;
    listaCatCargo: iCatCargo[] = [];
    listaConsulEmbarqueVenta: iConsultaEmbarqueVenta[] = [];
    columnasTabla: string[] = ['cargo', 'venta', 'usuario', 'fecRegistro'];

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private _cargoServicio: CargoService,
        private messageService: MessageService,
        private _embarqueServicio: EmbarqueService,
        private _utilidadServicio: UtilidadService,
        private confirmationService: ConfirmationService
    ) {
        this.frmVenta = this.fb.group({
            idCargo: [0],
            venta: [0]
        });

        this.idEmbarque = this.config.data;
    }

    async ngOnInit(): Promise<void> {
        await this.cargaCatCargo();
        await this.cargaInfoTabla();
    }

    async cargaCatCargo() {
        this._cargoServicio.listaCatCargoByCargoEmbarque(this.idEmbarque).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatCargo = await data.value;
                } else {
                    this.listaCatCargo = [];
                }
            }
        });
    }

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async cargaInfoTabla() {
        this.mostrarLoading = true;

        this._embarqueServicio.listaConsulEmbarqueVenta(this.idEmbarque).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaConsulEmbarqueVenta = await data.value;
                    this.mostrarLoading = false;
                } else {
                    this.listaConsulEmbarqueVenta = [];
                    this.mostrarLoading = false;
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

    async borrarVenta(event: Event, registrado: iConsultaEmbarqueVenta) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            header: 'Confirmación',
            message: '¿Deseas borrar la venta?',
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

                this._embarqueServicio.borrarVenta(this.idEmbarque, registrado.idCargo).subscribe({
                    next: async (data) => {
                        if (data.status) {
                            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Documento eliminado', life: 3000 });
                            await this.cargaCatCargo();
                            await this.cargaInfoTabla();
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

    async guardarVenta() {
        this.mostrarLoading = true;

        const usuario: any = await this._utilidadServicio.obtenerSesionUsuario();

        const dicDatos: Record<string, any> = {
            ['idEmbarque']: this.idEmbarque,
            ['idUsuario']: usuario[0].idUsuario,
            ['idCargo']: this.frmVenta.value.idCargo,
            ['monto']: this.frmVenta.value.venta == null ? 0 : this.frmVenta.value.venta
        };

        this._embarqueServicio.guardarVenta(dicDatos).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Venta registrada con éxito', life: 3000 });
                    await this.cargaCatCargo();
                    await this.cargaInfoTabla();
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
        this.frmVenta.patchValue({
            idCargo: 0,
            venta: 0
        });
    }
}

interface iCatCargo {
    idCargo: number;
    cargo: string;
}

interface iConsultaEmbarqueVenta {
    idEmbarque: number;
    idUsuario: number;
    usuario: string;
    idCargo: number;
    cargo: string;
    codMoneda: string;
    monto: number;
    fecRegistro: string;
}
