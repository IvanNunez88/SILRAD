import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RolService } from '@/layout/service/Rol.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-ModalRol',
    templateUrl: './ModalRol.component.html',
    styleUrls: ['./ModalRol.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalRolComponent implements OnInit {
    boton: string = 'Guardar';
    marginLeft: string = '126px';
    mostrarLoading: boolean = false;
    mostrarSwitch: boolean = false;
    frmRol: FormGroup;
    rol?: iRepRol;

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        private config: DynamicDialogConfig,
        private messageService: MessageService,
        private _rolServicio: RolService
    ) {
        this.frmRol = this.fb.group({
            rol: ['', Validators.required],
            isEstatus: []
        });

        if (this.config.data != null) {
            this.rol = this.config.data as iRepRol;

            this.mostrarSwitch = true;
            this.boton = 'Actualizar';
            this.marginLeft = '116px';

            this.frmRol.patchValue({
                rol: this.rol.rol,
                isEstatus: this.rol.isActivo
            });
        }
    }

    async ngOnInit(): Promise<void> {}

    async guardar_editarRol() {
        this.mostrarLoading = true;

        if (this.rol == null) {
            //GUARDAR
            const dicDatos: Record<string, any> = {
                ['descrip']: this.frmRol.value.rol
            };

            this._rolServicio.guardar(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Rol registrado', life: 3000 });
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
                ['idRol']: this.rol.idRol,
                ['oldDescrip']: this.rol.rol,
                ['newDescrip']: this.frmRol.value.rol,
                ['isActivo']: this.frmRol.value.isEstatus
            };

            this._rolServicio.actualizar(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Rol actualizado', life: 3000 });
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

interface iRepRol {
    idRol: number;
    rol: string;
    estatus: string;
    isActivo: boolean;
}
