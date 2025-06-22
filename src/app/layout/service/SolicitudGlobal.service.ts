import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class SolicitudGlobalService {
    private urlApi: string = environment.endpoint + 'SolicitudGlobal/';

    constructor(private http: HttpClient) {}

    guardar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}Guardar`, {
            body: {
                idSolicitudGlobal: 0,
                idCliente: pDicDatos['idCliente'],
                idUsuario: pDicDatos['idUsuario'],
                idClasificacion: pDicDatos['idClasificacion'],
                idTipoServicio: pDicDatos['idTipoServicio'],
                idModalidad: pDicDatos['idModalidad'],
                idOrigen: pDicDatos['idOrigen'],
                idDestino: pDicDatos['idDestino'],
                contacto: pDicDatos['contacto'],
                correo: pDicDatos['correo']
            }
        });
    }

    actualizar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('put', `${this.urlApi}Actualizar`, {
            body: {
                idSolicitudGlobal: pDicDatos['idSolicitudGlobal'],
                idCliente: pDicDatos['idCliente'],
                idUsuario: 0,
                idClasificacion: pDicDatos['idClasificacion'],
                idTipoServicio: pDicDatos['idTipoServicio'],
                idModalidad: pDicDatos['idModalidad'],
                idOrigen: pDicDatos['idOrigen'],
                idDestino: pDicDatos['idDestino'],
                contacto: pDicDatos['contacto'],
                correo: pDicDatos['correo']
            }
        });
    }
}
