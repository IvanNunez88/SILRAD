import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SolicitudService } from '@/layout/service/Solicitud.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-ModalSecundariaNoUnidad',
    templateUrl: './ModalSecundariaNoUnidad.component.html',
    styleUrls: ['./ModalSecundariaNoUnidad.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalSecundariaNoUnidadComponent implements OnInit {
    frmEmbarque: FormGroup;
    embarque?: iReporteProveedorRuta;

    constructor(
        private fb: FormBuilder,
        private _solicitudServicio: SolicitudService,
        private config: DynamicDialogConfig,
        private ref: DynamicDialogRef,
        private messageService: MessageService
    ) {
        this.frmEmbarque = this.fb.group({
            noUnidad: ['']
        });

        if (this.config.data != null) {
            this.embarque = this.config.data as iReporteProveedorRuta;

            this.frmEmbarque.patchValue({
                noUnidad: this.embarque.noUnidad == 'PENDIENTE' ? '' : this.embarque.noUnidad
            });
        }
    }

    ngOnInit() {}

    async actualizarNoUnidad() {
        this._solicitudServicio.actualizarNoUnidad(this.embarque?.idEmbarque!, this.embarque?.idRuta!, this.frmEmbarque.value.noUnidad).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.messageService.add({ severity: 'success', summary: 'Información', detail: 'No de Unidad actualizado', life: 3000 });
                    this.ref.close(true);
                } else {
                    this.messageService.add({ severity: 'info', summary: 'Información', detail: data.msg, life: 3000 });
                }
            }
        });
    }
}

interface iReporteProveedorRuta {
    idSolicitud: number;
    idEmbarque: number;
    idRuta: number;
    noUnidad: string;
    proveedor: string;
    codMoneda: string;
    tarifa: number;
    origen: string;
    destino: string;
}
