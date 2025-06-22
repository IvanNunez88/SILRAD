import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    private urlApi: string = environment.endpoint + 'Empresa/';

    constructor(private http: HttpClient) {}

    guardar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}Guardar`, {
            body: {
                descrip: pDicDatos['descrip'],
                direc: pDicDatos['direc'],
                rfc: pDicDatos['rfc'],
                datosFacturacion: pDicDatos['datosFacturacion']
            }
        });
    }

    actualizar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('put', `${this.urlApi}Actualizar`, {
            body: {
                idEmpresa: pDicDatos['idEmpresa'],
                oldDescrip: pDicDatos['oldDescrip'],
                newDescrip: pDicDatos['newDescrip'],
                direc: pDicDatos['direc'],
                rfc: pDicDatos['rfc'],
                datosFacturacion: pDicDatos['datosFacturacion'],
                isActivo: pDicDatos['isActivo']
            }
        });
    }

    listaEmpresa(): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaEmpresa`);
    }

    listaCatEmpresa(): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatEmpresa`);
    }

    listaCatEmpresaByCliente(pIdCliente: number, pOpcion: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatEmpresaByCliente/${pIdCliente}/${pOpcion}`);
    }
}
