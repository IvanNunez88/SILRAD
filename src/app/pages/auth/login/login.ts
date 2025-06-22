import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '@/shared/shared.module';
import { UsuarioService } from '@/layout/service/Usuario.service';
import { UtilidadService } from '@/layout/service/Utilidad.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './login.html'
})
export class Login {

    mostrarLoading: boolean = false;
    frmLogin: FormGroup;
    currentYear: number = new Date().getFullYear();

    constructor(
        private fb: FormBuilder,
        private _usuarioServicio: UsuarioService,
        private _utilidadServicio: UtilidadService,
        private router: Router,
        private messageService: MessageService,
    ) {
        this.frmLogin = this.fb.group({
            usuario: ['', [Validators.required]],
            constraseña: ['', [Validators.required]],
        });
    }

    async ngOnInit(): Promise<void> { }

    async loginSesion() {
        this.mostrarLoading = true;

        const dicDatos: Record<string, any> = {
            ["usuario"]: this.frmLogin.value.usuario,
            ["password"]: this.frmLogin.value.constraseña
        }

        this._usuarioServicio.signIn(dicDatos).subscribe({
            next: async (data) => {
                if (data.status) {
                    this._utilidadServicio.guardarSesionUsuario(await data.value)
                    this.router.navigate(["main"]);
                }
                else {
                    this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Usuario y contraseña incorrecto', life: 3000 });
                }
            },
            complete: () => {
                this.mostrarLoading = false;
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error, favor de contactar al administrador del sitio.', life: 3000 });
                this.mostrarLoading = false;
            }
        })

    }



}
