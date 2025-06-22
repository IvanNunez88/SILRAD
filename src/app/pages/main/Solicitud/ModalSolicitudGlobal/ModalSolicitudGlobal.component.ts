import { iCatCliente } from '@/Interfaces/iCatCliente';
import { ClienteService } from '@/layout/service/Cliente.service';
import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iCatClasificacion } from '@/Interfaces/iCatClasificacion';
import { ClasificacionService } from '@/layout/service/Clasificacion.service';
import { iCatTipoServicio } from '@/Interfaces/iCatTipoServicio';
import { TipoServicioService } from '@/layout/service/TipoServicio.service';
import { ModalidadService } from '@/layout/service/Modalidad.service';
import { iCatMunicipio } from '@/Interfaces/iCatMunicipio';
import { MunicipioService } from '@/layout/service/Municipio.service';
import { UtilidadService } from '@/layout/service/Utilidad.service';
import { SolicitudGlobalService } from '@/layout/service/SolicitudGlobal.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-ModalSolicitudGlobal',
    templateUrl: './ModalSolicitudGlobal.component.html',
    styleUrls: ['./ModalSolicitudGlobal.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalSolicitudGlobalComponent implements OnInit {
    frmSolicitud: FormGroup;
    boton: string = 'Guardar';
    marginLeft: string = '694px';
    mostrarLoading: boolean = false;
    listaCatCliente: iCatCliente[] = [];
    listaCatClasificacion: iCatClasificacion[] = [];
    listaCatTipoServicio: iCatTipoServicio[] = [];
    listaCatModalidad: iCatModalidad[] = [];
    listaCatMunicipio: iCatMunicipio[] = [];
    solicitud: any;

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private messageService: MessageService,
        private ref: DynamicDialogRef,
        private _clienteServicio: ClienteService,
        private _clasificacionServicio: ClasificacionService,
        private _utilidadServicio: UtilidadService,
        private _tipoServicioServicio: TipoServicioService,
        private _modalidadServicio: ModalidadService,
        private _municipioServicio: MunicipioService,
        private _solicitudGlobalServicio: SolicitudGlobalService
    ) {
        this.frmSolicitud = this.fb.group({
            idCliente: [0, Validators.required],
            idClasificacion: [0, Validators.required],
            idTipoServicio: [0, Validators.required],
            idModalidad: [0, Validators.required],
            idOrigen: [0, Validators.required],
            idDestino: [0, Validators.required],
            contacto: [''],
            correo: ['']
        });

        if (this.config.data != null) {
            this.solicitud = this.config.data;
            this.boton = 'Actualizar';
            this.marginLeft = '684px';

            this.frmSolicitud.patchValue({
                idCliente: this.solicitud.idCliente,
                idClasificacion: this.solicitud.idClasificacion,
                idTipoServicio: this.solicitud.idTipoServicio,
                idModalidad: this.solicitud.idModalidad,
                idOrigen: this.solicitud.idOrigen,
                idDestino: this.solicitud.idDestino,
                contacto: this.solicitud.contacto,
                correo: this.solicitud.correo
            });
        }
    }

    async ngOnInit(): Promise<void> {
        await this.cargarCatCliente();
        await this.cargaCatClasificacion();
        await this.cargaCatTipoServicio();
        await this.cargaCatModalidad();
        await this.cargaCatMunicipio();
    }

    async cargarCatCliente() {
        this._clienteServicio.listaCatCliente().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatCliente = await data.value;
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

    async cargaCatTipoServicio() {
        this._tipoServicioServicio.listaCatTipoServicioQuery().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatTipoServicio = await data.value;
                }
            }
        });
    }

    async cargaCatModalidad() {
        this._modalidadServicio.listaCatModalidad().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatModalidad = await data.value;
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

    async guardar_editarSolicitud() {
        this.mostrarLoading = true;

        const usuario: any = await this._utilidadServicio.obtenerSesionUsuario();

        if (this.solicitud == null) {
            // GUARDAR

            const dicDatos: Record<string, any> = {
                ['idCliente']: this.frmSolicitud.value.idCliente,
                ['idUsuario']: usuario[0].idUsuario,
                ['idClasificacion']: this.frmSolicitud.value.idClasificacion,
                ['idTipoServicio']: this.frmSolicitud.value.idTipoServicio,
                ['idModalidad']: this.frmSolicitud.value.idModalidad,
                ['idOrigen']: this.frmSolicitud.value.idOrigen,
                ['idDestino']: this.frmSolicitud.value.idDestino,
                ['contacto']: this.frmSolicitud.value.contacto,
                ['correo']: this.frmSolicitud.value.correo
            };

            this._solicitudGlobalServicio.guardar(dicDatos).subscribe({
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
                ['idSolicitudGlobal']: this.solicitud.idSolicitud,
                ['idCliente']: this.frmSolicitud.value.idCliente,
                ['idClasificacion']: this.frmSolicitud.value.idClasificacion,
                ['idTipoServicio']: this.frmSolicitud.value.idTipoServicio,
                ['idModalidad']: this.frmSolicitud.value.idModalidad,
                ['idOrigen']: this.frmSolicitud.value.idOrigen,
                ['idDestino']: this.frmSolicitud.value.idDestino,
                ['contacto']: this.frmSolicitud.value.contacto,
                ['correo']: this.frmSolicitud.value.correo
            };

            this._solicitudGlobalServicio.actualizar(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Solicitud actualizada', life: 3000 });
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
        }
    }
}

interface iCatModalidad {
    idModalidad: number;
    modalidad: string;
}

// interface iCatSolicitudGlobal {
//     idSolicitudGlobal: number;
//     idCliente: number;
// "idUsuario": 0,
//     idClasificacion: number;
//     idTipoServicio: number;
//     idModalidad: number;
//     idOrigen: number;
//     idDestino: number;
//     contacto: string;
//     correo: string;
// }
