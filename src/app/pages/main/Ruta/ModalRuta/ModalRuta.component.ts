import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from '@/layout/service/Proveedor.service';
import { iCatProveedor } from '@/Interfaces/iCatProveedor';
import { TipoUnidadService } from '@/layout/service/TipoUnidad.service';
import { iCatTipoUnidad } from '@/Interfaces/iCatTipoUnidad';
import { ClasificacionService } from '@/layout/service/Clasificacion.service';
import { iCatClasificacion } from '@/Interfaces/iCatClasificacion';
import { iCatMunicipio } from '@/Interfaces/iCatMunicipio';
import { MunicipioService } from '@/layout/service/Municipio.service';
import { MonedaService } from '@/layout/service/Moneda.service';
import { iCatMoneda } from '@/Interfaces/iCatMoneda';
import { UtilidadService } from '@/layout/service/Utilidad.service';
import { RutaService } from '@/layout/service/Ruta.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-ModalRuta',
    templateUrl: './ModalRuta.component.html',
    styleUrls: ['./ModalRuta.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalRutaComponent implements OnInit {
    frmRuta: FormGroup;
    listaCatProveedor: iCatProveedor[] = [];
    listaCatTipoUnidad: iCatTipoUnidad[] = [];
    listaCatClasificacion: iCatClasificacion[] = [];
    listaCatMunicipio: iCatMunicipio[] = [];
    listaCatMoneda: iCatMoneda[] = [];
    boton: string = 'Guardar';
    marginLeft: string = '340px';
    mostrarLoading: boolean = false;
    mostrarSwitch: boolean = false;

    ruta: any;

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private messageService: MessageService,
        private ref: DynamicDialogRef,
        private _proveedorServicio: ProveedorService,
        private _tipoUnidadServicio: TipoUnidadService,
        private _clasificacionServicio: ClasificacionService,
        private _municipioServicio: MunicipioService,
        private _monedaServicio: MonedaService,
        private _utilidadServicio: UtilidadService,
        private _rutaServicio: RutaService
    ) {
        this.frmRuta = this.fb.group({
            // idProveedor: [0, Validators.required],
            idProveedor: [{ value: 0, disabled: false }, Validators.required],
            idTipoUnidad: [0, Validators.required],
            idClasificacion: [0, Validators.required],
            idOrigen: [0, Validators.required],
            idDestino: [0, Validators.required],
            idMoneda: [0, Validators.required],
            costo: [0, Validators.required],
            observacion: [''],
            isEstatus: []
        });

        if (this.config.data != null) {
            this.ruta = this.config.data;
            this.mostrarSwitch = true;
            this.boton = 'Actualizar';
            this.marginLeft = '330px';
            this.frmRuta.controls['idProveedor'].disable();

            this.frmRuta.patchValue({
                idProveedor: this.ruta.idProveedor,
                idTipoUnidad: this.ruta.idTipoUnidad,
                idClasificacion: this.ruta.idClasificacion,
                idOrigen: this.ruta.idOrigen,
                idDestino: this.ruta.idDestino,
                idMoneda: this.ruta.idMoneda,
                costo: this.ruta.tarifa,
                observacion: this.ruta.comentario,
                isEstatus: this.ruta.isActivo
            });

            this.cargaCatMoneda(this.ruta.idProveedor);
        }
    }

    async ngOnInit(): Promise<void> {
        await this.cargarCatProveedor();
        await this.cargaCatTipoServicio();
        await this.cargaCatClasificacion();
        await this.cargaCatMunicipio();

        if (this.ruta == null) {
            await this.cargaCatMoneda(0);
        }
    }

    async cargarCatProveedor() {
        this._proveedorServicio.listarCatProveedor().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatProveedor = await data.value;
                }
            }
        });
    }

    async cargaCatTipoServicio() {
        this._tipoUnidadServicio.listaCatTipoUnidad().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatTipoUnidad = await data.value;
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

    async cargaCatMunicipio() {
        this._municipioServicio.listaCatMunicipio().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatMunicipio = await data.value;
                }
            }
        });
    }

    async cargaCatMoneda(pIdProveedor: number) {
        this._monedaServicio.ListaCatMonedaRutaByIdProveedor(pIdProveedor).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatMoneda = await data.value;
                    // this.frmRuta.patchValue({
                    //     idMoneda: 0
                    // });
                }
            }
        });
    }

    async guardar_editarRuta() {
        this.mostrarLoading = true;

        const usuario: any = await this._utilidadServicio.obtenerSesionUsuario();

        if (this.ruta == null) {
            // GUARDAR

            const dicDatos: Record<string, any> = {
                ['idUsuario']: usuario[0].idUsuario,
                ['idProveedor']: this.frmRuta.value.idProveedor,
                ['idTipoUnidad']: this.frmRuta.value.idTipoUnidad,
                ['idOrigen']: this.frmRuta.value.idOrigen,
                ['idDestino']: this.frmRuta.value.idDestino,
                ['idClasificacion']: this.frmRuta.value.idClasificacion,
                ['idMoneda']: this.frmRuta.value.idMoneda,
                ['tarifa']: this.frmRuta.value.costo,
                ['comentario']: this.frmRuta.value.observacion == '' ? null : this.frmRuta.value.observacion
            };

            this._rutaServicio.guardar(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Ruta registrada', life: 3000 });
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
            // EDITAR
            const dicDatos: Record<string, any> = {
                ['idRuta']: this.ruta.idRuta,
                ['idUsuario']: usuario[0].idUsuario,
                ['IdProveedor']: this.ruta.idProveedor,
                ['newIdTipoUnidad']: this.frmRuta.value.idTipoUnidad,
                ['oldIdTipoUnidad']: this.ruta.idTipoUnidad,
                ['newIdOrigen']: this.frmRuta.value.idOrigen,
                ['oldIdOrigen']: this.ruta.idOrigen,
                ['newIdDestino']: this.frmRuta.value.idDestino,
                ['oldIdDestino']: this.ruta.idDestino,
                ['newIdClasificacion']: this.frmRuta.value.idClasificacion,
                ['oldIdClasificacion']: this.ruta.idClasificacion,
                ['newIdMoneda']: this.frmRuta.value.idMoneda,
                ['oldIdMoneda']: this.ruta.idMoneda,
                ['tarifa']: this.frmRuta.value.costo,
                ['comentario']: this.frmRuta.value.observacion == '' ? null : this.frmRuta.value.observacion,
                ['isActivo']: this.frmRuta.value.isEstatus
            };

            this._rutaServicio.actualizar(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Ruta actualizada', life: 3000 });
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
