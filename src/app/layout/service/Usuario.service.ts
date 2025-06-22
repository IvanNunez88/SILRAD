import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iResponseApi } from '@/Interfaces/iResponseApi';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private urlApi: string = environment.endpoint + 'Usuario/';

    constructor(private http: HttpClient) {}

    guardar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}Guardar`, {
            body: {
                idUsuario: 0,
                nombre: pDicDatos['nombre'],
                aPaterno: pDicDatos['aPaterno'],
                aMaterno: pDicDatos['aMaterno'],
                usuario: pDicDatos['usuario'],
                contraseña: pDicDatos['contraseña'],
                idRol: pDicDatos['idRol']
            }
        });
    }

    actualizar(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('put', `${this.urlApi}Actualizar`, {
            body: {
                idUsuario: pDicDatos['idUsuario'],
                nombre: pDicDatos['nombre'],
                aPaterno: pDicDatos['aPaterno'],
                aMaterno: pDicDatos['aMaterno'],
                oldDescrip: pDicDatos['oldDescrip'],
                newDescrip: pDicDatos['newDescrip'],
                contraseña: pDicDatos['contraseña'],
                idRol: pDicDatos['idRol'],
                isActivo: pDicDatos['isActivo']
            }
        });
    }

    signIn(pDicDatos: Record<string, any>): Observable<iResponseApi> {
        return this.http.request<iResponseApi>('post', `${this.urlApi}SignIn`, {
            body: {
                usuario: pDicDatos['usuario'],
                contraseña: pDicDatos['password']
            }
        });
    }

    listaUsuario(): Observable<iResponseApi> {
        return this.http.get<iResponseApi>(`${this.urlApi}ListaUsuario`);
    }
}
