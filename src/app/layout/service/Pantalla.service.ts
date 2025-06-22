import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class PantallaService {
    private urlApi: string = environment.endpoint + 'Pantalla/';

    constructor(private http: HttpClient) {}

    ListaPantallaByRol(pIdRol: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaPantallaByRol/${pIdRol}`);
    }

    ListaCatPantallaByRol(pIdRol: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatPantallaByRol/${pIdRol}`);
    }
}
