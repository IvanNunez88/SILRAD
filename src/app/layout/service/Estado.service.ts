import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private urlApi: string = environment.endpoint + "Estado/";

  constructor(private http: HttpClient) { }

  guardar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
    return this.http.request<iResponseApi>("post", `${this.urlApi}Guardar`,
      {
        body: {
          idEstado: 0,
          descrip: pDicDatos["descrip"],
          siglas: pDicDatos["siglas"],
          idPais: pDicDatos["idPais"]
        }
      }
    );
  }

  actualizar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
    return this.http.request<iResponseApi>("put", `${this.urlApi}Actualizar`,
      {
        body: {
          idEstado: pDicDatos["idEstado"],
          oldDescrip: pDicDatos["oldDescrip"],
          newDescrip: pDicDatos["newDescrip"],
          siglas: pDicDatos["siglas"],
          idPais: pDicDatos["idPais"]
        }
      }
    );
  }


  listaEstado(pIdPais: number): Observable<iResponseApi> {
    return this.http.get<iResponseApi>(`${this.urlApi}ListaEstado/${pIdPais}`)
  }

  listaCatEstadoByPais(pIdPais: number): Observable<iResponseApi> {
    return this.http.get<iResponseApi>(`${this.urlApi}ListaCatEstadoByPais/${pIdPais}`)
  }

}
