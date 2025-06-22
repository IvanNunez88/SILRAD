import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { iCatMunicipio } from '@/Interfaces/iCatMunicipio';
import { MunicipioService } from '@/layout/service/Municipio.service';
import { DatePipe } from '@angular/common';
import { EmbarqueService } from '@/layout/service/Embarque.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ModalTerceraClienteDireccionComponent } from './ModalTerceraClienteDireccion/ModalTerceraClienteDireccion.component';

@Component({
    selector: 'app-ModalSecundariaDireccion',
    templateUrl: './ModalSecundariaDireccion.component.html',
    styleUrls: ['./ModalSecundariaDireccion.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalSecundariaDireccionComponent implements OnInit {
    frmDireccion: FormGroup;
    embarque?: iCatDirecciones;
    minDate: Date | undefined;
    ref: DynamicDialogRef | undefined;
    listaCatMunicipio: iCatMunicipio[] = [];
    listaDireccion: iRepEmbarqueDirecciones[] = [];
    columnasTabla: string[] = ['almacen', 'calle', 'colonia', 'cp', 'ciudad', 'contacto', 'fecEfectiva', 'hInicio', 'hFinal'];
    mostrarLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private dialog: DialogService,
        private config: DynamicDialogConfig,
        private datePipe: DatePipe,
        private messageService: MessageService,
        private _embarqueServicio: EmbarqueService,
        private _municipioServicio: MunicipioService,
        private confirmationService: ConfirmationService
    ) {
        if (this.config.data != null) {
            this.embarque = this.config.data as iCatDirecciones;
        }

        this.frmDireccion = this.fb.group({
            almacen: [{ value: '', disabled: false }, Validators.required],
            calle: [{ value: '', disabled: false }, Validators.required],
            colonia: [{ value: '', disabled: false }, Validators.required],
            cp: [{ value: '', disabled: false }, Validators.required],
            idMunicipio: [{ value: 0, disabled: false }, Validators.required],
            contacto: [{ value: '', disabled: false }, Validators.required],
            fecEfectiva: ['', Validators.required],
            hInicio: ['', Validators.required],
            hFinal: ['', Validators.required]
        });
    }

    async ngOnInit(): Promise<void> {
        this.minDate = new Date();
        await this.cargaCatMunicipio();
        await this.cargaInfoTabla();
    }

    async cargaInfoTabla() {
        this.mostrarLoading = true;

        this._embarqueServicio.listaConsultaEmbarqueDireccion(this.embarque?.idEmbarque!, this.embarque?.idRuta!, Boolean(this.embarque?.tipoDireccion!)).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaDireccion = await data.value;
                    this.mostrarLoading = false;
                } else {
                    this.listaDireccion = [];
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

    async registroDireccion() {
        this.mostrarLoading = true;

        const dicDatos: Record<string, any> = {
            ['idEmbarque']: this.embarque?.idEmbarque,
            ['idRuta']: this.embarque?.idRuta,
            ['isOrigen']: this.embarque?.tipoDireccion,
            ['almacen']: this.frmDireccion.value.almacen,
            ['calle']: this.frmDireccion.value.calle,
            ['colonia']: this.frmDireccion.value.colonia,
            ['cp']: this.frmDireccion.value.cp,
            ['idMunicipio']: this.frmDireccion.value.idMunicipio,
            ['contacto']: this.frmDireccion.value.contacto,
            ['fecEfectiva']: this.datePipe.transform(this.frmDireccion.value.fecEfectiva, 'dd/MM/yyyy'),
            ['hInicio']: this.datePipe.transform(this.frmDireccion.value.hInicio, 'HH:mm'),
            ['hFinal']: this.datePipe.transform(this.frmDireccion.value.hFinal, 'HH:mm')
        };

        this._embarqueServicio.guardarDireccion(dicDatos).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Dirección registrada', life: 3000 });
                    this.mostrarLoading = false;
                    await this.cargaInfoTabla();
                    await this.borrarDatos();
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

    async cargaCatMunicipio() {
        this._municipioServicio.listaCatMunicipio().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatMunicipio = await data.value;
                }
            }
        });
    }

    async borrarDatos() {
        this.frmDireccion.patchValue({
            almacen: '',
            calle: '',
            colonia: '',
            cp: '',
            idMunicipio: 0,
            contacto: '',
            fecEfectiva: '',
            hInicio: '',
            hFinal: ''
        });
    }

    async borrarDireccion(event: Event, registro: iRepEmbarqueDirecciones) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            header: 'Confirmación',
            message: `¿Deseas borrar la dirección de ${registro.almacen}?`,
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

                const dicDatos: Record<string, any> = {
                    ['idEmbarque']: registro.idEmbarque,
                    ['idRuta']: registro.idRuta,
                    ['isOrigen']: registro.isOrigen,
                    ['almacen']: registro.almacen
                };

                this._embarqueServicio.borrarEmbarqueDireccion(dicDatos).subscribe({
                    next: async (data) => {
                        if (data.status) {
                            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Direccion borrada con éxito', life: 3000 });
                            await this.cargaInfoTabla();
                            this.mostrarLoading = false;
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
        });
    }

    async catClienteDirecciones() {
        this.ref = this.dialog.open(ModalTerceraClienteDireccionComponent, {
            header: 'Direcciones',
            width: '1290px',
            // height: '505px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: this.embarque
        });

        this.ref.onClose.subscribe(async (informacion: iRetornoDireccion) => {
            if (informacion != null) {
                this.frmDireccion.patchValue({
                    almacen: informacion.almacen,
                    calle: informacion.calle,
                    colonia: informacion.colonia,
                    cp: informacion.cp,
                    idMunicipio: informacion.idMunicipio,
                    contacto: informacion.contacto
                });
            }
            // await this.cargaInfoDetalle();
        });
    }
}

interface iCatDirecciones {
    idSolicitud: number;
    idEmbarque: number;
    idRuta: number;
    tipoDireccion: number;
}

interface iRepEmbarqueDirecciones {
    idEmbarque: number;
    isOrigen: boolean;
    idRuta: number;
    almacen: string;
    calle: string;
    colonia: string;
    cp: string;
    ciudad: string;
    contacto: string;
    fecEfectiva: string;
    hInicio: string;
    hFinal: string;
}

interface iRetornoDireccion {
    calle: string;
    colonia: string;
    idMunicipio: number;
    cp: string;
    contacto: string;
    almacen: string;
}
