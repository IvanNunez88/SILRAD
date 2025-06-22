import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class RutaService {
    private urlApi: string = environment.endpoint + 'Ruta/';

    constructor(private http: HttpClient) {}

    guardar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}Guardar`, {
            body: {
                idUsuario: pDicDatos['idUsuario'],
                idProveedor: pDicDatos['idProveedor'],
                idTipoUnidad: pDicDatos['idTipoUnidad'],
                idOrigen: pDicDatos['idOrigen'],
                idDestino: pDicDatos['idDestino'],
                idClasificacion: pDicDatos['idClasificacion'],
                idMoneda: pDicDatos['idMoneda'],
                tarifa: pDicDatos['tarifa'],
                comentario: pDicDatos['comentario']
            }
        });
    }

    actualizar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('put', `${this.urlApi}Actualizar`, {
            body: {
                idRuta: pDicDatos['idRuta'],
                idUsuario: pDicDatos['idUsuario'],
                IdProveedor: pDicDatos['IdProveedor'],
                newIdTipoUnidad: pDicDatos['newIdTipoUnidad'],
                oldIdTipoUnidad: pDicDatos['oldIdTipoUnidad'],
                newIdOrigen: pDicDatos['newIdOrigen'],
                oldIdOrigen: pDicDatos['oldIdOrigen'],
                newIdDestino: pDicDatos['newIdDestino'],
                oldIdDestino: pDicDatos['oldIdDestino'],
                newIdClasificacion: pDicDatos['newIdClasificacion'],
                oldIdClasificacion: pDicDatos['oldIdClasificacion'],
                newIdMoneda: pDicDatos['newIdMoneda'],
                oldIdMoneda: pDicDatos['oldIdMoneda'],
                tarifa: pDicDatos['tarifa'],
                comentario: pDicDatos['comentario'],
                isActivo: pDicDatos['isActivo']
            }
        });
    }

    ListaRuta(pIdProveedor: number, pIdOrigen: number, pIdDestino: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaRuta/${pIdProveedor}/${pIdOrigen}/${pIdDestino}`);
    }

    listaCatRutaProveedor(pIdTipoUnidad: number, pIdOrigen: number, pIdDestino: number, pIdClasificacion: number, pIdMoneda: number, pIdTipoServicio: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatRutaProveedor/${pIdTipoUnidad}/${pIdOrigen}/${pIdDestino}/${pIdClasificacion}/${pIdMoneda}/${pIdTipoServicio}`);
    }

    listaProveedorRuta(pIdProveedor: number, pIdTipoUnidad: number, pIdOrigen: number, pIdDestino: number, pIdClasificacion: number, pIdMoneda: number, pIdTipoServicio: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaProveedorRuta/${pIdProveedor}/${pIdTipoUnidad}/${pIdOrigen}/${pIdDestino}/${pIdClasificacion}/${pIdMoneda}/${pIdTipoServicio}`);
    }
}
