import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { EmbarqueService } from '@/layout/service/Embarque.service';
import { MessageService } from 'primeng/api';
import { UtilidadService } from '@/layout/service/Utilidad.service';

@Component({
    selector: 'app-ModalSeguimiento',
    templateUrl: './ModalSeguimiento.component.html',
    styleUrls: ['./ModalSeguimiento.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalSeguimientoComponent implements OnInit {
    mostrarLoading: boolean = false;
    frmSeguimiento: FormGroup;
    idEmbarque: number = 0;
    listaConsultaEmbarqueSeguimiento: iConsultaEmbarqueSerguimiento[] = [];
    columnasTabla: string[] = ['usuario', 'comentario', 'fecRegistro'];

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private messageService: MessageService,
        private _utilidadServicio: UtilidadService,
        private _embarqueServicio: EmbarqueService
    ) {
        this.frmSeguimiento = this.fb.group({
            comentario: ['']
        });

        this.idEmbarque = this.config.data;
    }

    async ngOnInit(): Promise<void> {
        await this.cargaInfoTabla();
    }

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async cargaInfoTabla() {
        this.mostrarLoading = true;

        this._embarqueServicio.listaConsulEmbarqueSeguimiento(this.idEmbarque).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaConsultaEmbarqueSeguimiento = await data.value;
                    this.mostrarLoading = false;
                } else {
                    this.listaConsultaEmbarqueSeguimiento = [];
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

    async guardarSeguimiento() {
        const usuario: any = await this._utilidadServicio.obtenerSesionUsuario();

        const dicDatos: Record<string, any> = {
            ['idUsuario']: usuario[0].idUsuario,
            ['idEmbarque']: this.idEmbarque,
            ['comentario']: this.frmSeguimiento.value.comentario
        };

        this._embarqueServicio.guardarSeguimiento(dicDatos).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Seguimiento registrado', life: 3000 });
                    await this.borrarDatos();
                    await this.cargaInfoTabla();
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

    async borrarDatos() {
        this.frmSeguimiento.patchValue({
            comentario: ''
        });
    }
}

interface iConsultaEmbarqueSerguimiento {
    idEmbarque: number;
    idUsuario: number;
    usuario: string;
    comentario: string;
    fecRegistro: string;
}
