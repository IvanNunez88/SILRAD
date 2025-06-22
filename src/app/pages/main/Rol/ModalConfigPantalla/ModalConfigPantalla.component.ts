import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { RolService } from '@/layout/service/Rol.service';
import { PantallaService } from '@/layout/service/Pantalla.service';

@Component({
    selector: 'app-ModalConfigPantalla',
    templateUrl: './ModalConfigPantalla.component.html',
    styleUrls: ['./ModalConfigPantalla.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalConfigPantallaComponent implements OnInit {
    rol?: iRepRol;
    frmRol: FormGroup;
    mostrarLoading: boolean = false;
    listaConsulRolPantalla: iConsulRolPantalla[] = [];
    columnasTabla: string[] = ['pantalla', 'fecRegistro'];
    listaCatPantalla: iCatPantalla[] = [];

    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private _rolServicio: RolService,
        private _pantallaServicio: PantallaService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.frmRol = this.fb.group({
            idPantalla: [0]
        });

        if (this.config.data != null) {
            this.rol = this.config.data as iRepRol;
        }
    }

    async ngOnInit(): Promise<void> {
        await this.cargarInfoTabla();
        await this.cargaCatPantalla();
    }

    async cargaCatPantalla() {
        this._pantallaServicio.ListaCatPantallaByRol(this.rol?.idRol!).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatPantalla = await data.value;
                } else {
                    this.listaCatPantalla = [];
                }
            }
        });
    }

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async cargarInfoTabla() {
        this.mostrarLoading = true;

        this._rolServicio.listaRolPantalla(this.rol?.idRol!).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaConsulRolPantalla = await data.value;
                    this.mostrarLoading = false;
                } else {
                    this.listaConsulRolPantalla = [];
                    this.mostrarLoading = false;
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

    async guardarPantalla() {
        this.mostrarLoading = true;

        const dicDatos: Record<string, any> = {
            ['idRol']: this.rol?.idRol,
            ['idPantalla']: this.frmRol.value.idPantalla
        };

        this._rolServicio.guardarRolPantalla(dicDatos).subscribe({
            next: async (data) => {
                if (data.status) {
                    await this.cargarInfoTabla();
                    await this.cargaCatPantalla();
                    await this.borrarDatos();
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

    async borrarDatos() {
        this.frmRol.patchValue({
            idPantalla: 0
        });
    }

    async borrarPantalla(event: Event, registro: iConsulRolPantalla) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            header: 'Confirmación',
            message: `¿Deseas borrar la pantalla ${registro.pantalla}?`,
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Borrar',
                severity: 'danger'
            },
            accept: () => {
                this.mostrarLoading = true;

                this._rolServicio.borrarRolPantalla(registro.idRol, registro.idPantalla).subscribe({
                    next: async (data) => {
                        if (data.status) {
                            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Pantalla eliminada', life: 3000 });
                            await this.cargarInfoTabla();
                            await this.cargaCatPantalla();
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
        });
    }
}

interface iRepRol {
    idRol: number;
    rol: string;
    estatus: string;
    isActivo: boolean;
}

interface iConsulRolPantalla {
    idRol: number;
    idPantalla: number;
    pantalla: string;
    fecRegistro: string;
}

interface iCatPantalla {
    idPantalla: number;
    pantalla: string;
}
