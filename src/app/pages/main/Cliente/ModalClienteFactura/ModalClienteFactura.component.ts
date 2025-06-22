import { ClienteService } from '@/layout/service/Cliente.service';
import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EmpresaService } from '@/layout/service/Empresa.service';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-ModalClienteFactura',
    templateUrl: './ModalClienteFactura.component.html',
    styleUrls: ['./ModalClienteFactura.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalClienteFacturaComponent implements OnInit {
    mostrarLoading: boolean = false;
    frmEmpresa: FormGroup;
    listaCatEmpresa: iCatEmpresa[] = [];
    idCliente: number = 0;
    columnasTabla: string[] = ['empresa', 'fecRegistro'];
    listaConsulClienteEmpresa: iConsulClienteEmpresa[] = [];

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private _clienteServicio: ClienteService,
        private _empresaServicio: EmpresaService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.frmEmpresa = this.fb.group({
            idEmpresa: [0]
        });

        this.idCliente = this.config.data;
    }

    async ngOnInit(): Promise<void> {
        await this.cargaCatEmpresa();
        await this.cargaInfoTabla();
    }

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async cargaCatEmpresa() {
        this._empresaServicio.listaCatEmpresaByCliente(this.idCliente, 1).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatEmpresa = await data.value;
                } else {
                    this.listaCatEmpresa = [];
                }
            }
        });
    }

    async guardarEmpresa() {
        this.mostrarLoading = true;

        const dicDatos: Record<string, any> = {
            ['idCliente']: this.idCliente,
            ['idEmpresa']: this.frmEmpresa.value.idEmpresa
        };

        this._clienteServicio.guardarEmpresa(dicDatos).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Empresa registrada', life: 3000 });
                    await this.cargaCatEmpresa();
                    await this.cargaInfoTabla();
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

    async cargaInfoTabla() {
        this.mostrarLoading = true;

        this._clienteServicio.listaConsulClienteEmpresa(this.idCliente).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaConsulClienteEmpresa = await data.value;
                    this.mostrarLoading = false;
                } else {
                    this.listaConsulClienteEmpresa = [];
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

    async borrarEmpresa(event: Event, registro: iConsulClienteEmpresa) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            header: 'Confirmación',
            message: '¿Deseas borrar la empresa?',
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

                this._clienteServicio.borrarEmpresa(this.idCliente, registro.idEmpresa).subscribe({
                    next: async (data) => {
                        if (data.status) {
                            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Empresa eliminada', life: 3000 });
                            await this.cargaCatEmpresa();
                            await this.cargaInfoTabla();
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
        this.frmEmpresa.patchValue({
            idEmpresa: 0
        });
    }
}

interface iCatEmpresa {
    idEmpresa: number;
    empresa: string;
}

interface iConsulClienteEmpresa {
    idEmpresa: number;
    empresa: string;
    fecRegistro: string;
}
