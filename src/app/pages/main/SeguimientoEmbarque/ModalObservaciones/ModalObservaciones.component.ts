import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmbarqueService } from '@/layout/service/Embarque.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-ModalObservaciones',
    templateUrl: './ModalObservaciones.component.html',
    styleUrls: ['./ModalObservaciones.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalObservacionesComponent implements OnInit {
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
            observaciones: [''],
            agenteAduanero: [{ value: '', disabled: false }]
        });

        if (this.config.data != null) {
            this.embarque = this.config.data as iRepEmbarque;

            if (this.embarque.idTipoServicio == 1) {
                this.frmAjuste.controls['agenteAduanero'].disable();
            }

            if (this.embarque.observaciones != null) {
                this.frmAjuste.patchValue({
                    observaciones: this.embarque?.observaciones
                });
            }

            if (this.embarque.agenteAduanal != null) {
                this.frmAjuste.patchValue({
                    agenteAduanero: this.embarque?.agenteAduanal
                });
            }
        }
    }

    async ngOnInit(): Promise<void> {}

    async registroObservaciones() {
        const dicDatos: Record<string, any> = {
            ['idEmbarque ']: this.embarque?.idEmbarque!,
            ['observaciones']: this.frmAjuste.value.observaciones == null ? null : this.frmAjuste.value.observaciones,
            ['agenteAduanal']: this.frmAjuste.value.agenteAduanero == null ? null : this.frmAjuste.value.agenteAduanero
        };

        this._embarqueServicio.actualizarObservaciones(dicDatos).subscribe({
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
}
