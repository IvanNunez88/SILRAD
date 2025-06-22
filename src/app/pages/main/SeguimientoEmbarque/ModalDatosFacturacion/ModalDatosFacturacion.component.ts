import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmbarqueService } from '@/layout/service/Embarque.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-ModalDatosFacturacion',
    templateUrl: './ModalDatosFacturacion.component.html',
    styleUrls: ['./ModalDatosFacturacion.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalDatosFacturacionComponent implements OnInit {
    frmAjuste: FormGroup;
    embarque?: iRepEmbarque;

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private _embarqueServicio: EmbarqueService,
        private messageService: MessageService,
        private ref: DynamicDialogRef
    ) {
        this.frmAjuste = this.fb.group({
            datosFacturacion: ['']
        });

        if (this.config.data != null) {
            this.embarque = this.config.data as iRepEmbarque;

            if (this.embarque.datosFacturacion != null) {
                this.frmAjuste.patchValue({
                    datosFacturacion: this.embarque?.datosFacturacion
                });
            }
        }
    }

    async ngOnInit(): Promise<void> {}

    async registroDatosFacturacion() {
        const dicDatos: Record<string, any> = {
            ['idEmbarque']: this.embarque?.idEmbarque!,
            ['datosFacturacion']: this.frmAjuste.value.datosFacturacion
        };

        this._embarqueServicio.actualizarDatosFacturacion(dicDatos).subscribe({
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
    noUnidad: string;
    estatus: string;
    datosFacturacion: string;
    observaciones: string;
    agenteAduanal: string;
    utilidad: number;
    margen: number;
}
