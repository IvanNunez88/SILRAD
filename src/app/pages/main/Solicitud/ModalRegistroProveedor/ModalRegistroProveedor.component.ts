import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { iCatProveedor } from '@/Interfaces/iCatProveedor';
import { RutaService } from '@/layout/service/Ruta.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SolicitudMatchService } from '@/layout/service/SolicitudMatch.service';

@Component({
    selector: 'app-ModalRegistroProveedor',
    templateUrl: './ModalRegistroProveedor.component.html',
    styleUrls: ['./ModalRegistroProveedor.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalRegistroProveedorComponent implements OnInit {
    mostrarLoading: boolean = false;
    solicitud?: iRepSolicitud;
    listaCatProveedor: iCatProveedor[] = [];
    listaProveedorRuta: iProveedoRuta[] = [];
    listaMatch: iMatch[] = [];
    frmRuta: FormGroup;
    columnasTabla: string[] = ['proveedor', 'utilizada', 'tipoUnidad', 'origen', 'destino', 'clasificacion', 'tarifa', 'comentario'];
    columnaTablaRuta: string[] = ['proveedor', 'tipoUnidad', 'origen', 'destino', 'clasificacion', 'tarifa'];

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private messageService: MessageService,
        private ref: DynamicDialogRef,
        private _rutaServicio: RutaService,
        private _solicitudMatchServicio: SolicitudMatchService,
        private confirmationService: ConfirmationService
    ) {
        this.solicitud = this.config.data as iRepSolicitud;

        this.frmRuta = this.fb.group({
            idProveedor: [0]
        });
    }

    async ngOnInit(): Promise<void> {
        await this.cargarCatProveedor();
        await this.cargaMatch();
    }

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async cargarCatProveedor() {
        const idTipoUnidad: number = this.solicitud?.idTipoUnidad ?? 0;
        const idOrigen: number = this.solicitud?.idOrigen ?? 0;
        const idDestino: number = this.solicitud?.idDestino ?? 0;
        const idClasificacion: number = this.solicitud?.idClasificacion ?? 0;
        const idMoneda: number = this.solicitud?.idMoneda ?? 0;
        const idTipoServicio: number = this.solicitud?.idTipoServicio ?? 0;

        this._rutaServicio.listaCatRutaProveedor(idTipoUnidad, idOrigen, idDestino, idClasificacion, idMoneda, idTipoServicio).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatProveedor = await data.value;
                }
            }
        });
    }

    async cargaProveedorRutas() {
        this.mostrarLoading = true;

        const idProveedor: number = this.frmRuta.value.idProveedor;
        const idTipoUnidad: number = this.solicitud?.idTipoUnidad ?? 0;
        const idOrigen: number = this.solicitud?.idOrigen ?? 0;
        const idDestino: number = this.solicitud?.idDestino ?? 0;
        const idClasificacion: number = this.solicitud?.idClasificacion ?? 0;
        const idMoneda: number = this.solicitud?.idMoneda ?? 0;
        const idTipoServicio: number = this.solicitud?.idTipoServicio ?? 0;

        this._rutaServicio.listaProveedorRuta(idProveedor, idTipoUnidad, idOrigen, idDestino, idClasificacion, idMoneda, idTipoServicio).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaProveedorRuta = await data.value;
                } else {
                    this.listaProveedorRuta = [];
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

    async cargaMatch() {
        this._solicitudMatchServicio.listaMatch(this.solicitud?.idSolicitud!).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaMatch = await data.value;
                } else {
                    this.listaMatch = [];
                }
            },
            complete: () => {},
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error, favor de contactar al administrador del sitio.', life: 3000 });
            }
        });
    }

    async registroProveedorRuta(registro: iProveedoRuta) {
        if (this.fnValidaGridContenido(this.solicitud?.idTipoServicio!)) {
            const dicDatos: Record<string, any> = {
                ['idSolicitud']: this.solicitud?.idSolicitud!,
                ['idRuta']: registro.idRuta,
                ['tarifa']: registro.costo
            };

            this._solicitudMatchServicio.guardar(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Proveedor Agreado', life: 3000 });
                        await this.cargaMatch();
                    } else {
                        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: data.msg, life: 3000 });
                    }
                },
                complete: () => {},
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error, favor de contactar al administrador del sitio.', life: 3000 });
                }
            });
        } else {
            this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Lo embarques nacionales no pueden tener más de un proveedor', life: 3000 });
        }
    }

    async borrarProveedorRuta(event: Event, registro: iMatch) {
        const idSolicitud: number = this.solicitud?.idSolicitud!;
        const IdRuta: number = registro.idRuta;

        this.confirmationService.confirm({
            target: event.target as EventTarget,
            header: 'Confirmación',
            message: '¿Deseas borrar al proveedor?',
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
                this._solicitudMatchServicio.borrarMatch(idSolicitud, IdRuta).subscribe({
                    next: async (data) => {
                        if (data.status) {
                            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Proveedor Eliminado', life: 3000 });
                            await this.cargaMatch();
                        } else {
                            this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: data.msg, life: 3000 });
                        }
                    },
                    complete: () => {},
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error, favor de contactar al administrador del sitio.', life: 3000 });
                    }
                });
            }
        });
    }

    private fnValidaGridContenido(idTipoServicio: number): boolean {
        let resultado: boolean = true;
        if (idTipoServicio == 1) {
            //SOLAMENTE EN LOS NACIONALES DEBE HABER 1 SOLO PROVEEDOR
            if (this.listaMatch.length == 1) {
                resultado = false;
            }
        }

        return resultado;
    }
}

interface iMatch {
    idSolicitud: number;
    idRuta: number;
    idProveedor: number;
    proveedor: string;
    tipoUnidad: string;
    origen: string;
    destino: string;
    clasificacion: string;
    tarifa: string;
}

interface iProveedoRuta {
    idRuta: number;
    proveedor: string;
    tipoUnidad: string;
    origen: string;
    destino: string;
    clasificacion: string;
    tarifa: string;
    comentario: string;
    costo: number;
    utilizada: number;
}

interface iRepSolicitud {
    referencia: string;
    idSolicitud: number;
    idEmpresa: number;
    empresa: string;
    idCliente: number;
    cliente: string;
    idTipoUnidad: number;
    tipoUnidad: string;
    idTipoServicio: number;
    tipoServicio: string;
    idOrigen: number;
    origen: string;
    idDestino: number;
    destino: string;
    fecEfectiva: Date;
    fecEfectivaF: string;
    idMoneda: number;
    codMoneda: string;
    monto: number;
    isTrasbordo: boolean;
    isCruce: boolean;
    tipoMercancia: string;
    observaciones: string;
    idClasificacion: number;
    isRedondo: boolean;
    estatus: string;
    fecRegistro: Date;
    fecRegistroF: string;
    contacto: string;
    correo: string;
    idModalidad: number;
    tipoSolicitud: string;
    idTipoSolicitud: number;
}
