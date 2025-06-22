import { ClienteService } from '@/layout/service/Cliente.service';
import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SolicitudService } from '@/layout/service/Solicitud.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-ModalAjusteCliente',
    templateUrl: './ModalAjusteCliente.component.html',
    styleUrls: ['./ModalAjusteCliente.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalAjusteClienteComponent implements OnInit {
    frmAjuste: FormGroup;
    listaCatCliente: iCatCliente[] = [];
    embarque?: iRepEmbarque;

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private _clienteServicio: ClienteService,
        private _solicitudServicio: SolicitudService,
        private messageService: MessageService,
        private ref: DynamicDialogRef
    ) {
        this.frmAjuste = this.fb.group({
            idCliente: [0]
        });

        if (this.config.data != null) {
            this.embarque = this.config.data as iRepEmbarque;
        }
    }

    async ngOnInit(): Promise<void> {
        await this.cargaCatCliente();
    }

    async cargaCatCliente() {
        this._clienteServicio.listaCatCliente().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatCliente = await data.value;
                } else {
                    this.listaCatCliente = [];
                }

                const prueba = this.listaCatCliente.filter((x) => x.idCliente == this.embarque?.idCliente);

                if (prueba.length > 0) {
                    this.frmAjuste.patchValue({
                        idCliente: this.embarque?.idCliente
                    });
                } else {
                    this.frmAjuste.patchValue({
                        idCliente: 0
                    });
                }
            }
        });
    }

    async ajusteCliente() {
        this._solicitudServicio.actualizarCliente(this.embarque?.idEmbarque!, this.frmAjuste.value.idCliente).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Solicitud actualizada', life: 3000 });
                    this.ref.close(true);
                } else {
                    this.messageService.add({ severity: 'info', summary: 'Información', detail: data.msg, life: 3000 });
                }
            }
        });
    }
}

interface iCatCliente {
    idCliente: number;
    cliente: string;
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
