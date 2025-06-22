import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RolService } from '@/layout/service/Rol.service';
import { UsuarioService } from '@/layout/service/Usuario.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-ModalUsuario',
    templateUrl: './ModalUsuario.component.html',
    styleUrls: ['./ModalUsuario.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalUsuarioComponent implements OnInit {
    boton: string = 'Guardar';
    marginLeft: string = '405px';
    mostrarLoading: boolean = false;
    mostrarSwitch: boolean = false;
    frmUsuario: FormGroup;
    listaCatRol: iCatRol[] = [];
    usuario?: iRepUsuario;

    constructor(
        private ref: DynamicDialogRef,
        private fb: FormBuilder,
        private messageService: MessageService,
        private config: DynamicDialogConfig,
        private _usuarioServicio: UsuarioService,
        private _rolServicio: RolService
    ) {
        this.frmUsuario = this.fb.group({
            nombre: ['', Validators.required],
            aPaterno: ['', Validators.required],
            aMaterno: ['', Validators.required],
            usuario: ['', Validators.required],
            idRol: [0, Validators.required],
            contra: ['', Validators.required],
            isEstatus: []
        });

        if (this.config.data != null) {
            this.usuario = this.config.data as iRepUsuario;

            this.mostrarSwitch = true;
            this.boton = 'Actualizar';
            this.marginLeft = '392px';

            this.frmUsuario.patchValue({
                nombre: this.usuario.nombre,
                aPaterno: this.usuario.aPaterno,
                aMaterno: this.usuario.aMaterno,
                usuario: this.usuario.usuario,
                idRol: this.usuario.idRol,
                contra: this.usuario.contraseña,
                isEstatus: this.usuario.isActivo
            });
        }
    }

    async ngOnInit(): Promise<void> {
        await this.cargaCatRol();
    }

    async cargaCatRol() {
        this._rolServicio.listaCatRol().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatRol = await data.value;
                }
            }
        });
    }

    async guardar_editarUsuario() {
        this.mostrarLoading = true;

        if (this.usuario == null) {
            //GUARDAR
            const dicDatos: Record<string, any> = {
                ['nombre']: this.frmUsuario.value.nombre,
                ['aPaterno']: this.frmUsuario.value.aPaterno,
                ['aMaterno']: this.frmUsuario.value.aMaterno,
                ['usuario']: this.frmUsuario.value.usuario,
                ['contraseña']: this.frmUsuario.value.contra,
                ['idRol']: this.frmUsuario.value.idRol
            };

            this._usuarioServicio.guardar(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Usuario registrada', life: 3000 });
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
                ['idUsuario']: this.usuario.idUsuario,
                ['nombre']: this.frmUsuario.value.nombre,
                ['aPaterno']: this.frmUsuario.value.aPaterno,
                ['aMaterno']: this.frmUsuario.value.aMaterno,
                ['oldDescrip']: this.usuario.usuario,
                ['newDescrip']: this.frmUsuario.value.usuario,
                ['contraseña']: this.frmUsuario.value.contra,
                ['idRol']: this.frmUsuario.value.idRol,
                ['isActivo']: this.frmUsuario.value.isEstatus
            };

            this._usuarioServicio.actualizar(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Usuario actualizado', life: 3000 });
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

interface iCatRol {
    idRol: number;
    rol: string;
}

interface iRepUsuario {
    idUsuario: number;
    nombre: string;
    aPaterno: string;
    aMaterno: string;
    nombreCompleto: string;
    usuario: string;
    contraseña: string;
    rol: string;
    idRol: number;
    estatus: string;
    isActivo: boolean;
    fecRegistro: string;
}
