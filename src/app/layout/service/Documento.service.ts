import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class DocumentoService {
    private urlApi: string = environment.endpoint + 'Documento/';

    constructor(private http: HttpClient) {}

    listaCatDocumento(): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatDocumento`);
    }

    listaCatDocumentoByClienteTipoServicioDocumento(pIdCliente: number, pIdTipoServicio: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatDocumentoByClienteTipoServicioDocumento/${pIdCliente}/${pIdTipoServicio}`);
    }

    // DOCUMENTACION SEGUIMIENTO

    listaConsultaDocumentoEmbarque(pIdEmbarque: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaConsultaDocumentoEmbarque/${pIdEmbarque}`);
    }

    listaCatDocumentoEmbarque(pIdEmbarque: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatDocumentoEmbarque/${pIdEmbarque}`);
    }

    
}
