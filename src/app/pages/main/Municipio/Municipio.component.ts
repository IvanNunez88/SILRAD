import { iCatPais } from '@/Interfaces/iCatPais';
import { PaisService } from '@/layout/service/Pais.service';
import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { EstadoService } from '@/layout/service/Estado.service';
import { MunicipioService } from '@/layout/service/Municipio.service';
import { MessageService } from 'primeng/api';
import { ModalMunicipioComponent } from './ModalMunicipio/ModalMunicipio.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { iCatEstado } from '@/Interfaces/iCatEstado';

@Component({
  selector: 'app-Municipio',
  templateUrl: './Municipio.component.html',
  styleUrls: ['./Municipio.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class MunicipioComponent implements OnInit {

  ref: DynamicDialogRef | undefined;
  mostrarLoading: boolean = false;
  frmMunicipio: FormGroup;
  listaMunicipio: iReporteMunicipio[] = [];
  listaCatPais: iCatPais[] = [];
  columnasTabla: string[] = ["pais", "estado", "municipio"];
  listaCatEstado: iCatEstado[] = [];

  constructor(
    private fb: FormBuilder,
    private _estadoServicio: EstadoService,
    private _paisServicio: PaisService,
    private _municipioServicio: MunicipioService,
    private messageService: MessageService,
    private dialog: DialogService
  ) {
    this.frmMunicipio = this.fb.group({
      idPais: [0],
      idEstado: [0]
    })

  }

  async ngOnInit(): Promise<void> {
    await this.cargaCatPais();
    await this.cargaCatEstado(0);
  }

  async cargaInfo() {
    this.mostrarLoading = true;

    let idPais: number = this.frmMunicipio.value.idPais
    let idEstado: number = this.frmMunicipio.value.idEstado

    this._municipioServicio.listaMunicipio(idPais, idEstado).subscribe({
      next: async (data) => {
        if (data.status) {
          this.listaMunicipio = await data.value;
        }
        else {
          this.listaMunicipio = [];
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

  async cargaCatEstado(idPais: number) {
    this._estadoServicio.listaCatEstadoByPais(idPais).subscribe({
      next: async (data) => {
        if (data.status) {
          this.listaCatEstado = await data.value;

          if (this.listaCatEstado.length == 1) {

            this.frmMunicipio.patchValue({
              idEstado: 0
            })
          }
        }
      }
    })
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

  async onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  async agregarMunicipio() {
    this.ref = this.dialog.open(ModalMunicipioComponent, {
      header: 'Nuevo Municipio',
      width: "260px",
      height: "280px",
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

  async modificarMunicipio(registro: iReporteMunicipio) {
    this.ref = this.dialog.open(ModalMunicipioComponent, {
      header: 'Modificar Municipio',
      width: "260px",
      height: "280px",
      modal: true,
      focusOnShow: false,
      closable: true,
      draggable: true,
      data: registro
    })

    this.ref.onClose.subscribe(async (resultado: boolean) => {
      if (resultado) {
        this.cargaInfo();
      }
    })

  }


}

interface iReporteMunicipio {
  idMunicipio: number,
  municipio: string,
  idEstado: number,
  estado: string,
  idPais: number,
  pais: string
}