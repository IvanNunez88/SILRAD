import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SolicitudService } from '@/layout/service/Solicitud.service';
import { UtilidadService } from '@/layout/service/Utilidad.service';
import { Table } from 'primeng/table';
import { ModalSolicitudComponent } from './ModalSolicitud/ModalSolicitud.component';
import { ModalRegistroProveedorComponent } from './ModalRegistroProveedor/ModalRegistroProveedor.component';
import { ModalSolicitudGlobalComponent } from './ModalSolicitudGlobal/ModalSolicitudGlobal.component';
import { ModalRegistroProveedorGlobalComponent } from './ModalRegistroProveedorGlobal/ModalRegistroProveedorGlobal.component';
import { EmbarqueService } from '@/layout/service/Embarque.service';

@Component({
    selector: 'app-Solicitud',
    templateUrl: './Solicitud.component.html',
    styleUrls: ['./Solicitud.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class SolicitudComponent implements OnInit {
    listaSolicitud: iRepSolicitud[] = [];
    ref: DynamicDialogRef | undefined;
    mostrarLoading: boolean = false;
    columnasTabla: string[] = ['idSolicitud', 'tipoSolicitud', 'cliente', 'Modalidad', 'origen', 'destino', 'codMoneda', 'monto', 'trasbordo', 'cruce', 'fecEfectivaF'];

    constructor(
        private dialog: DialogService,
        private messageService: MessageService,
        private _solicitudServicio: SolicitudService,
        private _utilidadServicio: UtilidadService,
        private _embarqueServicio: EmbarqueService,
        private confirmationService: ConfirmationService
    ) {}

    async ngOnInit(): Promise<void> {
        await this.cargaInfo();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async registroSolicitud() {
        this.ref = this.dialog.open(ModalSolicitudComponent, {
            header: 'Solicitud',
            width: '820px',
            height: '550px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            data: null
        });

        this.ref.onClose.subscribe(async (resultado: boolean) => {
            if (resultado) {
                await this.cargaInfo();
            }
        });
    }

    async registrarSolicitudGlobal() {
        this.ref = this.dialog.open(ModalSolicitudGlobalComponent, {
            header: 'Solicitud Global',
            width: '820px',
            height: '330px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            data: null
        });
    }

    async actualizarSolicitud(registro: iRepSolicitud) {
        let idTipoSolicitud: number = registro.idTipoSolicitud;

        if (idTipoSolicitud == 1) {
            this.ref = this.dialog.open(ModalSolicitudComponent, {
                header: 'Solicitud',
                width: '820px',
                height: '550px',
                modal: true,
                focusOnShow: false,
                closable: true,
                draggable: true,
                data: registro
            });

            this.ref.onClose.subscribe(async (resultado: boolean) => {
                if (resultado) {
                    await this.cargaInfo();
                }
            });
        } else if (idTipoSolicitud == 2) {
            this.ref = this.dialog.open(ModalSolicitudGlobalComponent, {
                header: 'Solicitud Global',
                width: '820px',
                height: '330px',
                modal: true,
                focusOnShow: false,
                closable: true,
                draggable: true,
                data: registro
            });
            this.ref.onClose.subscribe(async (resultado: boolean) => {
                if (resultado) {
                    await this.cargaInfo();
                }
            });
        }
    }

    async registroProveedor(registro: iRepSolicitud) {
        if (registro.idTipoSolicitud == 1) {
            //MATCH CON RUTAS DE LOS PROVEEDORES
            this.ref = this.dialog.open(ModalRegistroProveedorComponent, {
                header: 'Registro proveedor',
                width: '1300px',
                // height: '1400px',
                modal: true,
                focusOnShow: false,
                closable: true,
                draggable: true,
                data: registro
            });

            this.ref.onClose.subscribe(() => {
                this.cargaInfo();
            });
        } else if (registro.idTipoSolicitud == 2) {
            this.ref = this.dialog.open(ModalRegistroProveedorGlobalComponent, {
                header: 'Registro proveedor',
                width: '820px',
                height: '550px',
                modal: true,
                focusOnShow: false,
                closable: true,
                draggable: true,
                data: registro
            });
        }
    }

    async cargaInfo() {
        this.mostrarLoading = true;

        const usuario: any = await this._utilidadServicio.obtenerSesionUsuario();

        this._solicitudServicio.listaSolicitudByUsuario(usuario[0].idUsuario).subscribe({
            next: async (data) => {
                if (data.status) {
                    const lstInfo: Array<any> = await data.value.map(
                        (lst: {
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
                            cantidad: number;
                            btnRD: boolean;
                        }) => ({
                            referencia: lst.referencia,
                            idSolicitud: lst.idSolicitud,
                            idEmpresa: lst.idEmpresa,
                            empresa: lst.empresa,
                            idCliente: lst.idCliente,
                            cliente: lst.cliente,
                            idTipoUnidad: lst.idTipoUnidad,
                            tipoUnidad: lst.tipoUnidad,
                            idTipoServicio: lst.idTipoServicio,
                            tipoServicio: lst.tipoServicio,
                            idOrigen: lst.idOrigen,
                            origen: lst.origen,
                            idDestino: lst.idDestino,
                            destino: lst.destino,
                            fecEfectiva: lst.fecEfectiva,
                            fecEfectivaF: lst.fecEfectivaF,
                            idMoneda: lst.idMoneda,
                            codMoneda: lst.codMoneda,
                            monto: lst.monto,
                            isTrasbordo: lst.isTrasbordo,
                            isCruce: lst.isCruce,
                            tipoMercancia: lst.tipoMercancia,
                            observaciones: lst.observaciones,
                            idClasificacion: lst.idClasificacion,
                            isRedondo: lst.isRedondo,
                            estatus: lst.estatus,
                            fecRegistro: lst.fecRegistro,
                            fecRegistroF: lst.fecRegistroF,
                            contacto: lst.contacto,
                            correo: lst.correo,
                            idModalidad: lst.idModalidad,
                            tipoSolicitud: lst.tipoSolicitud,
                            idTipoSolicitud: lst.idTipoSolicitud,
                            cantidad: lst.cantidad,
                            btnRD: lst.cantidad == 0 ? true : false
                        })
                    );

                    this.listaSolicitud = lstInfo;
                } else {
                    this.listaSolicitud = [];
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

    async cancelarSolicitud(event: Event, registro: iRepSolicitud) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            header: 'Confirmación',
            message: '¿Deseas cancelar la solicitud?',
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
                label: 'No',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Si',
                severity: 'danger'
            },
            accept: () => {
                this.mostrarLoading = true;

                this._solicitudServicio.cancelar(registro.idSolicitud).subscribe({
                    next: async (data) => {
                        if (data.status) {
                            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Solicitud Cancelada', life: 3000 });
                            this.mostrarLoading = false;
                            await this.cargaInfo();
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

    async generarRD(event: Event, registro: iRepSolicitud) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            header: 'Confirmación',
            message: '¿Deseas generar el RD?',
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
                label: 'No',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Si',
                severity: 'success'
            },
            accept: () => {
                this.mostrarLoading = true;

                const dicDatos: Record<string, any> = {
                    ['idSolicitud']: registro.idSolicitud
                };

                this._embarqueServicio.guardar(dicDatos).subscribe({
                    next: async (data) => {
                        if (data.status) {
                            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'RD Generado con éxito', life: 3000 });
                            this.mostrarLoading = false;
                            await this.cargaInfo();
                        } else {
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
    cantidad: number;
}
