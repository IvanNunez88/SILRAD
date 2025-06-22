import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenuitem } from './app.menuitem';
import { PantallaService } from '../service/Pantalla.service';
import { last } from 'rxjs';
import { UtilidadService } from '../service/Utilidad.service';

@Component({
    selector: '[app-menu]',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: any[] = [];

    constructor(
        private _pantallaServicio: PantallaService,
        private _utilidadServicio: UtilidadService
    ) {}

    async ngOnInit(): Promise<void> {
        await this.caraPantallas();
    }

    async caraPantallas() {
        const usuario: any = await this._utilidadServicio.obtenerSesionUsuario();

        this._pantallaServicio.ListaPantallaByRol(usuario[0].idRol).subscribe({
            next: async (data) => {
                if (data.status) {
                    const menu = [];

                    for (let i = 0; i < data.value.length; i++) {
                        menu.push(data.value[i]);

                        if (i < data.value.length - 1) {
                            menu.push({ separator: true });
                        }
                    }

                    this.model = menu;
                }
            }
        });
    }

    // { separator: true },

    // model: any[] = [
    //     // {
    //     //     label: 'Dashboards',
    //     //     icon: 'pi pi-home',
    //     //     items: [
    //     //         {
    //     //             label: 'E-Commerce',
    //     //             icon: 'pi pi-fw pi-warehouse',
    //     //             routerLink: ['/']
    //     //         },
    //     //         {
    //     //             label: 'Banking',
    //     //             icon: 'pi pi-fw pi-building-columns',
    //     //             routerLink: ['pages/dashboard-banking']
    //     //         },
    //     //         {
    //     //             label: 'Marketing',
    //     //             icon: 'pi pi-fw pi-gauge',
    //     //             routerLink: ['/dashboard-marketing']
    //     //         }
    //     //     ]
    //     // },
    //     // { separator: true },
    //     // {
    //     //     label: 'Apps',
    //     //     icon: 'pi pi-th-large',
    //     //     items: [
    //     //         {
    //     //             label: 'Blog',
    //     //             icon: 'pi pi-fw pi-comment',
    //     //             items: [
    //     //                 {
    //     //                     label: 'List',
    //     //                     icon: 'pi pi-fw pi-image',
    //     //                     routerLink: ['/apps/blog/list']
    //     //                 },
    //     //                 {
    //     //                     label: 'Detail',
    //     //                     icon: 'pi pi-fw pi-list',
    //     //                     routerLink: ['/apps/blog/detail']
    //     //                 },
    //     //                 {
    //     //                     label: 'Edit',
    //     //                     icon: 'pi pi-fw pi-pencil',
    //     //                     routerLink: ['/apps/blog/edit']
    //     //                 }
    //     //             ]
    //     //         },
    //     //         {
    //     //             label: 'Chat',
    //     //             icon: 'pi pi-fw pi-comments',
    //     //             routerLink: ['/apps/chat']
    //     //         },
    //     //         {
    //     //             label: 'Files',
    //     //             icon: 'pi pi-fw pi-folder',
    //     //             routerLink: ['/apps/files']
    //     //         },
    //     //         {
    //     //             label: 'Mail',
    //     //             icon: 'pi pi-fw pi-envelope',
    //     //             items: [
    //     //                 {
    //     //                     label: 'Inbox',
    //     //                     icon: 'pi pi-fw pi-inbox',
    //     //                     routerLink: ['/apps/mail/inbox']
    //     //                 },
    //     //                 {
    //     //                     label: 'Compose',
    //     //                     icon: 'pi pi-fw pi-pencil',
    //     //                     routerLink: ['/apps/mail/compose']
    //     //                 },
    //     //                 {
    //     //                     label: 'Detail',
    //     //                     icon: 'pi pi-fw pi-comment',
    //     //                     routerLink: ['/apps/mail/detail/1000']
    //     //                 }
    //     //             ]
    //     //         },
    //     //         {
    //     //             label: 'Task List',
    //     //             icon: 'pi pi-fw pi-check-square',
    //     //             routerLink: ['/apps/tasklist']
    //     //         }
    //     //     ]
    //     // },
    //     // { separator: true },
    //     {
    //         label: 'Home',
    //         icon: 'pi pi-fw pi-star-fill',
    //         items: [
    //             { label: 'Cliente', icon: 'pi pi-fw pi-book', routerLink: ['pages/Cliente'] },
    //             { label: 'Empresa', icon: 'pi pi-fw pi-building', routerLink: ['pages/Empresa'] },
    //             { label: 'Proveedor', icon: 'pi pi-fw pi-truck', routerLink: ['pages/Proveedor'] },
    //             { label: 'País', icon: 'pi pi-fw pi-flag', routerLink: ['pages/Pais'] },
    //             { label: 'Estado', icon: 'pi pi-fw pi-flag', routerLink: ['pages/Estado'] },
    //             { label: 'Municipio', icon: 'pi pi-fw pi-flag', routerLink: ['pages/Municipio'] },
    //             { label: 'Solicitud', icon: 'pi pi-fw pi-clipboard', routerLink: ['pages/Solicitud'] },
    //             { label: 'Ruta', icon: 'pi pi-fw pi-map-marker', routerLink: ['pages/Ruta'] },
    //             { label: 'Seguimiento Embarque', icon: 'pi pi-fw pi-truck', routerLink: ['pages/SeguimientoEmbarque'] },
    //             { label: 'Usuario', icon: 'pi pi-fw pi-user', routerLink: ['pages/Usuario'] },
    //             { label: 'Rol', icon: 'pi pi-fw pi-link', routerLink: ['pages/Rol'] },
    //             //
    //             { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['pages/formlayout'] },
    //             { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['pages/input'] },
    //             { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['pages/button'] },
    //             // { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['pages/table'] },
    //             { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['pages/list'] },
    //             { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['pages/tree'] },
    //             { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['pages/panel'] },
    //             { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['pages/overlay'] },
    //             { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['pages/file'] },
    //             { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['pages/charts'] },
    //             { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['pages/timeline'] },
    //             { label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['pages/misc'] }
    //         ]
    //     },

    //     { separator: true },
    //     {
    //         label: 'Pages',
    //         icon: 'pi pi-fw pi-briefcase',
    //         items: [
    //             { label: 'Landing', icon: 'pi pi-fw pi-globe', routerLink: ['/landing'] },
    //             {
    //                 label: 'Auth',
    //                 icon: 'pi pi-fw pi-user',
    //                 items: [
    //                     { label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/auth/login'] },
    //                     { label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/auth/error'] },
    //                     { label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/auth/access'] },
    //                     { label: 'Register', icon: 'pi pi-fw pi-user-plus', routerLink: ['/auth/register'] },
    //                     { label: 'Forgot Password', icon: 'pi pi-fw pi-question', routerLink: ['/auth/forgot-password'] },
    //                     { label: 'New Password', icon: 'pi pi-fw pi-cog', routerLink: ['/auth/new-password'] },
    //                     { label: 'Verification', icon: 'pi pi-fw pi-envelope', routerLink: ['/auth/verification'] },
    //                     { label: 'Lock Screen', icon: 'pi pi-fw pi-eye-slash', routerLink: ['/auth/lock-screen'] }
    //                 ]
    //             },

    //             { label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud'] },
    //             { label: 'Invoice', icon: 'pi pi-fw pi-dollar', routerLink: ['/pages/invoice'] },
    //             { label: 'Help', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help'] },
    //             { label: 'Oops', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/auth/oops'] },
    //             { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/pages/notfound'] },
    //             { label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty'] },
    //             { label: 'FAQ', icon: 'pi pi-fw pi-question', routerLink: ['/pages/faq'] },
    //             { label: 'Contact Us', icon: 'pi pi-fw pi-phone', routerLink: ['/landing/contact'] }
    //         ]
    //     },
    //     { separator: true },
    //     {
    //         label: 'E-Commerce',
    //         icon: 'pi pi-fw pi-wallet',
    //         items: [
    //             {
    //                 label: 'Product Overview',
    //                 icon: 'pi pi-fw pi-image',
    //                 routerLink: ['/ecommerce/product-overview']
    //             },
    //             {
    //                 label: 'Product List',
    //                 icon: 'pi pi-fw pi-list',
    //                 routerLink: ['/ecommerce/product-list']
    //             },
    //             {
    //                 label: 'New Product',
    //                 icon: 'pi pi-fw pi-plus',
    //                 routerLink: ['/ecommerce/new-product']
    //             },
    //             {
    //                 label: 'Shopping Cart',
    //                 icon: 'pi pi-fw pi-shopping-cart',
    //                 routerLink: ['/ecommerce/shopping-cart']
    //             },
    //             {
    //                 label: 'Checkout Form',
    //                 icon: 'pi pi-fw pi-check-square',
    //                 routerLink: ['/ecommerce/checkout-form']
    //             },
    //             {
    //                 label: 'Order History',
    //                 icon: 'pi pi-fw pi-history',
    //                 routerLink: ['/ecommerce/order-history']
    //             },
    //             {
    //                 label: 'Order Summary',
    //                 icon: 'pi pi-fw pi-file',
    //                 routerLink: ['/ecommerce/order-summary']
    //             }
    //         ]
    //     },
    //     { separator: true },
    //     {
    //         label: 'User Management',
    //         icon: 'pi pi-fw pi-user',
    //         items: [
    //             {
    //                 label: 'List',
    //                 icon: 'pi pi-fw pi-list',
    //                 routerLink: ['/profile/list']
    //             },
    //             {
    //                 label: 'Create',
    //                 icon: 'pi pi-fw pi-plus',
    //                 routerLink: ['/profile/create']
    //             }
    //         ]
    //     },
    //     { separator: true },
    //     {
    //         label: 'Hierarchy',
    //         icon: 'pi pi-fw pi-align-left',
    //         items: [
    //             {
    //                 label: 'Submenu 1',
    //                 icon: 'pi pi-fw pi-align-left',
    //                 items: [
    //                     {
    //                         label: 'Submenu 1.1',
    //                         icon: 'pi pi-fw pi-align-left',
    //                         items: [
    //                             {
    //                                 label: 'Submenu 1.1.1',
    //                                 icon: 'pi pi-fw pi-align-left'
    //                             },
    //                             {
    //                                 label: 'Submenu 1.1.2',
    //                                 icon: 'pi pi-fw pi-align-left'
    //                             },
    //                             {
    //                                 label: 'Submenu 1.1.3',
    //                                 icon: 'pi pi-fw pi-align-left'
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         label: 'Submenu 1.2',
    //                         icon: 'pi pi-fw pi-align-left',
    //                         items: [
    //                             {
    //                                 label: 'Submenu 1.2.1',
    //                                 icon: 'pi pi-fw pi-align-left'
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 label: 'Submenu 2',
    //                 icon: 'pi pi-fw pi-align-left',
    //                 items: [
    //                     {
    //                         label: 'Submenu 2.1',
    //                         icon: 'pi pi-fw pi-align-left',
    //                         items: [
    //                             {
    //                                 label: 'Submenu 2.1.1',
    //                                 icon: 'pi pi-fw pi-align-left'
    //                             },
    //                             {
    //                                 label: 'Submenu 2.1.2',
    //                                 icon: 'pi pi-fw pi-align-left'
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         label: 'Submenu 2.2',
    //                         icon: 'pi pi-fw pi-align-left',
    //                         items: [
    //                             {
    //                                 label: 'Submenu 2.2.1',
    //                                 icon: 'pi pi-fw pi-align-left'
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     { separator: true },
    //     {
    //         label: 'Start',
    //         icon: 'pi pi-fw pi-download',
    //         items: [
    //             {
    //                 label: 'Buy Now',
    //                 icon: 'pi pi-fw pi-shopping-cart',
    //                 url: 'https://www.primefaces.org/store'
    //             },
    //             {
    //                 label: 'Documentation',
    //                 icon: 'pi pi-fw pi-info-circle',
    //                 routerLink: ['/documentation']
    //             }
    //         ]
    //     }
    // ];
}
