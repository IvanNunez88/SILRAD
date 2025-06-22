import { Routes } from '@angular/router';
import { ClienteComponent } from './Cliente/Cliente.component';
import { EmpresaComponent } from './Empresa/Empresa.component';
import { ProveedorComponent } from './Proveedor/Proveedor.component';
import { PaisComponent } from './Pais/Pais.component';
import { EstadoComponent } from './Estado/Estado.component';
import { MunicipioComponent } from './Municipio/Municipio.component';
import { SolicitudComponent } from './Solicitud/Solicitud.component';
import { RutaComponent } from './Ruta/Ruta.component';
import { SeguimientoEmbarqueComponent } from './SeguimientoEmbarque/SeguimientoEmbarque.component';
import { UsuarioComponent } from './Usuario/Usuario.component';
import { RolComponent } from './Rol/Rol.component';
import { ReporteSeguimientoEmbarqueComponent } from './ReporteSeguimientoEmbarque/ReporteSeguimientoEmbarque.component';

export default [
    { path: 'Cliente', data: { breadcrumb: 'Cliente' }, component: ClienteComponent },
    { path: 'Empresa', data: { breadcrumb: 'Empresa' }, component: EmpresaComponent },
    { path: 'Proveedor', data: { breadcrumb: 'Proveedor' }, component: ProveedorComponent },
    { path: 'Pais', data: { breadcrumb: 'País' }, component: PaisComponent },
    { path: 'Estado', data: { breadcrumb: 'Estado' }, component: EstadoComponent },
    { path: 'Municipio', data: { breadcrumb: 'Ciudad/Municipio' }, component: MunicipioComponent },
    { path: 'Solicitud', data: { breadcrumb: 'Solicitud' }, component: SolicitudComponent },
    { path: 'Ruta', data: { breadcrumb: 'Ruta' }, component: RutaComponent },
    { path: 'SeguimientoEmbarque', data: { breadcrumb: 'Seguimiento Embarque' }, component: SeguimientoEmbarqueComponent },
    { path: 'Usuario', data: { breadcrumb: 'Usuario' }, component: UsuarioComponent },
    { path: 'Rol', data: { breadcrumb: 'Rol' }, component: RolComponent },
    { path: 'ReporteSeguimientoEmbarque', data: { breadcrumb: 'Rol' }, component: ReporteSeguimientoEmbarqueComponent },

    //
    { path: 'button', data: { breadcrumb: 'Button' }, loadComponent: () => import('./buttondemo').then((c) => c.ButtonDemo) },
    { path: 'charts', data: { breadcrumb: 'Charts' }, loadComponent: () => import('./chartdemo').then((c) => c.ChartDemo) },
    { path: 'file', data: { breadcrumb: 'File' }, loadComponent: () => import('./filedemo').then((c) => c.FileDemo) },
    { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, loadComponent: () => import('./formlayoutdemo').then((c) => c.FormLayoutDemo) },
    { path: 'input', data: { breadcrumb: 'Input' }, loadComponent: () => import('./inputdemo').then((c) => c.InputDemo) },
    { path: 'list', data: { breadcrumb: 'List' }, loadComponent: () => import('./listdemo').then((c) => c.ListDemo) },
    { path: 'misc', data: { breadcrumb: 'Misc' }, loadComponent: () => import('./miscdemo').then((c) => c.MiscDemo) },
    { path: 'panel', data: { breadcrumb: 'Panel' }, loadComponent: () => import('./panelsdemo').then((c) => c.PanelsDemo) },
    { path: 'timeline', data: { breadcrumb: 'Timeline' }, loadComponent: () => import('./timelinedemo').then((c) => c.TimelineDemo) },
    // { path: 'table', data: { breadcrumb: 'Table' }, loadComponent: () => import('./tabledemo').then((c) => c.TableDemo) },
    { path: 'overlay', data: { breadcrumb: 'Overlay' }, loadComponent: () => import('./overlaydemo').then((c) => c.OverlayDemo) },
    { path: 'tree', data: { breadcrumb: 'Tree' }, loadComponent: () => import('./treedemo').then((c) => c.TreeDemo) },

    { path: '**', redirectTo: '/notfound' }
] as Routes;
