import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisService } from '@/layout/service/Pais.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ClienteService } from '@/layout/service/Cliente.service';
import { UtilidadService } from '@/layout/service/Utilidad.service';
import { MessageService } from 'primeng/api';
import { iCatPais } from '@/Interfaces/iCatPais';

@Component({
    selector: 'app-ModalCliente',
    templateUrl: './ModalCliente.component.html',
    styleUrls: ['./ModalCliente.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalClienteComponent implements OnInit {
    boton: string = 'Guardar';
    marginLeft: string = '565px';
    mostrarLoading: boolean = false;
    mostrarSwitch: boolean = false;
    frmCliente: FormGroup;
    listaCatPais: iCatPais[] = [];
    cliente: any;

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        private config: DynamicDialogConfig,
        private _paisServicio: PaisService,
        private _clienteServicio: ClienteService,
        private _utilidadServicio: UtilidadService,
        private messageService: MessageService
    ) {
        this.frmCliente = this.fb.group({
            cliente: ['', Validators.required],
            rfc: ['', Validators.required],
            idPais: [0, Validators.required],
            estado: ['', Validators.required],
            municipio: ['', Validators.required],
            calle: ['', Validators.required],
            colonia: ['', Validators.required],
            cp: ['', Validators.required],
            dCredito: [0, Validators.required],
            isEstatus: []
        });

        if (this.config.data != null) {
            this.cliente = this.config.data;

            this.mostrarSwitch = true;
            this.boton = 'Actualizar';
            this.marginLeft = '554px';

            this.frmCliente.patchValue({
                cliente: this.cliente.cliente,
                rfc: this.cliente.rfc,
                idPais: this.cliente.idPais,
                estado: this.cliente.estado,
                municipio: this.cliente.municipio,
                calle: this.cliente.calle,
                colonia: this.cliente.colonia,
                cp: this.cliente.cp,
                dCredito: this.cliente.diasCredito,
                isEstatus: this.cliente.isActivo
            });
        }
    }

    async ngOnInit(): Promise<void> {
        await this.cargaCatPais();
    }

    async cargaCatPais() {
        this._paisServicio.listaCatPais().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatPais = await data.value;
                }
            }
        });
    }

    async guardar_editarCliente() {
        this.mostrarLoading = true;

        const usuario: any = await this._utilidadServicio.obtenerSesionUsuario();

        if (this.cliente == null) {
            // GUARDAR

            const dicDatos: Record<string, any> = {
                ['idUsuario']: usuario[0].idUsuario,
                ['descrip']: this.frmCliente.value.cliente,
                ['rfc']: this.frmCliente.value.rfc,
                ['idPais']: this.frmCliente.value.idPais,
                ['estado']: this.frmCliente.value.estado,
                ['municipio']: this.frmCliente.value.municipio,
                ['calleDir']: this.frmCliente.value.calle,
                ['colDir']: this.frmCliente.value.colonia,
                ['cp']: this.frmCliente.value.cp,
                ['diasCredito']: this.frmCliente.value.dCredito
            };

            this._clienteServicio.guardar(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Cliente registrado', life: 3000 });
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
            // EDITAR

            const dicDatos: Record<string, any> = {
                ['idCliente']: this.cliente.idCliente,
                ['idUsuario']: usuario[0].idUsuario,
                ['oldDescrip']: this.cliente.cliente,
                ['newDescrip']: this.frmCliente.value.cliente,
                ['rfc']: this.frmCliente.value.rfc,
                ['idPais']: this.frmCliente.value.idPais,
                ['estado']: this.frmCliente.value.estado,
                ['municipio']: this.frmCliente.value.municipio,
                ['calleDir']: this.frmCliente.value.calle,
                ['colDir']: this.frmCliente.value.colonia,
                ['cp']: this.frmCliente.value.cp,
                ['diasCredito']: this.frmCliente.value.dCredito,
                ['isActivo']: this.frmCliente.value.isEstatus
            };

            this._clienteServicio.actualizar(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Cliente actualizado', life: 3000 });
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

interface iCliente {
    idCliente: number;
    cliente: string;
    rfc: string;
    idPais: number;
    pais: string;
    estado: string;
    municipio: string;
    calle: string;
    colonia: string;
    cp: string;
    diasCredito: number;
    isActivo: boolean;
}
