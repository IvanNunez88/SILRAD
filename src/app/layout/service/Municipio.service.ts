import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class MunicipioService {
    private urlApi: string = environment.endpoint + 'Municipio/';

    constructor(private http: HttpClient) {}

    guardar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}Guardar`, {
            body: {
                idMunicipio: 0,
                idPais: pDicDatos['idPais'],
                descrip: pDicDatos['descrip'],
                idEstado: pDicDatos['idEstado']
            }
        });
    }

    actualizar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('put', `${this.urlApi}Actualizar`, {
            body: {
                idMunicipio: pDicDatos['idMunicipio'],
                oldDescrip: pDicDatos['oldDescrip'],
                newDescrip: pDicDatos['newDescrip'],
                idEstado: pDicDatos['idEstado'],
                idPais: pDicDatos['idPais']
            }
        });
    }

    listaMunicipio(pIdPais: number, pIdestado: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaMunicipio/${pIdPais}/${pIdestado}`);
    }

    listaCatMunicipio(): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatMunicipio`);
    }
}
