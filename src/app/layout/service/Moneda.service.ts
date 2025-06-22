import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class MonedaService {
    private urlApi: string = environment.endpoint + 'Moneda/';

    constructor(private http: HttpClient) {}

    listaCatMoneda(): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatMoneda`);
    }

    listaCatMonedaByIdCliente(pIdCliente: number, pOpc: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatMonedaByIdCliente/${pIdCliente}/${pOpc}`);
    }

    listaCatMonedaByIdProveedor(pIdProveedor: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatMonedaByIdProveedor/${pIdProveedor}`);
    }

    ListaCatMonedaRutaByIdProveedor(pIdProveedor: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatMonedaRutaByIdProveedor/${pIdProveedor}`);
    }
}
