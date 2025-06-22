import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmpresaService } from '@/layout/service/Empresa.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-ModalEmpresa',
    templateUrl: './ModalEmpresa.component.html',
    styleUrls: ['./ModalEmpresa.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalEmpresaComponent implements OnInit {
    boton: string = 'Guardar';
    marginLeft: string = '470px';
    mostrarLoading: boolean = false;
    mostrarSwitch: boolean = false;
    frmEmpresa: FormGroup;
    empresa?: iReporteEmpresa;

    constructor(
        private ref: DynamicDialogRef,
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private _empresaServicio: EmpresaService,
        private messageService: MessageService
    ) {
        this.frmEmpresa = this.fb.group({
            empresa: ['', Validators.required],
            rfc: ['', Validators.required],
            direc: ['', Validators.required],
            dFactura: ['', Validators.required],
            isEstatus: []
        });

        if (this.config.data != null) {
            this.empresa = this.config.data as iReporteEmpresa;

            this.mostrarSwitch = true;
            this.boton = 'Actualizar';
            this.marginLeft = '450px';

            this.frmEmpresa.patchValue({
                empresa: this.empresa.empresa,
                rfc: this.empresa.rfc,
                dFactura: this.empresa.datosFacturacion,
                direc: this.empresa.direc,
                isEstatus: this.empresa.isActivo
            });
        }
    }

    async ngOnInit(): Promise<void> {}

    async guardar_editarEmpresa() {
        this.mostrarLoading = true;

        if (this.empresa == null) {
            //GUARDAR

            const dicDatos: Record<string, any> = {
                ['descrip']: this.frmEmpresa.value.empresa,
                ['direc']: this.frmEmpresa.value.direc,
                ['rfc']: this.frmEmpresa.value.rfc,
                ['datosFacturacion']: this.frmEmpresa.value.dFactura
            };

            this._empresaServicio.guardar(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Empresa registrada', life: 3000 });
                        this.ref.close(true);
                    } else {
                        this.mostrarLoading = false;
                        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: data.msg, life: 3000 });
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
        } else {
            //EDITAR
            const dicDatos: Record<string, any> = {
                ['idEmpresa']: this.empresa.idEmpresa,
                ['oldDescrip']: this.empresa.empresa,
                ['newDescrip']: this.frmEmpresa.value.empresa,
                ['direc']: this.frmEmpresa.value.direc,
                ['rfc']: this.frmEmpresa.value.rfc,
                ['datosFacturacion']: this.frmEmpresa.value.dFactura,
                ['isActivo']: this.frmEmpresa.value.isEstatus
            };

            this._empresaServicio.actualizar(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Empresa actualizada', life: 3000 });
                        this.ref.close(true);
                    } else {
                        this.mostrarLoading = false;
                        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: data.msg, life: 3000 });
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
