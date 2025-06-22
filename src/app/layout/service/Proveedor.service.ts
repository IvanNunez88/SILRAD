import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private urlApi: string = environment.endpoint + "Proveedor/";

  constructor(private http: HttpClient) { }

  guardar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
    return this.http.request<iResponseApi>("post", `${this.urlApi}Guardar`,
      {
        body: {
          idUsuario: pDicDatos["idUsuario"],
          descrip: pDicDatos["descrip"],
          rfc: pDicDatos["rfc"],
          idPais: pDicDatos["idPais"],
          estado: pDicDatos["estado"],
          municipio: pDicDatos["municipio"],
          calle: pDicDatos["calle"],
          colonia: pDicDatos["colonia"],
          cp: pDicDatos["cp"],
          diasCredito: pDicDatos["diasCredito"]
        }
      }
    );
  }

  actualizar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
    return this.http.request<iResponseApi>("put", `${this.urlApi}Actualizar`,
      {
        body: {
          idProveedor: pDicDatos["idProveedor"],
          oldDescrip: pDicDatos["oldDescrip"],
          newDescrip: pDicDatos["newDescrip"],
          rfc: pDicDatos["rfc"],
          idPais: pDicDatos["idPais"],
          estado: pDicDatos["estado"],
          municipio: pDicDatos["municipio"],
          calle: pDicDatos["calle"],
          colonia: pDicDatos["colonia"],
          cp: pDicDatos["cp"],
          diasCredito: pDicDatos["diasCredito"],
          isActivo: pDicDatos["isActivo"]
        }
      }
    );
  }

  listarProveedor(): Observable<iResponseApi> {
    return this.http.get<iResponseApi>(`${this.urlApi}ListarProveedor`)
  }

  listarCatProveedor(): Observable<iResponseApi> {
    return this.http.get<iResponseApi>(`${this.urlApi}ListarCatProveedor`)
  }


  // PROVEEDOR_MONEDA

  listaConsulProveedoMoneda(pIdCliente: number): Observable<iResponseApi> {
    return this.http.get<iResponseApi>(`${this.urlApi}ListaConsulProveedoMoneda/${pIdCliente}`)
  }

  guardarMoneda(pDicDatos: Record<string, any>): Observable<iResponseApi> {
    return this.http.request<iResponseApi>("post", `${this.urlApi}GuardarMoneda`,
      {
        body: {
          idProveedor: pDicDatos["idProveedor"],
          idMoneda: pDicDatos["idMoneda"]
        }
      }
    );
  }

  borrarMoneda(pIdProveedor: number, pIdMoneda: number): Observable<iResponseApi> {
    return this.http.delete<iResponseApi>(`${this.urlApi}BorrarMoneda/${pIdProveedor}/${pIdMoneda}`)
  }

}
