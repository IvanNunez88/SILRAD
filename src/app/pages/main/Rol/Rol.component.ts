import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RolService } from '@/layout/service/Rol.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ModalRolComponent } from './ModalRol/ModalRol.component';
import { ModalConfigPantallaComponent } from './ModalConfigPantalla/ModalConfigPantalla.component';

@Component({
    selector: 'app-Rol',
    templateUrl: './Rol.component.html',
    styleUrls: ['./Rol.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class RolComponent implements OnInit {
    ref: DynamicDialogRef | undefined;
    mostrarLoading: boolean = false;
    listaRol: iRepRol[] = [];
    columnasTabla: string[] = ['rol', 'estatus'];

    constructor(
        private messageService: MessageService,
        private dialog: DialogService,
        private _rolServicio: RolService
    ) {}

    async ngOnInit(): Promise<void> {
        await this.cargaInfoTabla();
    }

    async cargaInfoTabla() {
        this.mostrarLoading = true;

        this._rolServicio.listaRol().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaRol = await data.value;
                } else {
                    this.listaRol = [];
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

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async agregarRol() {
        this.ref = this.dialog.open(ModalRolComponent, {
            header: 'Nuevo Rol',
            width: '245px',
            height: '180px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: null
        });

        this.ref.onClose.subscribe(async (resultado: boolean) => {
            if (resultado) {
                await this.cargaInfoTabla();
            }
        });
    }

    async modificarRol(registro: iRepRol) {
        this.ref = this.dialog.open(ModalRolComponent, {
            header: 'Modificar Rol',
            width: '245px',
            height: '210px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: registro
        });

        this.ref.onClose.subscribe(async (resultado: boolean) => {
            if (resultado) {
                await this.cargaInfoTabla();
            }
        });
    }

    async configurarPantalla(registro: iRepRol) {
        this.ref = this.dialog.open(ModalConfigPantallaComponent, {
            header: 'Asignar Pantallas',
            width: '510px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: registro
        });
    }
}

interface iRepRol {
    idRol: number;
    rol: string;
    estatus: string;
    isActivo: boolean;
}
