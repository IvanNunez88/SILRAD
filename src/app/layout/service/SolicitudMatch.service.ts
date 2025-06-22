import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class SolicitudMatchService {
    private urlApi: string = environment.endpoint + 'SolicitudMatch/';

    constructor(private http: HttpClient) {}

    guardar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}Guardar`, {
            body: {
                idSolicitud: pDicDatos['idSolicitud'],
                idRuta: pDicDatos['idRuta'],
                tarifa: pDicDatos['tarifa']
            }
        });
    }

    borrarMatch(pIdSolicitud: number, pIdRuta: number): Observable<iResponseApi> {
        return this.http.delete<iResponseApi>(`${this.urlApi}BorrarMatch/${pIdSolicitud}/${pIdRuta}`);
    }

    listaMatch(pIdSolicitud: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaMatch/${pIdSolicitud}`);
    }
}
