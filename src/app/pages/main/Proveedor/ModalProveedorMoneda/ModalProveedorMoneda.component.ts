import { iCatMoneda } from '@/Interfaces/iCatMoneda';
import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { ProveedorService } from '@/layout/service/Proveedor.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MonedaService } from '@/layout/service/Moneda.service';

@Component({
    selector: 'app-ModalProveedorMoneda',
    templateUrl: './ModalProveedorMoneda.component.html',
    styleUrls: ['./ModalProveedorMoneda.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalProveedorMonedaComponent implements OnInit {
    frmMoneda: FormGroup;
    idProveedor: number = 0;
    listaCatMoneda: iCatMoneda[] = [];
    mostrarLoading: boolean = false;
    listaConsulProveedorMoneda: iConsulProveedorMoneda[] = [];
    columnasTabla: string[] = ['moneda', 'fecRegistro'];

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private messageService: MessageService,
        private _monedaServicio: MonedaService,
        private _proveedorServicio: ProveedorService,
        private confirmationService: ConfirmationService
    ) {
        this.frmMoneda = this.fb.group({
            idMoneda: [0]
        });

        this.idProveedor = this.config.data;
    }

    async ngOnInit(): Promise<void> {
        await this.cargarCatMoneda(this.idProveedor);
        await this.cargarinfoTabla(this.idProveedor);
    }

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async cargarCatMoneda(pIdProveedor: number) {
        this._monedaServicio.listaCatMonedaByIdProveedor(pIdProveedor).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatMoneda = await data.value;
                } else {
                    this.listaCatMoneda = [];
                }
            }
        });
    }

    async guardarMoneda() {
        this.mostrarLoading = true;

        const dicDatos: Record<string, any> = {
            ['idProveedor']: this.idProveedor,
            ['idMoneda']: this.frmMoneda.value.idMoneda
        };

        this._proveedorServicio.guardarMoneda(dicDatos).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Moneda registrada', life: 3000 });
                    await this.cargarCatMoneda(this.idProveedor);
                    await this.cargarinfoTabla(this.idProveedor);
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

    async cargarinfoTabla(pIdProveedor: number) {
        this.mostrarLoading = true;

        this._proveedorServicio.listaConsulProveedoMoneda(pIdProveedor).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaConsulProveedorMoneda = await data.value;
                    this.mostrarLoading = false;
                } else {
                    this.listaConsulProveedorMoneda = [];
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

    async borrarMoneda(event: Event, registro: iConsulProveedorMoneda) {
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

                this._proveedorServicio.borrarMoneda(this.idProveedor, registro.idMoneda).subscribe({
                    next: async (data) => {
                        if (data.status) {
                            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Moneda eliminada', life: 3000 });
                            await this.cargarCatMoneda(this.idProveedor);
                            await this.cargarinfoTabla(this.idProveedor);
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
        this.frmMoneda.patchValue({
            idMoneda: 0
        });
    }
}

interface iConsulProveedorMoneda {
    idMoneda: number;
    moneda: string;
    fecRegistro: string;
}
