import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class TipoUnidadService {
    private urlApi: string = environment.endpoint + 'TipoUnidad/';

    constructor(private http: HttpClient) {}


    listaCatTipoUnidad(): Observable<iResponseApi> {
      return this.http.get<iResponseApi>(`${this.urlApi}ListaCatTipoUnidad`);
  }

}
