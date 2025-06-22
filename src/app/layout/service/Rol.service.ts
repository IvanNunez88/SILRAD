import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class RolService {
    private urlApi: string = environment.endpoint + 'Rol/';

    constructor(private http: HttpClient) {}

    guardar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}Guardar`, {
            body: {
                idRol: 0,
                descrip: pDicDatos['descrip']
            }
        });
    }

    actualizar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('put', `${this.urlApi}Actualizar`, {
            body: {
                idRol: pDicDatos['idRol'],
                oldDescrip: pDicDatos['oldDescrip'],
                newDescrip: pDicDatos['newDescrip'],
                isActivo: pDicDatos['isActivo']
            }
        });
    }

    listaCatRol(): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaCatRol`);
    }

    listaRol(): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaRol`);
    }

    //ROL_PANTALLA
    listaRolPantalla(pIdRol: number): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaRolPantalla/${pIdRol}`);
    }

    guardarRolPantalla(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}GuardarRolPantalla`, {
            body: {
                idRol: pDicDatos['idRol'],
                idPantalla: pDicDatos['idPantalla']
            }
        });
    }

    borrarRolPantalla(pIdRol: number, pIdPantalla: number): Observable<iResponseApi> {
        return this.http.delete<iResponseApi>(`${this.urlApi}BorrarRolPantalla/${pIdRol}/${pIdPantalla}`);
    }
}
