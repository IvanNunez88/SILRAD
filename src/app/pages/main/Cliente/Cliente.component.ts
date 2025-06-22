import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '@/layout/service/Cliente.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalClienteComponent } from './ModalCliente/ModalCliente.component';
import { ModalClienteMonedaComponent } from './ModalClienteMoneda/ModalClienteMoneda.component';
import { ModalClienteFacturaComponent } from './ModalClienteFactura/ModalClienteFactura.component';
import { ModalDocumentacionComponent } from './ModalDocumentacion/ModalDocumentacion.component';

@Component({
    selector: 'app-Cliente',
    templateUrl: './Cliente.component.html',
    styleUrls: ['./Cliente.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ClienteComponent implements OnInit {
    ref: DynamicDialogRef | undefined;
    mostrarLoading: boolean = false;
    listaCliente: iRepCliente[] = [];
    columnasTabla: string[] = ['idCliente', 'cliente', 'rfc', 'pais', 'estado', 'diasCredito', 'estatus'];

    constructor(
        private messageService: MessageService,
        private _clienteServicio: ClienteService,
        private dialog: DialogService
    ) {}

    async ngOnInit(): Promise<void> {
        await this.cargaInfo();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async cargaInfo() {
        this.mostrarLoading = true;

        this._clienteServicio.listaCliente().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCliente = await data.value;
                } else {
                    this.listaCliente = [];
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

    async agregarCliente() {
        this.ref = this.dialog.open(ModalClienteComponent, {
            header: 'Nuevo Cliente',
            width: '680px',
            height: '310px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: null
        });

        this.ref.onClose.subscribe(async (resultado: boolean) => {
            if (resultado) {
                await this.cargaInfo();
            }
        });
    }

    async modificarCliente(registro: iRepCliente) {
        this.ref = this.dialog.open(ModalClienteComponent, {
            header: 'Modificar Cliente',
            width: '680px',
            height: '340px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: registro
        });

        this.ref.onClose.subscribe(async (resultado: boolean) => {
            if (resultado) {
                await this.cargaInfo();
            }
        });
    }

    async configurarMoneda(registro: iRepCliente) {
        this.ref = this.dialog.open(ModalClienteMonedaComponent, {
            header: 'Registro Moneda Cliente',
            width: '580px',
            // height: "485px",
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: registro.idCliente
        });
    }

    async configuraEmpresaFactura(registro: iRepCliente) {
        this.ref = this.dialog.open(ModalClienteFacturaComponent, {
            header: 'Registro Empresa Factura',
            width: '580px',
            // height: "485px",
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: registro.idCliente
        });
    }

    async configurarDocumentos(registro: iRepCliente) {
        this.ref = this.dialog.open(ModalDocumentacionComponent, {
            header: 'Registro Empresa Factura',
            width: '750px',
            // height: "485px",
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: registro.idCliente
        });
    }
}

interface iRepCliente {
    idCliente: number;
    cliente: string;
    rfc: string;
    idPais: number;
    pais: string;
    estado: string;
    municipio: string;
    calle: string;
    colonia: string;
    cp: string;
    diasCredito: number;
    isActivo: boolean;
    estatus: string;
    fechaRegistro: string;
    contacto: string;
    tel: string;
    correo: string;
    csr: string;
    vendedor: string;
}
