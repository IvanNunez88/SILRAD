import { UtilidadService } from '@/layout/service/Utilidad.service';
import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmbarqueService } from '@/layout/service/Embarque.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ModalVentaAdicionalComponent } from './ModalVentaAdicional/ModalVentaAdicional.component';
import { ModalAjusteVentaComponent } from './ModalAjusteVenta/ModalAjusteVenta.component';
import { ModalDetalleEmbarqueComponent } from './ModalDetalleEmbarque/ModalDetalleEmbarque.component';
import { ModalAjusteFechaEfectivaComponent } from './ModalAjusteFechaEfectiva/ModalAjusteFechaEfectiva.component';
import { ModalAjusteClienteComponent } from './ModalAjusteCliente/ModalAjusteCliente.component';
import { ModalEstatusComponent } from './ModalEstatus/ModalEstatus.component';
import { ModalSeguimientoComponent } from './ModalSeguimiento/ModalSeguimiento.component';
import { ModalDatosFacturacionComponent } from './ModalDatosFacturacion/ModalDatosFacturacion.component';
import { ModalObservacionesComponent } from './ModalObservaciones/ModalObservaciones.component';

@Component({
    selector: 'app-SeguimientoEmbarque',
    templateUrl: './SeguimientoEmbarque.component.html',
    styleUrls: ['./SeguimientoEmbarque.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class SeguimientoEmbarqueComponent implements OnInit {
    listaEmbarques: iRepEmbarque[] = [];
    ref: DynamicDialogRef | undefined;
    mostrarLoading: boolean = false;
    columnasTabla: string[] = ['referencia', 'empresa', 'noUnidad', 'cliente', 'tipoUnidad', 'fecEfectiva', 'estatus', 'venta', 'profit', 'marguen'];

    constructor(
        private dialog: DialogService,
        private _utilidadServicio: UtilidadService,
        private _embarqueServicio: EmbarqueService,
        private messageService: MessageService
    ) {}

    async ngOnInit(): Promise<void> {
        await this.cargaInfo();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async cargaInfo() {
        this.mostrarLoading = true;

        const usuario: any = await this._utilidadServicio.obtenerSesionUsuario();

        this._embarqueServicio.listaEmbarques(usuario[0].idUsuario).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaEmbarques = await data.value;
                } else {
                    this.listaEmbarques = [];
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

    async detalleEmbarque(registro: iRepEmbarque) {
        this.ref = this.dialog.open(ModalDetalleEmbarqueComponent, {
            header: 'Detalle Embarque',
            width: '1070px',
            // height: '505px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: registro.idEmbarque
        });
        this.ref.onClose.subscribe(async () => {
            await this.cargaInfo();
        });
    }

    async ventaAdicional(registro: iRepEmbarque) {
        this.ref = this.dialog.open(ModalVentaAdicionalComponent, {
            header: 'Venta Adicional',
            width: '700px',
            // height: "485px",
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: registro.idEmbarque
        });

        this.ref.onClose.subscribe(async () => {
            await this.cargaInfo();
        });
    }

    async ajusteVenta(registro: iRepEmbarque) {
        this.ref = this.dialog.open(ModalAjusteVentaComponent, {
            header: 'Ajuste Venta',
            width: '285px',
            height: '170px',
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

    async ajusteFechaEfectiva(registro: iRepEmbarque) {
        this.ref = this.dialog.open(ModalAjusteFechaEfectivaComponent, {
            header: 'Ajuste Fecha Efectiva',
            width: '290px',
            height: '175px',
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

    async ajusteCliente(registro: iRepEmbarque) {
        this.ref = this.dialog.open(ModalAjusteClienteComponent, {
            header: 'Ajuste Cliente',
            width: '300px',
            height: '175px',
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

    async registroEstatus(registro: iRepEmbarque) {
        this.ref = this.dialog.open(ModalEstatusComponent, {
            header: 'Actualizar Estatus',
            width: '700px',
            // height: "485px",
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: registro.idEmbarque
        });

        this.ref.onClose.subscribe(async () => {
            await this.cargaInfo();
        });
    }

    async registroSeguimiento(registro: iRepEmbarque) {
        this.ref = this.dialog.open(ModalSeguimientoComponent, {
            header: 'Registro Seguimiento',
            width: '700px',
            // height: "485px",
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: registro.idEmbarque
        });
    }

    async datosFacturacion(registro: iRepEmbarque) {
        this.ref = this.dialog.open(ModalDatosFacturacionComponent, {
            header: 'Ajuste Cliente',
            width: '350px',
            height: '260px',
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

    async datosObservaciones(registro: iRepEmbarque) {
        this.ref = this.dialog.open(ModalObservacionesComponent, {
            header: 'Observaciones',
            width: '690px',
            height: '240px',
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
}

interface iRepEmbarque {
    referencia: string;
    idEmbarque: number;
    idSolicitud: number;
    idEmpresa: number;
    empresa: string;
    idCliente: number;
    cliente: string;
    idTipoUnidad: number;
    tipoUnidad: string;
    idTipoServicio: number;
    idMoneda: number;
    codMoneda: string;
    monto: number;
    fecEfectiva: Date;
    fecEfectivaF: string;
    idEstatusEmbarque: number;
    noUnidad: string;
    estatus: string;
    datosFacturacion: string;
    observaciones: string;
    agenteAduanal: string;
    utilidad: number;
    margen: number;
    usuario: string;
}
