import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmpresaService } from '@/layout/service/Empresa.service';
import { Table } from 'primeng/table';
import { ModalEmpresaComponent } from './ModalEmpresa/ModalEmpresa.component';

@Component({
    selector: 'app-Empresa',
    templateUrl: './Empresa.component.html',
    styleUrls: ['./Empresa.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class EmpresaComponent implements OnInit {
    ref: DynamicDialogRef | undefined;
    mostrarLoading: boolean = false;
    listaEmpresa: iReporteEmpresa[] = [];
    columnasTabla: string[] = ['idEmpresa', 'empresa', 'rfc', 'estatus'];

    constructor(
        private messageService: MessageService,
        private _empresaServicio: EmpresaService,
        private dialog: DialogService
    ) {}

    async ngOnInit(): Promise<void> {
        await this.cargaInfo();
    }

    async cargaInfo() {
        this.mostrarLoading = true;

        this._empresaServicio.listaEmpresa().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaEmpresa = await data.value;
                    this.mostrarLoading = false;
                } else {
                    this.listaEmpresa = [];
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

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async modificarEmpresa(registro: iReporteEmpresa) {
        this.ref = this.dialog.open(ModalEmpresaComponent, {
            header: 'Modificar Empresa',
            width: '585px',
            height: '410px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            data: registro
        });

        this.ref.onClose.subscribe(async (resultado: boolean) => {
            if (resultado) {
                await this.cargaInfo();
            }
        });
    }

    async agregarEmpresa() {
        this.ref = this.dialog.open(ModalEmpresaComponent, {
            header: 'Nueva Empresa',
            width: '585px',
            height: '380px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            data: null
        });

        this.ref.onClose.subscribe(async (resultado: boolean) => {
            if (resultado) {
                await this.cargaInfo();
            }
        });
    }
}

interface iReporteEmpresa {
    idEmpresa: number;
    empresa: string;
    direc: string;
    datosFacturacion: string;
    rfc: string;
    isActivo: boolean;
    estatus: string;
    fecRegistro: string;
}
