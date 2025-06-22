import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private urlApi: string = environment.endpoint + "Pais/";

  constructor(private http: HttpClient) { }


  guardar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
    return this.http.request<iResponseApi>("post", `${this.urlApi}Guardar`,
      {
        body: {
          idPais: 0,
          pais: pDicDatos["pais"],
          siglas: pDicDatos["siglas"]
        }
      }
    );
  }

  actualizar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
    return this.http.request<iResponseApi>("put", `${this.urlApi}Actualizar`,
      {
        body: {
          idPais: pDicDatos["idPais"],
          oldDescrip: pDicDatos["oldDescrip"],
          newDescrip: pDicDatos["newDescrip"],
          siglas: pDicDatos["siglas"]
        }
      }
    );
  }


  listaCatPais(): Observable<iResponseApi> {
    return this.http.get<iResponseApi>(`${this.urlApi}ListaCatPais`)
  }

  listaPais(): Observable<iResponseApi> {
    return this.http.get<iResponseApi>(`${this.urlApi}ListaPais`)
  }




}
