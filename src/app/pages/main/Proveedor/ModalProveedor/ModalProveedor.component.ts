import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { iCatPais } from '@/Interfaces/iCatPais';
import { PaisService } from '@/layout/service/Pais.service';
import { ProveedorService } from '@/layout/service/Proveedor.service';
import { UtilidadService } from '@/layout/service/Utilidad.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ModalProveedor',
  templateUrl: './ModalProveedor.component.html',
  styleUrls: ['./ModalProveedor.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class ModalProveedorComponent implements OnInit {

  boton: string = "Guardar";
  marginLeft: string = '565px';
  mostrarLoading: boolean = false;
  mostrarSwitch: boolean = false;
  frmProveedor: FormGroup;
  listaCatPais: iCatPais[] = [];
  proveedor: any;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private _proveedorServicio: ProveedorService,
    private _utilidadServicio: UtilidadService,
    private _paisServicio: PaisService,
    private messageService: MessageService,
  ) {

    this.frmProveedor = this.fb.group({
      proveedor: ["", Validators.required],
      rfc: ["", Validators.required],
      idPais: [0, Validators.required],
      estado: ["", Validators.required],
      municipio: ["", Validators.required],
      calle: ["", Validators.required],
      colonia: ["", Validators.required],
      cp: ["", Validators.required],
      dCredito: [0, Validators.required],
      isEstatus: []
    })

    if (this.config.data != null) {
      this.proveedor = this.config.data;
      this.mostrarSwitch = true;
      this.boton = "Actualizar"
      this.marginLeft = '554px';


      this.frmProveedor.patchValue({
        proveedor: this.proveedor.proveedor,
        rfc: this.proveedor.rfc,
        dCredito: this.proveedor.diasCredito,
        idPais: this.proveedor.idPais,
        estado: this.proveedor.estado,
        municipio: this.proveedor.municipio,
        calle: this.proveedor.calle,
        colonia: this.proveedor.colonia,
        cp: this.proveedor.cp,
        isEstatus: this.proveedor.isActivo
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

  async guardar_editarProveedor() {
    this.mostrarLoading = true;

    const usuario: any = await this._utilidadServicio.obtenerSesionUsuario();

    if (this.proveedor == null) {
      // GUARDAR

      const dicDatos: Record<string, any> = {
        ["idUsuario"]: usuario[0].idUsuario,
        ["descrip"]: this.frmProveedor.value.proveedor,
        ["rfc"]: this.frmProveedor.value.rfc,
        ["idPais"]: this.frmProveedor.value.idPais,
        ["estado"]: this.frmProveedor.value.estado,
        ["municipio"]: this.frmProveedor.value.municipio,
        ["calle"]: this.frmProveedor.value.calle,
        ["colonia"]: this.frmProveedor.value.colonia,
        ["cp"]: this.frmProveedor.value.cp,
        ["diasCredito"]: this.frmProveedor.value.dCredito
      };

      this._proveedorServicio.guardar(dicDatos).subscribe({
        next: async (data) => {
          if (data.status) {
            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'proveedor registrado', life: 3000 });
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
        ["idProveedor"]: this.proveedor.idProveedor,
        ["oldDescrip"]: this.proveedor.proveedor,
        ["newDescrip"]: this.frmProveedor.value.proveedor,
        ["rfc"]: this.frmProveedor.value.rfc,
        ["idPais"]: this.frmProveedor.value.idPais,
        ["estado"]: this.frmProveedor.value.estado,
        ["municipio"]: this.frmProveedor.value.municipio,
        ["calle"]: this.frmProveedor.value.calle,
        ["colonia"]: this.frmProveedor.value.colonia,
        ["cp"]: this.frmProveedor.value.cp,
        ["diasCredito"]: this.frmProveedor.value.dCredito,
        ["isActivo"]: this.frmProveedor.value.isEstatus
      }

      this._proveedorServicio.actualizar(dicDatos).subscribe({
        next: async (data) => {
          if (data.status) {
            this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Proveedor actualizado', life: 3000 });
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
