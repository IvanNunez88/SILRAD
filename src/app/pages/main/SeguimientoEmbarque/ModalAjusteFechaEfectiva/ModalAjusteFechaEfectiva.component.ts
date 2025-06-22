import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SolicitudService } from '@/layout/service/Solicitud.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-ModalAjusteFechaEfectiva',
    templateUrl: './ModalAjusteFechaEfectiva.component.html',
    styleUrls: ['./ModalAjusteFechaEfectiva.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalAjusteFechaEfectivaComponent implements OnInit {
    public minDate!: Date;
    frmAjuste: FormGroup;
    embarque?: iRepEmbarque;

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private datePipe: DatePipe,
        private _solicitudServicio: SolicitudService,
        private messageService: MessageService,
        private ref: DynamicDialogRef
    ) {
        this.frmAjuste = this.fb.group({
            fecEfectiva: [null, Validators.required]
        });

        if (this.config.data != null) {
            this.embarque = this.config.data as iRepEmbarque;

            this.frmAjuste.patchValue({
                fecEfectiva: new Date(this.embarque.fecEfectiva)
            });

            this.minDate = new Date(this.embarque.fecEfectiva) >= new Date() ? new Date() : new Date(this.embarque.fecEfectiva);
        }
    }

    async ngOnInit(): Promise<void> {}

    async ajustarFecha() {
        const dicDatos: Record<string, any> = {
            ['idEmbarque']: this.embarque?.idEmbarque!,
            ['FecEfectiva']: this.datePipe.transform(this.frmAjuste.value.fecEfectiva, 'dd/MM/yyyy')?.replace('/', '').replace('/', '')
        };

        this._solicitudServicio.actualizarFechaEfectiva(dicDatos).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Solicitud actualizada', life: 3000 });
                    this.ref.close(true);
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
