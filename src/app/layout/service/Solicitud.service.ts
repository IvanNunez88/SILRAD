import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class SolicitudService {
    private urlApi: string = environment.endpoint + 'Solicitud/';

    constructor(private http: HttpClient) {}

    guardar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}Guardar`, {
            body: {
                idSolicitud: 0,
                idUsuario: pDicDatos['idUsuario'],
                idEmpresa: pDicDatos['idEmpresa'],
                idCliente: pDicDatos['idCliente'],
                idTipoUnidad: pDicDatos['idTipoUnidad'],
                idTipoServicio: pDicDatos['idTipoServicio'],
                idOrigen: pDicDatos['idOrigen'],
                idDestino: pDicDatos['idDestino'],
                fecEfectiva: pDicDatos['FecEfectiva'],
                idMoneda: pDicDatos['idMoneda'],
                venta: pDicDatos['venta'],
                cantidad: pDicDatos['cantidad'],
                isTrasbordo: pDicDatos['isTrasbordo'],
                isCruce: pDicDatos['isCruce'],
                tipoMercancia: pDicDatos['tipoMercancia'],
                observaciones: pDicDatos['observaciones'],
                idClasificacion: pDicDatos['idClasificacion'],
                isRedondo: pDicDatos['isRedondo']
            }
        });
    }

    actualizar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('put', `${this.urlApi}Actualizar`, {
            body: {
                idSolicitud: pDicDatos['idSolicitud'],
                idUsuario: pDicDatos['idUsuario'],
                idEmpresa: pDicDatos['idEmpresa'],
                idCliente: pDicDatos['idCliente'],
                idTipoUnidad: pDicDatos['idTipoUnidad'],
                idTipoServicio: pDicDatos['idTipoServicio'],
                idOrigen: pDicDatos['idOrigen'],
                idDestino: pDicDatos['idDestino'],
                fecEfectiva: pDicDatos['FecEfectiva'],
                idMoneda: pDicDatos['idMoneda'],
                venta: pDicDatos['venta'],
                cantidad: pDicDatos['cantidad'],
                isTrasbordo: pDicDatos['isTrasbordo'],
                isCruce: pDicDatos['isCruce'],
                tipoMercancia: pDicDatos['tipoMercancia'],
                observaciones: pDicDatos['observaciones'],
                idClasificacion: pDicDatos['idClasificacion'],
                isRedondo: pDicDatos['isRedondo']
            }
        });
    }

    actualizarVenta(pIdEmbarque: number, pVenta: number): Observable<iResponseApi> {
        return this.http.put<iResponseApi>(`${this.urlApi}ActualizarVenta/${pIdEmbarque}/${pVenta}`, null);
    }

    actualizarFechaEfectiva(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.put<iResponseApi>(`${this.urlApi}ActualizarFechaEfectiva/${pDicDatos['idEmbarque']}/${pDicDatos['FecEfectiva']}`, null);
    }

    actualizarCliente(pIdEmbarque: number, pIdCliente: number): Observable<iResponseApi> {
        return this.http.put<iResponseApi>(`${this.urlApi}ActualizarCliente/${pIdEmbarque}/${pIdCliente}`, null);
    }

    actualizarNoUnidad(pIdEmbarque: number, pIdRuta: number, pNoUnidad: string): Observable<iResponseApi> {
        return this.http.put<iResponseApi>(`${this.urlApi}ActualizarNoUnidad/${pIdEmbarque}/${pNoUnidad}/${pIdRuta}`, null);
    }

    cancelar(pIdSolicitud: number): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('put', `${this.urlApi}Cancelar/${pIdSolicitud}`);
    }

    listaSolicitudByUsuario(pIdUsuario: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaSolicitudByUsuario/${pIdUsuario}`);
    }

    //SOLICITUD_MATCH_CARGO

    listaSolicitudCargos(pIdSolicitud: number, pIdRuta: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaSolicitudCargos/${pIdSolicitud}/${pIdRuta}`);
    }

    guardarCargo(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}GuardarCargo`, {
            body: {
                idSolicitud: pDicDatos['idSolicitud'],
                idUsuario: pDicDatos['idUsuario'],
                idRuta: pDicDatos['idRuta'],
                idCargo: pDicDatos['idCargo'],
                monto: pDicDatos['monto']
            }
        });
    }

    borrarCargo(pIdSolicitud: number, pIdRuta: number, pIdCargo: number): Observable<iResponseApi> {
        return this.http.delete<iResponseApi>(`${this.urlApi}BorrarCargo/${pIdSolicitud}/${pIdRuta}/${pIdCargo}`);
    }
}
