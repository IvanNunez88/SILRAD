import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocumentoService } from '@/layout/service/Documento.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EmbarqueService } from '@/layout/service/Embarque.service';

@Component({
    selector: 'app-ModalDocumentacionCliente',
    templateUrl: './ModalDocumentacionCliente.component.html',
    styleUrls: ['./ModalDocumentacionCliente.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalDocumentacionClienteComponent implements OnInit {
    mostrarLoading: boolean = false;
    frmDocumento: FormGroup;
    idEmbarque: number = 0;
    listaConsulDocumentoReporte: iRepDocumentacion[] = [];
    listaCatDocumento: iCatDocumento[] = [];
    columnasTabla: string[] = ['documento', 'fecRegistro'];

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private messageService: MessageService,
        private _documentacionServicio: DocumentoService,
        private _embarqueServicio: EmbarqueService,
        private confirmationService: ConfirmationService
    ) {
        this.frmDocumento = this.fb.group({
            idDocumento: [0]
        });

        this.idEmbarque = this.config.data;
    }

    async ngOnInit(): Promise<void> {
        await this.cargaInfoTabla();
        await this.cargaCatDocumento();
    }

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async cargaCatDocumento() {
        this._documentacionServicio.listaCatDocumentoEmbarque(this.idEmbarque).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatDocumento = await data.value;
                } else {
                    this.listaCatDocumento = [];
                }
            }
        });
    }

    async cargaInfoTabla() {
        this.mostrarLoading = true;

        this._documentacionServicio.listaConsultaDocumentoEmbarque(this.idEmbarque).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaConsulDocumentoReporte = await data.value;
                    this.mostrarLoading = false;
                } else {
                    this.listaConsulDocumentoReporte = [];
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

    async guardarDocumento() {
        this.mostrarLoading = true;

        const dicDatos: Record<string, any> = {
            ['idEmbarque']: this.idEmbarque,
            ['idDocumento']: this.frmDocumento.value.idDocumento
        };

        this._embarqueServicio.guardarEmbarqueDocumento(dicDatos).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Documento registrado con éxito', life: 3000 });
                    await this.cargaInfoTabla();
                    await this.cargaCatDocumento();
                    await this.borradDatos();
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

    async borradDatos() {
        this.frmDocumento.patchValue({
            idDocumento: 0
        });
    }

    async borrarDocumento(event: Event, registrado: iRepDocumentacion) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            header: 'Confirmación',
            message: `¿Deseas borrar el documento?. ${registrado.documento}`,
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

                this._embarqueServicio.borrarEmbarqueDocumento(registrado.idEmbarque, registrado.idDocumento).subscribe({
                    next: async (data) => {
                        if (data.status) {
                            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Documento eliminado', life: 3000 });
                            await this.cargaInfoTabla();
                            await this.cargaCatDocumento();
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

interface iRepDocumentacion {
    idEmbarque: number;
    idDocumento: number;
    documento: string;
    fechaRegistro: string;
}

interface iCatDocumento {
    idDocumento: number;
    documento: string;
}
