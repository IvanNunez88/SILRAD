import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private urlApi: string = environment.endpoint + 'Cliente/';

    constructor(private http: HttpClient) {}

    guardar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}Guardar`, {
            body: {
                idUsuario: pDicDatos['idUsuario'],
                descrip: pDicDatos['descrip'],
                rfc: pDicDatos['rfc'],
                idPais: pDicDatos['idPais'],
                estado: pDicDatos['estado'],
                municipio: pDicDatos['municipio'],
                calleDir: pDicDatos['calleDir'],
                colDir: pDicDatos['colDir'],
                cp: pDicDatos['cp'],
                diasCredito: pDicDatos['diasCredito']
            }
        });
    }

    actualizar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('put', `${this.urlApi}Actualizar`, {
            body: {
                idCliente: pDicDatos['idCliente'],
                idUsuario: pDicDatos['idUsuario'],
                oldDescrip: pDicDatos['oldDescrip'],
                newDescrip: pDicDatos['newDescrip'],
                rfc: pDicDatos['rfc'],
                idPais: pDicDatos['idPais'],
                estado: pDicDatos['estado'],
                municipio: pDicDatos['municipio'],
                calleDir: pDicDatos['calleDir'],
                colDir: pDicDatos['colDir'],
                cp: pDicDatos['cp'],
                diasCredito: pDicDatos['diasCredito'],
                isActivo: pDicDatos['isActivo']
            }
        });
    }

    listaCliente(): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCliente`);
    }

    listaCatCliente(): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatCliente`);
    }

    listaCatClienteByUsuario(pIdUsuario: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatClienteByUsuario/${pIdUsuario}`);
    }

    // CLIENTE_MONEDA

    listaConsulClienteMoneda(pIdCliente: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaConsulClienteMoneda/${pIdCliente}`);
    }

    guardarMoneda(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}GuardarMoneda`, {
            body: {
                idCliente: pDicDatos['idCliente'],
                idMoneda: pDicDatos['idMoneda']
            }
        });
    }

    borrarMoneda(pIdCliente: number, pIdMoneda: number): Observable<iResponseApi> {
        return this.http.delete<iResponseApi>(`${this.urlApi}BorrarMoneda/${pIdCliente}/${pIdMoneda}`);
    }

    // CLIENTE_EMPRESA

    listaConsulClienteEmpresa(pIdCliente: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaConsulClienteEmpresa/${pIdCliente}`);
    }

    guardarEmpresa(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}GuardarEmpresa`, {
            body: {
                idCliente: pDicDatos['idCliente'],
                idEmpresa: pDicDatos['idEmpresa']
            }
        });
    }

    borrarEmpresa(pIdCliente: number, pIdEmpresa: number): Observable<iResponseApi> {
        return this.http.delete<iResponseApi>(`${this.urlApi}BorrarEmpresa/${pIdCliente}/${pIdEmpresa}`);
    }

    //CLIENTE_DOCUMENTO

    listaConsulClienteDocumento(pIdCliente: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaConsulClienteDocumento/${pIdCliente}`);
    }

    guardarDocumento(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}GuardarDocumento`, {
            body: {
                idCliente: pDicDatos['idCliente'],
                idTipoServicio: pDicDatos['idTipoServicio'],
                idDocumento: pDicDatos['idDocumento']
            }
        });
    }

    borrarDocumento(pIdCliente: number, pIdTipoServicio: number, pIdDocumento: number): Observable<iResponseApi> {
        return this.http.delete<iResponseApi>(`${this.urlApi}BorrarDocumento/${pIdCliente}/${pIdTipoServicio}/${pIdDocumento}`);
    }

    //CLIENTE_DIRECCION

    guardarDireccion(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}GuardarDireccion`, {
            body: {
                idSolicitud: pDicDatos['idSolicitud'],
                isOrigen: pDicDatos['isOrigen'],
                calle: pDicDatos['calle'],
                colonia: pDicDatos['colonia'],
                idMunicipio: pDicDatos['idMunicipio'],
                cp: pDicDatos['cp'],
                contacto: pDicDatos['contacto'],
                almacen: pDicDatos['almacen']
            }
        });
    }

    actualizarDireccion(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('put', `${this.urlApi}ActualizarDireccion`, {
            body: {
                idSolicitud: pDicDatos['idSolicitud'],
                isOrigen: pDicDatos['isOrigen'],
                calle: pDicDatos['calle'],
                colonia: pDicDatos['colonia'],
                idMunicipio: pDicDatos['idMunicipio'],
                cp: pDicDatos['cp'],
                contacto: pDicDatos['contacto'],
                almacen: pDicDatos['almacen']
            }
        });
    }

    borrarDireccion(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('delete', `${this.urlApi}BorrarDireccion`, {
            body: {
                idSolicitud: pDicDatos['idSolicitud'],
                isOrigen: pDicDatos['isOrigen'],
                almacen: pDicDatos['almacen']
            }
        });
    }

    listaConsulClienteDireccion(pIdCliente: number, pIsOrigen: boolean): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaConsulClienteDireccion/${pIdCliente}/${pIsOrigen}`);
    }
}
