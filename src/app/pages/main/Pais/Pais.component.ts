import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaisService } from '@/layout/service/Pais.service';
import { Table } from 'primeng/table';
import { ModalPaisComponent } from './ModalPais/ModalPais.component';

@Component({
  selector: 'app-Pais',
  templateUrl: './Pais.component.html',
  styleUrls: ['./Pais.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class PaisComponent implements OnInit {

  ref: DynamicDialogRef | undefined;
  mostrarLoading: boolean = false;
  listaPais: iReportePais[] = [];
  columnasTabla: string[] = ["pais", "siglas", "fecRegistro"];

  constructor(
    private messageService: MessageService,
    private _paisServicio: PaisService,
    private dialog: DialogService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.cargaInfo();
  }

  async onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  async agregarPais() {
    this.ref = this.dialog.open(ModalPaisComponent, {
      header: 'Nuevo País',
      width: "290px",
      height: "240px",
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
    })

  }

  async cargaInfo() {
    this.mostrarLoading = true;
    
    this._paisServicio.listaPais().subscribe({
      next: async (data) => {
        if (data.status) {
          this.listaPais = await data.value;
        }
        else {
          this.listaPais = [];
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

  async modificarPais(registro: iReportePais) {
    this.ref = this.dialog.open(ModalPaisComponent, {
      header: 'Modificar País',
      width: "290px",
      height: "240px",
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


interface iReportePais {
  idPais: number,
  pais: string,
  siglas: string,
  fecRegistro: string
}
