import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class EstatusEmbarqueService {
    private urlApi: string = environment.endpoint + 'EstatusEmbarque/';

    constructor(private http: HttpClient) {}

    listaCatEstatusEmbarque(): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatEstatusEmbarque`);
    }

    ListaCatEstatusEmbarqueByIdEmbarque(pIdEmbarque: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatEstatusEmbarqueByIdEmbarque/${pIdEmbarque}`);
    }
}
