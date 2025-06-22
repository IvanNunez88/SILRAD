import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TipoServicioService } from '@/layout/service/TipoServicio.service';
import { iCatTipoServicio } from '@/Interfaces/iCatTipoServicio';
import { DocumentoService } from '@/layout/service/Documento.service';
import { Table } from 'primeng/table';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ClienteService } from '@/layout/service/Cliente.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-ModalDocumentacion',
    templateUrl: './ModalDocumentacion.component.html',
    styleUrls: ['./ModalDocumentacion.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalDocumentacionComponent implements OnInit {
    frmDocumentacion: FormGroup;
    listaCatTipoServicio: iCatTipoServicio[] = [];
    listaCatDocumentacion: iCatDocumentacion[] = [];
    listaConsultaClienteDcoumento: iConsultaClienteDocumento[] = [];
    mostrarLoading: boolean = false;
    idCliente: number = 0;
    columnasTabla: string[] = ['tipoServicio', 'documento', 'fechaRegistro'];

    constructor(
        private fb: FormBuilder,
        private _tipoServicioServicio: TipoServicioService,
        private _documentacionServicio: DocumentoService,
        private _clienteServicio: ClienteService,
        private config: DynamicDialogConfig,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.frmDocumentacion = this.fb.group({
            idTipoServicio: [0],
            idDocumento: [0]
        });

        this.idCliente = this.config.data;
    }

    async ngOnInit(): Promise<void> {
        await this.cargaCatTipoServicio();
        await this.cargaCatDocumentacion(0, 0);
        await this.cargaInfoTabla(this.idCliente);
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

    async cargaCatDocumentacion(pOpc: number, pIdTipoServicio: number) {
        let IdCliente: number = 0;
        let IdTipoServicio: number = 0;

        if (pOpc != 0) {
            IdCliente = this.idCliente;
            IdTipoServicio = pIdTipoServicio;
        }

        this._documentacionServicio.listaCatDocumentoByClienteTipoServicioDocumento(IdCliente, IdTipoServicio).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatDocumentacion = await data.value;
                }
            }
        });
    }

    async cargaInfoTabla(pIdCliente: number) {
        this.mostrarLoading = true;

        this._clienteServicio.listaConsulClienteDocumento(pIdCliente).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaConsultaClienteDcoumento = await data.value;
                    this.mostrarLoading = false;
                } else {
                    this.listaConsultaClienteDcoumento = [];
                    this.mostrarLoading = false;
                }
            }
        });
    }

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async guardarDocumento() {
        this.mostrarLoading = true;

        const dicDatos: Record<string, any> = {
            ['idCliente']: this.idCliente,
            ['idTipoServicio']: this.frmDocumentacion.value.idTipoServicio,
            ['idDocumento']: this.frmDocumentacion.value.idDocumento
        };

        this._clienteServicio.guardarDocumento(dicDatos).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Documento registrado', life: 3000 });
                    await this.cargaCatTipoServicio();
                    await this.cargaCatDocumentacion(0, 0);
                    await this.cargaInfoTabla(this.idCliente);
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

    async borrarDocumento(event: Event, registro: iConsultaClienteDocumento) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            header: 'Confirmación',
            message: '¿Deseas borrar el documento?',
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

                this._clienteServicio.borrarDocumento(this.idCliente, registro.idTipoServicio, registro.idDocumento).subscribe({
                    next: async (data) => {
                        if (data.status) {
                            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Documento eliminado', life: 3000 });
                            await this.cargaCatTipoServicio();
                            await this.cargaCatDocumentacion(0, 0);
                            await this.cargaInfoTabla(this.idCliente);
                            await this.borrarDatos();
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

    async borrarDatos() {
        this.frmDocumentacion.patchValue({
            idTipoServicio: 0,
            idDocumento: 0
        });
    }
}

interface iCatDocumentacion {
    idDocumento: number;
    documento: string;
}

interface iConsultaClienteDocumento {
    idCliente: number;
    idTipoServicio: number;
    tipoServicio: string;
    idDocumento: number;
    documento: string;
    fechaRegistro: string;
}
