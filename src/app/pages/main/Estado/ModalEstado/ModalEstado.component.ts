import { iCatPais } from '@/Interfaces/iCatPais';
import { PaisService } from '@/layout/service/Pais.service';
import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EstadoService } from '@/layout/service/Estado.service';
import { MunicipioService } from '@/layout/service/Municipio.service';

@Component({
  selector: 'app-ModalEstado',
  templateUrl: './ModalEstado.component.html',
  styleUrls: ['./ModalEstado.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class ModalEstadoComponent implements OnInit {

  boton: string = "Guardar";
  marginLeft: string = '135px';
  mostrarLoading: boolean = false;
  frmEstado: FormGroup;
  listaCatPais: iCatPais[] = [];
  estado: any;


  constructor(
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private _paisServicio: PaisService,
    private _estadoServicio: EstadoService

  ) {
    this.frmEstado = this.fb.group({
      idPais: [0, Validators.required],
      estado: ["", Validators.required],
      siglas: ["", Validators.required],
    })

    if (this.config.data != null) {
      this.estado = this.config.data;
      this.boton = "Actualizar"
      this.marginLeft = '125px';
      this.frmEstado.patchValue({
        idPais: this.estado.idPais,
        estado: this.estado.estado,
        siglas: this.estado.siglas
      })
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
    })
  }

  async guardar_editarEstado() {
    this.mostrarLoading = true;

    if (this.estado == null) {
      // GUARDAR

      const dicDatos: Record<string, any> = {
        ["descrip"]: this.frmEstado.value.estado,
        ["siglas"]: this.frmEstado.value.siglas,
        ["idPais"]: this.frmEstado.value.idPais
      }

      this._estadoServicio.guardar(dicDatos).subscribe({
        next: async (data) => {
          if (data.status) {
            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Estado registrada', life: 3000 });
            this.ref.close(true);
          }
          else {
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
      })
    }
    else {
      // EDITAR

      const dicDatos: Record<string, any> = {
        ["idEstado"]: this.estado.idEstado,
        ["oldDescrip"]: this.estado.estado,
        ["newDescrip"]: this.frmEstado.value.estado,
        ["siglas"]: this.frmEstado.value.siglas,
        ["idPais"]: this.frmEstado.value.idPais
      }

      this._estadoServicio.actualizar(dicDatos).subscribe({
        next: async (data) => {
          if (data.status) {
            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'País actualizado', life: 3000 });
            this.ref.close(true);
          }
          else {
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
      })
    }
  }

}
