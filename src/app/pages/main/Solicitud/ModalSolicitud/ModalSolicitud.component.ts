import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '@/layout/service/Cliente.service';
import { UtilidadService } from '@/layout/service/Utilidad.service';
import { EmpresaService } from '@/layout/service/Empresa.service';
import { TipoServicioService } from '@/layout/service/TipoServicio.service';
import { TipoUnidadService } from '@/layout/service/TipoUnidad.service';
import { MunicipioService } from '@/layout/service/Municipio.service';
import { ClasificacionService } from '@/layout/service/Clasificacion.service';
import { MonedaService } from '@/layout/service/Moneda.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SolicitudService } from '@/layout/service/Solicitud.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { iCatMunicipio } from '@/Interfaces/iCatMunicipio';
import { iCatTipoServicio } from '@/Interfaces/iCatTipoServicio';
import { iCatTipoUnidad } from '@/Interfaces/iCatTipoUnidad';
import { iCatClasificacion } from '@/Interfaces/iCatClasificacion';
import { iCatCliente } from '@/Interfaces/iCatCliente';

@Component({
    selector: 'app-ModalSolicitud',
    templateUrl: './ModalSolicitud.component.html',
    styleUrls: ['./ModalSolicitud.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalSolicitudComponent implements OnInit {
    minDate: Date | undefined;
    frmSolicitud: FormGroup;
    boton: string = 'Guardar';
    marginLeft: string = '705px';
    mostrarLoading: boolean = false;
    listaCatCliente: iCatCliente[] = [];
    listaCatEmpresa: iCatEmpresa[] = [];
    listaCatTipoServicio: iCatTipoServicio[] = [];
    listaCatTipoUnidad: iCatTipoUnidad[] = [];
    listaCatMunicipio: iCatMunicipio[] = [];
    listaCatClasificacion: iCatClasificacion[] = [];
    listaCatMoneda: iCatMoneda[] = [];
    solicitud?: iRepSolicitud;

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private messageService: MessageService,
        private ref: DynamicDialogRef,
        private datePipe: DatePipe,
        private _clienteServicio: ClienteService,
        private _utilidadServicio: UtilidadService,
        private _empresaServicio: EmpresaService,
        private _tipoServicioServicio: TipoServicioService,
        private _tipoUnidadServicio: TipoUnidadService,
        private _municipioServicio: MunicipioService,
        private _clasificacionServicio: ClasificacionService,
        private _monedaServicio: MonedaService,
        private _solicitudServicio: SolicitudService
    ) {
        this.frmSolicitud = this.fb.group({
            idCliente: [0, Validators.required],
            idEmpresa: [0, Validators.required],
            idTipoServicio: [0, Validators.required],
            idTipoUnidad: [0, Validators.required],
            idOrigen: [0, Validators.required],
            idDestino: [0, Validators.required],
            idClasificacion: [0, Validators.required],
            idMoneda: [0, Validators.required],
            venta: [0, Validators.required],
            cantidad: [{ value: 0, disabled: false }, [Validators.required]],
            fecEfectiva: ['', Validators.required],
            isTrasbordo: [false],
            isCruce: [false],
            isRedondo: [false],
            tipoMercancia: ['', Validators.required],
            observaciones: ['']
        });

        if (this.config.data != null) {
            this.solicitud = this.config.data as iRepSolicitud;
            this.boton = 'Actualizar';
            this.marginLeft = '695px';

            this.frmSolicitud.patchValue({
                idCliente: this.solicitud.idCliente!,
                idEmpresa: this.solicitud.idEmpresa,
                idTipoServicio: this.solicitud.idTipoServicio,
                idTipoUnidad: this.solicitud.idTipoUnidad,
                fecEfectiva: new Date(this.solicitud.fecEfectiva),
                idOrigen: this.solicitud.idOrigen,
                idDestino: this.solicitud.idDestino,
                idClasificacion: this.solicitud.idClasificacion,
                idMoneda: this.solicitud.idMoneda,
                venta: this.solicitud.monto,
                cantidad: 1,
                isTrasbordo: !!this.solicitud.isTrasbordo,
                isCruce: !!this.solicitud.isCruce,
                isRedondo: !!this.solicitud.isRedondo,
                tipoMercancia: this.solicitud.tipoMercancia,
                observaciones: this.solicitud.observaciones == 'S/C' ? null : this.solicitud.observaciones
            });
            this.frmSolicitud.get('cantidad')?.disable();

            this.cargaCatEmpresa(this.solicitud.idCliente);
            this.cargaCatMoneda(this.solicitud.idCliente);
        }
    }

    async ngOnInit(): Promise<void> {
        const usuario: any = await this._utilidadServicio.obtenerSesionUsuario();
        this.minDate = new Date();

        await this.cargarCatCliente(usuario[0].idUsuario);
        if (this.solicitud == null) {
            await this.cargaCatEmpresa(0);
            await this.cargaCatMoneda(0);
        }
        await this.cargaCatTipoServicio();
        await this.cargaCatTipoUnidad();
        await this.cargaCatMunicipio();
        await this.cargaCatClasificacion();
    }

    async cargarCatCliente(idUsuario: number) {
        this._clienteServicio.listaCatClienteByUsuario(idUsuario).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatCliente = await data.value;
                }
            }
        });
    }

    async cargaCatEmpresa(idCliente: number) {
        this._empresaServicio.listaCatEmpresaByCliente(idCliente, 2).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatEmpresa = await data.value;
                }
            }
        });
        7;
    }

    async cargaCatTipoServicio() {
        this._tipoServicioServicio.listaCatTipoServicio().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatTipoServicio = await data.value;
                }
            }
        });
    }

    async cargaCatTipoUnidad() {
        this._tipoUnidadServicio.listaCatTipoUnidad().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatTipoUnidad = await data.value;
                }
            }
        });
    }

    async cargaCatMunicipio() {
        this._municipioServicio.listaCatMunicipio().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatMunicipio = await data.value;
                }
            }
        });
    }

    async cargaCatClasificacion() {
        this._clasificacionServicio.listaCatClasificacion().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatClasificacion = await data.value;
                }
            }
        });
    }

    async cargaCatMoneda(pOpc: number) {
        this._monedaServicio.listaCatMonedaByIdCliente(pOpc, 2).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatMoneda = await data.value;
                }
            }
        });
    }

    async guardar_editarSolicitud() {
        this.mostrarLoading = true;

        const usuario: any = await this._utilidadServicio.obtenerSesionUsuario();

        if (this.solicitud == null) {
            // GUARDAR

            const dicDatos: Record<string, any> = {
                ['idUsuario']: usuario[0].idUsuario,
                ['idEmpresa']: this.frmSolicitud.value.idEmpresa,
                ['idCliente']: this.frmSolicitud.value.idCliente,
                ['idTipoUnidad']: this.frmSolicitud.value.idTipoUnidad,
                ['idTipoServicio']: this.frmSolicitud.value.idTipoServicio,
                ['idOrigen']: this.frmSolicitud.value.idOrigen,
                ['idDestino']: this.frmSolicitud.value.idDestino,
                ['FecEfectiva']: this.datePipe.transform(this.frmSolicitud.value.fecEfectiva, 'dd/MM/yyyy'),
                ['idMoneda']: this.frmSolicitud.value.idMoneda,
                ['venta']: this.frmSolicitud.value.venta,
                ['cantidad']: this.frmSolicitud.value.cantidad,
                ['isTrasbordo']: this.frmSolicitud.value.isTrasbordo,
                ['isCruce']: this.frmSolicitud.value.isCruce,
                ['tipoMercancia']: this.frmSolicitud.value.tipoMercancia,
                ['observaciones']: this.frmSolicitud.value.observaciones == '' ? null : this.frmSolicitud.value.observaciones,
                ['idClasificacion']: this.frmSolicitud.value.idClasificacion,
                ['isRedondo']: this.frmSolicitud.value.isRedondo
            };

            this._solicitudServicio.guardar(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Solicitud registrada', life: 3000 });
                        this.ref.close(true);
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
        } else {
            //EDITAR

            const dicDatos: Record<string, any> = {
                ['idSolicitud']: this.solicitud.idSolicitud,
                ['idUsuario']: usuario[0].idUsuario,
                ['idEmpresa']: this.frmSolicitud.value.idEmpresa,
                ['idCliente']: this.frmSolicitud.value.idCliente,
                ['idTipoUnidad']: this.frmSolicitud.value.idTipoUnidad,
                ['idTipoServicio']: this.frmSolicitud.value.idTipoServicio,
                ['idOrigen']: this.frmSolicitud.value.idOrigen,
                ['idDestino']: this.frmSolicitud.value.idDestino,
                ['FecEfectiva']: this.datePipe.transform(this.frmSolicitud.value.fecEfectiva, 'dd/MM/yyyy'),
                ['idMoneda']: this.frmSolicitud.value.idMoneda,
                ['venta']: this.frmSolicitud.value.venta,
                ['cantidad']: 1,
                ['isTrasbordo']: this.frmSolicitud.value.isTrasbordo,
                ['isCruce']: this.frmSolicitud.value.isCruce,
                ['tipoMercancia']: this.frmSolicitud.value.tipoMercancia,
                ['observaciones']: this.frmSolicitud.value.observaciones == '' ? null : this.frmSolicitud.value.observaciones,
                ['idClasificacion']: this.frmSolicitud.value.idClasificacion,
                ['isRedondo']: this.frmSolicitud.value.isRedondo
            };

            this._solicitudServicio.actualizar(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Solicitud actualizada', life: 3000 });
                        this.ref.close(true);
                    } else {
                        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: data.msg, life: 3000 });
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
    }
}

interface iCatEmpresa {
    idEmpresa: number;
    empresa: string;
}

interface iCatMoneda {
    idMoneda: number;
    moneda: string;
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
