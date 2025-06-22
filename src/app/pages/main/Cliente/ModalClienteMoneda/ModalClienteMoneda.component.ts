import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonedaService } from '@/layout/service/Moneda.service';
import { Table } from 'primeng/table';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ClienteService } from '@/layout/service/Cliente.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { iCatMoneda } from '@/Interfaces/iCatMoneda';

@Component({
    selector: 'app-ModalClienteMoneda',
    templateUrl: './ModalClienteMoneda.component.html',
    styleUrls: ['./ModalClienteMoneda.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalClienteMonedaComponent implements OnInit {
    frmMoneda: FormGroup;
    listaCatMoneda: iCatMoneda[] = [];
    listaConsulClienteMoneda: iConsulClienteMoneda[] = [];
    mostrarLoading: boolean = false;
    idCliente: number = 0;
    columnasTabla: string[] = ['moneda', 'fecRegistro'];

    constructor(
        private fb: FormBuilder,
        private _monedaServicio: MonedaService,
        private config: DynamicDialogConfig,
        private _clienteServicio: ClienteService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.frmMoneda = this.fb.group({
            idMoneda: [0]
        });

        this.idCliente = this.config.data;
    }

    async ngOnInit(): Promise<void> {
        await this.cargarCatMoneda(this.idCliente);
        await this.cargaInfoTabla(this.idCliente);
    }

    async cargarCatMoneda(pIdCliente: number) {
        this._monedaServicio.listaCatMonedaByIdCliente(pIdCliente, 1).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatMoneda = await data.value;
                } else {
                    this.listaCatMoneda = [];
                }
            }
        });
    }

    async cargaInfoTabla(pIdCliente: number) {
        this.mostrarLoading = true;

        this._clienteServicio.listaConsulClienteMoneda(pIdCliente).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaConsulClienteMoneda = await data.value;
                    this.mostrarLoading = false;
                } else {
                    this.listaConsulClienteMoneda = [];
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

    async guardarMoneda() {
        this.mostrarLoading = true;

        const dicDatos: Record<string, any> = {
            ['idCliente']: this.idCliente,
            ['idMoneda']: this.frmMoneda.value.idMoneda
        };

        this._clienteServicio.guardarMoneda(dicDatos).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Moneda registrada', life: 3000 });
                    await this.cargarCatMoneda(this.idCliente);
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

    async borrarMoneda(event: Event, registro: iConsulClienteMoneda) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            header: 'Confirmación',
            message: '¿Deseas borrar la moneda?',
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

                this._clienteServicio.borrarMoneda(this.idCliente, registro.idMoneda).subscribe({
                    next: async (data) => {
                        if (data.status) {
                            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Moneda eliminada', life: 3000 });
                            await this.cargarCatMoneda(this.idCliente);
                            await this.cargaInfoTabla(this.idCliente);
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

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async borrarDatos() {
        this.frmMoneda.patchValue({
            idMoneda: 0
        });
    }
}

interface iConsulClienteMoneda {
    idMoneda: number;
    moneda: string;
    fecRegistro: string;
}
