import { iCatPais } from '@/Interfaces/iCatPais';
import { EstadoService } from '@/layout/service/Estado.service';
import { PaisService } from '@/layout/service/Pais.service';
import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { iCatEstado } from '@/Interfaces/iCatEstado';
import { MunicipioService } from '@/layout/service/Municipio.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ModalMunicipio',
  templateUrl: './ModalMunicipio.component.html',
  styleUrls: ['./ModalMunicipio.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class ModalMunicipioComponent implements OnInit {

  boton: string = "Guardar";
  marginLeft: string = '145px';
  mostrarLoading: boolean = false;
  frmMunicipio: FormGroup;
  listaCatPais: iCatPais[] = [];
  listaCatEstado: iCatEstado[] = [];
  municipio: any;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private _paisServicio: PaisService,
    private _estadoServicio: EstadoService,
    private _municipioServicio: MunicipioService
  ) {
    this.frmMunicipio = this.fb.group({
      idPais: [0, Validators.required],
      idEstado: [0, Validators.required],
      municipio: ["", Validators.required],

    })

    if (this.config.data != null) {
      this.municipio = this.config.data;
      this.boton = "Actualizar"
      this.marginLeft = '135px';
      this.cargaCatEstado(this.municipio.idPais);
      this.frmMunicipio.patchValue({
        idPais: this.municipio.idPais,
        idEstado: this.municipio.idEstado,
        municipio: this.municipio.municipio
      })
    }
    else {
      this.cargaCatEstado(0);
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


  async guardar_editarMunicipio() {
    this.mostrarLoading = true;

    if (this.municipio == null) {
      // GUARDAR

      const dicDatos: Record<string, any> = {
        ["idPais"]: this.frmMunicipio.value.idPais,
        ["descrip"]: this.frmMunicipio.value.municipio,
        ["idEstado"]: this.frmMunicipio.value.idEstado
      };

      this._municipioServicio.guardar(dicDatos).subscribe({
        next: async (data) => {
          if (data.status) {
            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Ciudad/Municipio registrado', life: 3000 });
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
        ["idMunicipio"]: this.municipio.idMunicipio,
        ["oldDescrip"]: this.municipio.municipio,
        ["newDescrip"]: this.frmMunicipio.value.municipio,
        ["idEstado"]: this.frmMunicipio.value.idEstado,
        ["idPais"]: this.frmMunicipio.value.idPais
      };

      this._municipioServicio.actualizar(dicDatos).subscribe({
        next: async (data) => {
          if (data.status) {
            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Ciudad/Municipio actualizado', life: 3000 });
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
