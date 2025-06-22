import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstatusEmbarqueService } from '@/layout/service/EstatusEmbarque.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { EmbarqueService } from '@/layout/service/Embarque.service';
import { MessageService } from 'primeng/api';
import { UtilidadService } from '@/layout/service/Utilidad.service';

@Component({
    selector: 'app-ModalEstatus',
    templateUrl: './ModalEstatus.component.html',
    styleUrls: ['./ModalEstatus.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalEstatusComponent implements OnInit {
    mostrarLoading: boolean = false;
    frmEstatus: FormGroup;
    listaCatEstatusEmbarque: iCatEstatusEmbarque[] = [];
    idEmbarque: number = 0;
    listaConsultaEmbarqueBitacora: iConsultaEmbarqueBitacora[] = [];
    columnasTabla: string[] = ['estatusEmbarque', 'usuario', 'comentario', 'fecRegistro'];

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private messageService: MessageService,
        private _estatusEmbarqueServicio: EstatusEmbarqueService,
        private _utilidadServicio: UtilidadService,
        private _embarqueServicio: EmbarqueService
    ) {
        this.frmEstatus = this.fb.group({
            idEstatus: [0],
            comentario: ['']
        });

        this.idEmbarque = this.config.data;
    }

    async ngOnInit(): Promise<void> {
        await this.cargaInfoTabla();
        await this.cargaCatEstatusEmbarque();
    }

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async guardarEstatus() {
        const usuario: any = await this._utilidadServicio.obtenerSesionUsuario();

        const dicDatos: Record<string, any> = {
            ['idUsuario']: usuario[0].idUsuario,
            ['idEmbarque']: this.idEmbarque,
            ['idEstatusEmbarque']: this.frmEstatus.value.idEstatus,
            ['comentario']: this.frmEstatus.value.comentario
        };

        this._embarqueServicio.guardarEstatus(dicDatos).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Estatus registrado', life: 3000 });
                    await this.cargaInfoTabla();
                    await this.cargaCatEstatusEmbarque();
                    await this.borrarDatos();
                } else {
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

        this._embarqueServicio.listaConsulEmbarqueBitacora(this.idEmbarque).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaConsultaEmbarqueBitacora = await data.value;
                    this.mostrarLoading = false;
                } else {
                    this.listaConsultaEmbarqueBitacora = [];
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

    async cargaCatEstatusEmbarque() {
        this._estatusEmbarqueServicio.ListaCatEstatusEmbarqueByIdEmbarque(this.idEmbarque).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatEstatusEmbarque = await data.value;
                } else {
                    this.listaCatEstatusEmbarque = [];
                }
            }
        });
    }

    async borrarDatos() {
        this.frmEstatus.patchValue({
            idEstatus: 0,
            comentario: ''
        });
    }
}

interface iCatEstatusEmbarque {
    idEstatusEmbarque: number;
    estatusEmbarque: string;
}

interface iConsultaEmbarqueBitacora {
    idEmbarque: number;
    idEstatusEmbarque: number;
    estatusEmbarque: string;
    usuario: string;
    comentario: string;
    fecRegistro: string;
}
