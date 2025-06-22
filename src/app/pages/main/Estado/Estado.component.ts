import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { PaisService } from '@/layout/service/Pais.service';
import { iCatPais } from '@/Interfaces/iCatPais';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EstadoService } from '@/layout/service/Estado.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ModalEstadoComponent } from './ModalEstado/ModalEstado.component';

@Component({
  selector: 'app-Estado',
  templateUrl: './Estado.component.html',
  styleUrls: ['./Estado.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class EstadoComponent implements OnInit {

  ref: DynamicDialogRef | undefined;
  mostrarLoading: boolean = false;
  listaCatPais: iCatPais[] = [];
  frmEstado: FormGroup;
  listaEstado: iReporteEstado[] = [];
  columnasTabla: string[] = ["pais", "estado", "siglas"];
  estado: any;

  constructor(
    private fb: FormBuilder,
    private _paisServicio: PaisService,
    private _estadoServicio: EstadoService,
    private messageService: MessageService,
    private dialog: DialogService

  ) {
    this.frmEstado = this.fb.group({
      idPais: [0],
    })

  }

  async ngOnInit(): Promise<void> {
    await this.cargaCatPais();
  }

  async onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  async cargaCatPais() {
    this._paisServicio.listaCatPais().subscribe({
      next: async (data) => {
        if (data.status) {
          this.listaCatPais = await data.value;
        }
      }
    })
  }

  async cargaInfo() {
    this.mostrarLoading = true;

    this._estadoServicio.listaEstado(this.frmEstado.value.idPais).subscribe({
      next: async (data) => {
        if (data.status) {
          this.listaEstado = await data.value;
        }
        else {
          this.listaEstado = [];
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


  async agregarEstado() {
    this.ref = this.dialog.open(ModalEstadoComponent, {
      header: 'Nuevo Estado',
      width: "255px",
      height: "275px",
      modal: true,
      focusOnShow: false,
      closable: true,
      draggable: true,
      data: null
    })

    this.ref.onClose.subscribe(async (resultado: boolean) => {
      if (resultado) {
        this.cargaInfo();
      }
    })
  }

  async modificarEstado(registro: iReporteEstado) {
    this.ref = this.dialog.open(ModalEstadoComponent, {
      header: 'Modificar Estado',
      width: "255px",
      height: "275px",
      modal: true,
      focusOnShow: false,
      closable: true,
      draggable: true,
      data: registro
    })

    this.ref.onClose.subscribe(async (resultado: boolean) => {
      if (resultado) {
        await this.cargaInfo();
      }
    })

  }


}

interface iReporteEstado {
  idEstado: number,
  estado: string,
  siglas: string,
  pais: string,
  idPais: number
}
