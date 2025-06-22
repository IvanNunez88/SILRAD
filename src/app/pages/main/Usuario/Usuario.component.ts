import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '@/layout/service/Usuario.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ModalUsuarioComponent } from './ModalUsuario/ModalUsuario.component';

@Component({
    selector: 'app-Usuario',
    templateUrl: './Usuario.component.html',
    styleUrls: ['./Usuario.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class UsuarioComponent implements OnInit {
    ref: DynamicDialogRef | undefined;
    mostrarLoading: boolean = true;
    listaUsuario: iRepUsuario[] = [];
    columnasTabla: string[] = ['nombreCompleto', 'usuario', 'rol', 'estatus', 'fecRegistro'];

    constructor(
        private messageService: MessageService,
        private _usuarioServicio: UsuarioService,
        private dialog: DialogService
    ) {}

    async ngOnInit(): Promise<void> {
        await this.cargarInfoTabla();
    }

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async cargarInfoTabla() {
        this.mostrarLoading = true;

        this._usuarioServicio.listaUsuario().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaUsuario = await data.value;
                    this.mostrarLoading = false;
                } else {
                    this.listaUsuario = [];
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

    async agregarUsuario() {
        this.ref = this.dialog.open(ModalUsuarioComponent, {
            header: 'Nueva Usuario',
            width: '520px',
            height: '308px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            data: null
        });

        this.ref.onClose.subscribe(async (resultado: boolean) => {
            if (resultado) {
                await this.cargarInfoTabla();
            }
        });
    }

    async modificarUsuario(registro: iRepUsuario) {
        this.ref = this.dialog.open(ModalUsuarioComponent, {
            header: 'Nueva Usuario',
            width: '520px',
            height: '335px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            data: registro
        });

        this.ref.onClose.subscribe(async (resultado: boolean) => {
            if (resultado) {
                await this.cargarInfoTabla();
            }
        });
    }
}

interface iRepUsuario {
    idUsuario: number;
    nombre: string;
    aPaterno: string;
    aMaterno: string;
    nombreCompleto: string;
    usuario: string;
    contraseña: string;
    rol: string;
    idRol: number;
    estatus: string;
    isActivo: boolean;
    fecRegistro: string;
}
