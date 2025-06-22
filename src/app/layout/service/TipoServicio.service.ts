import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class TipoServicioService {
    private urlApi: string = environment.endpoint + 'TipoServicio/';

    constructor(private http: HttpClient) {}

    listaCatTipoServicio(): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatTipoServicio`);
    }

    listaCatTipoServicioQuery(): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatTipoServicioGlobal`);
    }
}
