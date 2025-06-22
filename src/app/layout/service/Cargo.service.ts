import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class CargoService {
    private urlApi: string = environment.endpoint + 'Cargo/';

    constructor(private http: HttpClient) {}

    listaCatCargo(): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatCargo`);
    }

    listaCatCargoByCargoEmbarque(pIdEmbarque: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatCargoByCargoEmbarque/${pIdEmbarque}`);
    }

    listaCatCargoBySolicitudRuta(pIdSolicitud: number, pIdRuta: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatCargoBySolicitudRuta/${pIdSolicitud}/${pIdRuta}`);
    }
}
