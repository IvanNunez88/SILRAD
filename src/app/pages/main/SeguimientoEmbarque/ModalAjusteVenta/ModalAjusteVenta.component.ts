import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SolicitudService } from '@/layout/service/Solicitud.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-ModalAjusteVenta',
    templateUrl: './ModalAjusteVenta.component.html',
    styleUrls: ['./ModalAjusteVenta.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalAjusteVentaComponent implements OnInit {
    frmAjuste: FormGroup;
    embarque?: iRepEmbarque;

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private _solicitudServicio: SolicitudService,
        private messageService: MessageService,
        private ref: DynamicDialogRef
    ) {
        this.frmAjuste = this.fb.group({
            venta: [0, Validators.required]
        });

        if (this.config.data != null) {
            this.embarque = this.config.data as iRepEmbarque;

            this.frmAjuste.patchValue({
                venta: this.embarque.monto
            });
        }
    }

    ngOnInit() {}

    async actualizarVenta() {
        this._solicitudServicio.actualizarVenta(this.embarque?.idEmbarque!, this.frmAjuste.value.venta).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Solicitud registrada', life: 3000 });
                    this.ref.close(true);
                } else {
                    this.messageService.add({ severity: 'info', summary: 'Información', detail: data.msg, life: 3000 });
                }
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
    idMoneda: number;
    codMoneda: string;
    monto: number;
    fecEfectiva: Date;
    fecEfectivaF: string;
    idEstatusEmbarque: number;
    estatus: string;
}
