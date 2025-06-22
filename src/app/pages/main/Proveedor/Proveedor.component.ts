import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProveedorService } from '@/layout/service/Proveedor.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ModalProveedorComponent } from './ModalProveedor/ModalProveedor.component';
import { ModalProveedorMonedaComponent } from './ModalProveedorMoneda/ModalProveedorMoneda.component';

@Component({
  selector: 'app-Proveedor',
  templateUrl: './Proveedor.component.html',
  styleUrls: ['./Proveedor.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class ProveedorComponent implements OnInit {

  ref: DynamicDialogRef | undefined;
  mostrarLoading: boolean = false;
  listaProveedor: iReporteProveedor[] = [];
  columnasTabla: string[] = ["idProveedor", "proveedor", "rfc", "pais", "diasCredito", "estatus"];

  constructor(
    private messageService: MessageService,
    private _proveedorServicio: ProveedorService,
    private dialog: DialogService
  ) { }


  async ngOnInit(): Promise<void> {
    await this.cargaInfo();
  }

  async onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  async cargaInfo() {
    this.mostrarLoading = true;

    this._proveedorServicio.listarProveedor().subscribe({
      next: async (data) => {
        if (data.status) {
          this.listaProveedor = await data.value;
        }
        else {
          this.listaProveedor = [];
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

  async agregarProveedor() {
    this.ref = this.dialog.open(ModalProveedorComponent, {
      header: 'Nuevo Proveedor',
      width: "680px",
      height: "325px",
      modal: true,
      focusOnShow: false,
      closable: true,
      draggable: true,
      data: null
    })

    this.ref.onClose.subscribe(async (resultado: boolean) => {
      if (resultado) {
        await this.cargaInfo();
      }
    });

  }


  async modificarProveedor(registro: iReporteProveedor) {
    this.ref = this.dialog.open(ModalProveedorComponent, {
      header: 'Modificar Proveedor',
      width: "680px",
      height: "350px",
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

  async configurarMoneda(registro: iReporteProveedor) {
    this.ref = this.dialog.open(ModalProveedorMonedaComponent, {
      header: 'Registro Moneda Proveedor',
      width: "500px",
      modal: true,
      focusOnShow: false,
      closable: true,
      draggable: true,
      dismissableMask: true,
      data: registro.idProveedor
    })

  }


}

interface iReporteProveedor {
  idProveedor: number,
  proveedor: string,
  rfc: string,
  idPais: number,
  pais: string,
  estado: string,
  municipio: string,
  calle: string,
  colonia: string,
  cp: string,
  diasCredito: number,
  isActivo: boolean,
  estatus: string
}