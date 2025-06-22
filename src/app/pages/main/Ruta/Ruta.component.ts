import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProveedorService } from '@/layout/service/Proveedor.service';
import { MunicipioService } from '@/layout/service/Municipio.service';
import { iCatProveedor } from '@/Interfaces/iCatProveedor';
import { iCatMunicipio } from '@/Interfaces/iCatMunicipio';
import { Table } from 'primeng/table';
import { RutaService } from '@/layout/service/Ruta.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalRutaComponent } from './ModalRuta/ModalRuta.component';

@Component({
    selector: 'app-Ruta',
    templateUrl: './Ruta.component.html',
    styleUrls: ['./Ruta.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class RutaComponent implements OnInit {
    frmRuta: FormGroup;
    listaRuta: iReporteRuta[] = [];
    mostrarLoading: boolean = false;
    columnasTabla: string[] = ['idRuta', 'proveedor', 'tipoUnidad', 'origen', 'destino', 'moneda', 'tarifa', 'comentario', 'estatus'];
    listaCatProveedor: iCatProveedor[] = [];
    listaCatMunicipio: iCatMunicipio[] = [];
    ref: DynamicDialogRef | undefined;

    constructor(
        private fb: FormBuilder,
        private dialog: DialogService,
        private _proveedorServicio: ProveedorService,
        private _municipioServicio: MunicipioService,
        private _rutaServicio: RutaService,
        private messageService: MessageService
    ) {
        this.frmRuta = this.fb.group({
            idProveedor: [0],
            idOrigen: [0],
            idDestino: [0]
        });
    }

    async ngOnInit(): Promise<void> {
        await this.cargaProveedor();
        await this.cargarCiudad();
    }

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    async cargaProveedor() {
        this._proveedorServicio.listarCatProveedor().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatProveedor = await data.value;
                }
            }
        });
    }

    async cargarCiudad() {
        this._municipioServicio.listaCatMunicipio().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatMunicipio = await data.value;
                }
            }
        });
    }

    async cargaInfo() {
        this.mostrarLoading = true;

        const idProveedor: number = this.frmRuta.value.idProveedor;
        const idOrigen: number = this.frmRuta.value.idOrigen;
        const idDestino: number = this.frmRuta.value.idDestino;

        this._rutaServicio.ListaRuta(idProveedor, idOrigen, idDestino).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaRuta = await data.value;
                    this.mostrarLoading = false;
                } else {
                    this.listaRuta = [];
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

    async registarRuta() {
        this.ref = this.dialog.open(ModalRutaComponent, {
            header: 'Registrar Ruta',
            width: '465px',
            height: '407px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            data: null
        });

        this.ref.onClose.subscribe(async (resultado: boolean) => {
            if (resultado) {
                await this.cargaInfo();
            }
        });
    }

    async actualizarRuta(registro: iReporteRuta) {
        this.ref = this.dialog.open(ModalRutaComponent, {
            header: 'Registrar Ruta',
            width: '465px',
            height: '440px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            data: registro
        });

        this.ref.onClose.subscribe(async (resultado: boolean) => {
            if (resultado) {
                await this.cargaInfo();
            }
        });
    }
}

interface iReporteRuta {
    idRuta: number;
    proveedor: string;
    idProveedor: number;
    tipoUnidad: string;
    idTipoUnidad: number;
    origen: string;
    idOrigen: number;
    destino: string;
    idDestino: number;
    clasificacion: string;
    idClasificacion: number;
    moneda: string;
    idMoneda: number;
    tarifa: number;
    comentario: string;
    estatus: string;
    isActivo: boolean;
}
