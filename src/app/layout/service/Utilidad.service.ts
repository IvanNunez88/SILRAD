import { Injectable } from '@angular/core';
import { iSesion } from '@/Interfaces/iSesion';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(
  ) { }

  async guardarSesionUsuario(SesionUsuario: iSesion) {
    sessionStorage.setItem("usuario", JSON.stringify(SesionUsuario));
  }

  async obtenerSesionUsuario(): Promise<iSesion> {
    const dataCadena = sessionStorage.getItem("usuario");
    const usuario = JSON.parse(dataCadena!)

    return usuario;
  }

  eliminarSesionUsuario() {
    sessionStorage.removeItem("usuario")
  }

}
