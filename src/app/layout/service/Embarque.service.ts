import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class EmbarqueService {
    private urlApi: string = environment.endpoint + 'Embarque/';

    constructor(private http: HttpClient) {}

    guardar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}Guardar`, {
            body: {
                idEmbarque: 0,
                idSolicitud: pDicDatos['idSolicitud'],
                notaImportante: 'string',
                observacionesPrimaria: 'string',
                observacionesBrokerSecundaria: 'string',
                agenteAduanal: 'string',
                datosFacturacion: 'string',
                idEstatusEmbarque: 0
            }
        });
    }

    actualizarDatosFacturacion(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('put', `${this.urlApi}ActualizarDatosFacturacion`, {
            body: {
                idEmbarque: pDicDatos['idEmbarque'],
                datosFacturacion: pDicDatos['datosFacturacion']
            }
        });
    }

    actualizarObservaciones(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('put', `${this.urlApi}ActualizarObservaciones`, {
            body: {
                idEmbarque: pDicDatos['idEmbarque '],
                observaciones: pDicDatos['observaciones'],
                agenteAduanal: pDicDatos['agenteAduanal']
            }
        });
    }

    listaEmbarques(pIdUsuario: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaEmbarques/${pIdUsuario}`);
    }

    listaEmbarqueDetalle(pIdEmbarque: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaEmbarqueDetalle/${pIdEmbarque}`);
    }

    listaEmbarqueProveedorRuta(pIdEmbarque: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaEmbarqueProveedorRuta/${pIdEmbarque}`);
    }

    //EMBARQUE_VENTA

    listaConsulEmbarqueVenta(pIdEmbarque: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaConsulEmbarqueVenta/${pIdEmbarque}`);
    }

    guardarVenta(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}GuardarVenta`, {
            body: {
                idEmbarque: pDicDatos['idEmbarque'],
                idUsuario: pDicDatos['idUsuario'],
                idCargo: pDicDatos['idCargo'],
                monto: pDicDatos['monto']
            }
        });
    }

    borrarVenta(pIdEmbarque: number, pIdCargo: number): Observable<iResponseApi> {
        return this.http.delete<iResponseApi>(`${this.urlApi}BorrarVenta/${pIdEmbarque}/${pIdCargo}`);
    }

    //EMBARQUE_BITACORA

    listaConsulEmbarqueBitacora(pIdEmbarque: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaConsulEmbarqueBitacora/${pIdEmbarque}`);
    }

    guardarEstatus(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}GuardarEstatus`, {
            body: {
                idEmbarque: pDicDatos['idEmbarque'],
                idEstatusEmbarque: pDicDatos['idEstatusEmbarque'],
                idUsuario: pDicDatos['idUsuario'],
                comentario: pDicDatos['comentario']
            }
        });
    }

    //EMBARQUE_SEGUIMIENTO

    listaConsulEmbarqueSeguimiento(pIdEmbarque: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaConsulEmbarqueSeguimiento/${pIdEmbarque}`);
    }

    guardarSeguimiento(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}GuardarSeguimiento`, {
            body: {
                idEmbarque: pDicDatos['idEmbarque'],
                idUsuario: pDicDatos['idUsuario'],
                comentario: pDicDatos['comentario']
            }
        });
    }

    //EMBARQUE_DOCUMENTO
    guardarEmbarqueDocumento(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}GuardarEmbarqueDocumento`, {
            body: {
                idEmbarque: pDicDatos['idEmbarque'],
                idDocumento: pDicDatos['idDocumento']
            }
        });
    }

    borrarEmbarqueDocumento(pIdEmbarque: number, pIdDocumento: number): Observable<iResponseApi> {
        return this.http.delete<iResponseApi>(`${this.urlApi}BorrarEmbarqueDocumento/${pIdEmbarque}/${pIdDocumento}`);
    }

    //EMBARQUE_DIRECCION

    guardarDireccion(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}GuardarDireccion`, {
            body: {
                idEmbarque: pDicDatos['idEmbarque'],
                isOrigen: pDicDatos['isOrigen'],
                idRuta: pDicDatos['idRuta'],
                almacen: pDicDatos['almacen'],
                calle: pDicDatos['calle'],
                colonia: pDicDatos['colonia'],
                cp: pDicDatos['cp'],
                idMunicipio: pDicDatos['idMunicipio'],
                contacto: pDicDatos['contacto'],
                fecEfectiva: pDicDatos['fecEfectiva'],
                hInicio: pDicDatos['hInicio'],
                hFinal: pDicDatos['hFinal']
            }
        });
    }

    listaConsultaEmbarqueDireccion(pIdEmbarque: number, pIdRuta: number, pOrigen: boolean): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaConsultaEmbarqueDireccion/${pIdEmbarque}/${pIdRuta}/${pOrigen}`);
    }

    borrarEmbarqueDireccion(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('delete', `${this.urlApi}BorrarEmbarqueDireccion`, {
            body: {
                idEmbarque: pDicDatos['idEmbarque'],
                idRuta: pDicDatos['idRuta'],
                isOrigen: pDicDatos['isOrigen'],
                almacen: pDicDatos['almacen']
            }
        });
    }
}
