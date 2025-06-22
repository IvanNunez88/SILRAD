import { SharedModule } from '@/shared/shared.module';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '@/layout/service/Cliente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { MunicipioService } from '@/layout/service/Municipio.service';
import { iCatMunicipio } from '@/Interfaces/iCatMunicipio';

@Component({
    selector: 'app-ModalTerceraClienteDireccion',
    templateUrl: './ModalTerceraClienteDireccion.component.html',
    styleUrls: ['./ModalTerceraClienteDireccion.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalTerceraClienteDireccionComponent implements OnInit {
    @ViewChild('dt') dt!: Table;
    @ViewChild('firstInput') firstInput!: ElementRef<HTMLInputElement>;

    listaCatMunicipio: iCatMunicipio[] = [];
    listaClienteDireccion: iConsultaDireccion[] = [];
    mostrarLoading: boolean = false;
    frmDireccion: FormGroup;
    embarque?: iCatDirecciones;
    filtroGlobal: string = '';
    editing: boolean = false;
    isEditing: boolean = false;
    columnasTabla: string[] = ['almacen', 'calle', 'colonia', 'cp', 'municipio', 'contacto', 'fecRegistro'];

    constructor(
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private ref: DynamicDialogRef,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private config: DynamicDialogConfig,
        private _municipioServicio: MunicipioService,
        private _clienteServicio: ClienteService
    ) {
        if (this.config.data != null) {
            this.embarque = this.config.data as iCatDirecciones;
        }

        this.frmDireccion = this.fb.group({
            gAlmacen: [''],
            gCalle: [''],
            gColonia: [''],
            gCP: [''],
            gContacto: [''],
            gIdMunicipio: [0]
        });
    }

    async ngOnInit(): Promise<void> {
        await this.cargaInfoTabla();
        await this.cargarCiudad();
    }

    async onGlobalFilter(event: Event) {
        const input = (event.target as HTMLInputElement).value;
        this.filtroGlobal = input;
        this.dt.filterGlobal(this.filtroGlobal, 'contains');
    }

    async cargarCiudad() {
        this._municipioServicio.listaCatMunicipio().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatMunicipio = await data.value;
                }
            }
        });
    }

    async cargaInfoTabla() {
        this.mostrarLoading = true;

        this._clienteServicio.listaConsulClienteDireccion(this.embarque?.idSolicitud!, Boolean(this.embarque?.tipoDireccion!)).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaClienteDireccion = await data.value;
                    this.mostrarLoading = false;
                } else {
                    this.listaClienteDireccion = [];
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

    async fngenerarId(): Promise<number> {
        return Date.now();
    }

    async registroDireccion() {
        if (this.isEditing) {
            return; // prevención extra
        }

        this.filtroGlobal = '';

        this.isEditing = true;

        this.dt.reset();
        this.frmDireccion.reset();

        const nuevoRegistro: iConsultaDireccion = {
            idRegistro: await this.fngenerarId(),
            idCliente: 0,
            isOrigen: true,
            calle: '',
            colonia: '',
            idMunicipio: 0,
            municipio: '',
            cp: '',
            contacto: '',
            almacen: '',
            fecRegistro: '',
            isNew: true
        };

        this.frmDireccion.patchValue({
            gIdMunicipio: 0
        });

        this.listaClienteDireccion = [nuevoRegistro, ...this.listaClienteDireccion];

        setTimeout(() => {
            if (this.dt) {
                this.dt.initRowEdit(nuevoRegistro);
            }
        });

        this.cd.detectChanges();
    }

    async editarRegistro(registro: iConsultaDireccion) {
        // this.editing = true;

        registro.isNew = false;
        this.isEditing = true;

        this.frmDireccion.patchValue({
            gAlmacen: registro.almacen,
            gCalle: registro.calle,
            gColonia: registro.colonia,
            gCP: registro.cp,
            gContacto: registro.contacto,
            gIdMunicipio: registro.idMunicipio
        });

        this.dt.initRowEdit(registro);
    }

    async actualizarRegistro(event: MouseEvent, registro: iConsultaDireccion) {
        if (registro.isNew) {
            // AGREGAR UNA NUEVA DIRECCIÓN

            const dicDatos: Record<string, any> = {
                ['idSolicitud']: this.embarque?.idSolicitud,
                ['isOrigen']: Boolean(this.embarque?.tipoDireccion),
                ['calle']: this.frmDireccion.value.gCalle == null ? '' : this.frmDireccion.value.gCalle,
                ['colonia']: this.frmDireccion.value.gColonia == null ? '' : this.frmDireccion.value.gColonia,
                ['idMunicipio']: this.frmDireccion.value.gIdMunicipio == null ? '' : this.frmDireccion.value.gIdMunicipio,
                ['cp']: this.frmDireccion.value.gCP == null ? '' : this.frmDireccion.value.gCP,
                ['contacto']: this.frmDireccion.value.gContacto == null ? '' : this.frmDireccion.value.gContacto,
                ['almacen']: this.frmDireccion.value.gAlmacen == null ? '' : this.frmDireccion.value.gAlmacen
            };

            this._clienteServicio.guardarDireccion(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Material activado con éxito', life: 3000 });
                        await this.cargaInfoTabla();
                        await this.borrarDatos();
                        this.editing = true;
                        this.isEditing = false;
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
        } else {
            //MODIFICAR UNA DIRECCIÓN

            const dicDatos: Record<string, any> = {
                ['idSolicitud']: this.embarque?.idSolicitud,
                ['isOrigen']: Boolean(this.embarque?.tipoDireccion),
                ['calle']: this.frmDireccion.value.gCalle == null ? '' : this.frmDireccion.value.gCalle,
                ['colonia']: this.frmDireccion.value.gColonia == null ? '' : this.frmDireccion.value.gColonia,
                ['idMunicipio']: this.frmDireccion.value.gIdMunicipio == null ? '' : this.frmDireccion.value.gIdMunicipio,
                ['cp']: this.frmDireccion.value.gCP == null ? '' : this.frmDireccion.value.gCP,
                ['contacto']: this.frmDireccion.value.gContacto == null ? '' : this.frmDireccion.value.gContacto,
                ['almacen']: this.frmDireccion.value.gAlmacen == null ? '' : this.frmDireccion.value.gAlmacen
            };

            this._clienteServicio.actualizarDireccion(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Dirección actualizada con éxito', life: 3000 });
                        await this.cargaInfoTabla();
                        await this.borrarDatos();
                        this.isEditing = false;

                        const rowElement = (event.target as HTMLElement).closest('tr');
                        if (rowElement) {
                            this.dt.saveRowEdit(registro, rowElement);
                        }
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

    async cancelar(event: MouseEvent, registro: iConsultaDireccion) {
        await this.borrarDatos();

        if (registro.isNew) {
            this.listaClienteDireccion = this.listaClienteDireccion.filter((m) => m !== registro);
        }

        this.dt.cancelRowEdit(registro);
        this.isEditing = false;
    }

    async borrarDatos() {
        this.frmDireccion.patchValue({
            gAlmacen: '',
            gCalle: '',
            gIdAlmacen: '',
            gColonia: '',
            gCP: '',
            gContacto: '',
            gIdMunicipio: 0
        });
    }

    async borrarRegistro(event: Event, registro: iConsultaDireccion) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: `¿Deseas borrar la dirección del almacén ${registro.almacen}?`,
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
                this.mostrarLoading = false;

                const dicDatos: Record<string, any> = {
                    ['idSolicitud']: this.embarque?.idSolicitud,
                    ['isOrigen']: Boolean(this.embarque?.tipoDireccion),
                    ['almacen']: registro.almacen
                };
                this._clienteServicio.borrarDireccion(dicDatos).subscribe({
                    next: async (data) => {
                        if (data.status) {
                            this.messageService.add({ severity: 'info', summary: 'información', detail: 'Dirección borrado con éxito', life: 3000 });
                            await this.cargaInfoTabla();
                            this.mostrarLoading = false;
                        } else {
                            this.messageService.add({ severity: 'warn', summary: 'Información', detail: data.msg, life: 3000 });
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
        });
    }

    async utilizardireccion(registro: iConsultaDireccion) {
        const datoRetorno: iRetornoDireccion = {
            calle: registro.calle,
            colonia: registro.colonia,
            idMunicipio: registro.idMunicipio,
            cp: registro.cp,
            contacto: registro.contacto,
            almacen: registro.almacen
        };

        this.ref.close(datoRetorno);
    }
}

interface iConsultaDireccion {
    idRegistro: number;
    idCliente: number;
    isOrigen: boolean;
    calle: string;
    colonia: string;
    idMunicipio: number;
    municipio: string;
    cp: string;
    contacto: string;
    almacen: string;
    fecRegistro: string;
    isNew: boolean;
}

interface iCatDirecciones {
    idSolicitud: number;
    idEmbarque: number;
    idRuta: number;
    tipoDireccion: number;
}

interface iRetornoDireccion {
    calle: string;
    colonia: string;
    idMunicipio: number;
    cp: string;
    contacto: string;
    almacen: string;
}
