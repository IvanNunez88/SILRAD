import { SharedModule } from '@/shared/shared.module';
import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaisService } from '@/layout/service/Pais.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ModalPais',
  templateUrl: './ModalPais.component.html',
  styleUrls: ['./ModalPais.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class ModalPaisComponent implements OnInit {

  boton: string = "Guardar";
  marginLeft: string = '175px';
  mostrarLoading: boolean = false;
  frmPais: FormGroup;
  pais: any;

  constructor(
    private ref: DynamicDialogRef,
    private _paisServicio: PaisService,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private messageService: MessageService,
  ) {
    this.frmPais = this.fb.group({
      pais: ["", Validators.required],
      siglas: ["", Validators.required],
    })

    if (this.config.data != null) {
      this.pais = this.config.data;
      this.boton = "Actualizar"
      this.marginLeft = '165px';
      this.frmPais.patchValue({
        pais: this.pais.pais,
        siglas: this.pais.siglas
      })

    }

  }

  async ngOnInit(): Promise<void> { }

  async guardar_editarPais() {
    this.mostrarLoading = true;

    if (this.pais == null) {
      // GUARDAR

      const dicDatos: Record<string, any> = {
        ["pais"]: this.frmPais.value.pais,
        ["siglas"]: this.frmPais.value.siglas,
      }

      this._paisServicio.guardar(dicDatos).subscribe({
        next: async (data) => {
          if (data.status) {
            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Empresa registrada', life: 3000 });
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
        ["idPais"]: this.pais.idPais,
        ["oldDescrip"]: this.pais.pais,
        ["newDescrip"]: this.frmPais.value.pais,
        ["siglas"]: this.frmPais.value.siglas
      }

      this._paisServicio.actualizar(dicDatos).subscribe({
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