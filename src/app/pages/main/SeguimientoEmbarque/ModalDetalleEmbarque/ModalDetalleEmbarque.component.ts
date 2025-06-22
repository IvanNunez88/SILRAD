import { SharedModule } from '@/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmbarqueService } from '@/layout/service/Embarque.service';
import { CurrencyPipe } from '@angular/common';
import { PercentPipe } from '@angular/common';
import { ModalSecundariaNoUnidadComponent } from './ModalSecundariaNoUnidad/ModalSecundariaNoUnidad.component';
import { ModalSecundariaCostoAdicionalComponent } from './ModalSecundariaCostoAdicional/ModalSecundariaCostoAdicional.component';
import { ModalDocumentacionClienteComponent } from './ModalDocumentacionCliente/ModalDocumentacionCliente.component';
import { ModalSecundariaDireccionComponent } from './ModalSecundariaDireccion/ModalSecundariaDireccion.component';
import { ConfirmationService } from 'primeng/api';
import { PdfService } from '@/layout/service/PDF.service';

@Component({
    selector: 'app-ModalDetalleEmbarque',
    templateUrl: './ModalDetalleEmbarque.component.html',
    styleUrls: ['./ModalDetalleEmbarque.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalDetalleEmbarqueComponent implements OnInit {
    frmEmbarque: FormGroup;
    ref: DynamicDialogRef | undefined;
    idEmbarque?: number;
    listaConsulProveedorRuta: iReporteProveedorRuta[] = [];
    columnasTabla: string[] = ['proveedor', 'noUnidad', 'origen', 'destino', 'costo'];
    // usuario: string = '';
    embarque?: iRepDetalle;

    constructor(
        private fb: FormBuilder,
        private dialog: DialogService,
        private config: DynamicDialogConfig,
        private _embarqueServicio: EmbarqueService,
        private currencyPipe: CurrencyPipe,
        private confirmationService: ConfirmationService,
        private _pdfService: PdfService,
        private percentPipe: PercentPipe
    ) {
        this.frmEmbarque = this.fb.group({
            referencia: [''],
            empresa: [''],
            cliente: [''],
            tipoViaje: [''],
            tipo: [''],
            estatus: [''],
            tipoServicio: [''],
            tipoUnidad: [''],
            origen: [''],
            destino: [''],
            fecEfectiva: [''],
            clasificacion: [''],
            venta: [''],
            utilidad: [''],
            profit: [''],
            tipoMercancia: [''],
            observaciones: ['']
        });

        if (this.config.data != null) {
            this.idEmbarque = this.config.data;
        }
    }

    async ngOnInit(): Promise<void> {
        await this.cargaInfoDetalle();
        await this.cargaProveedorRuta();
    }

    async cargaInfoDetalle() {
        this._embarqueServicio.listaEmbarqueDetalle(this.idEmbarque!).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.embarque = (await data.value[0]) as iRepDetalle;

                    const montoFormateado = this.currencyPipe.transform(await data.value[0].monto, 'MXN', 'symbol', '1.2-2', 'es-MX');
                    const utilidadFormatado = this.currencyPipe.transform(await data.value[0].utilidad, 'MXN', 'symbol', '1.2-2', 'es-MX');
                    const profitFormteado = this.percentPipe.transform((await data.value[0].margen) / 100, '1.2-2');

                    this.frmEmbarque.patchValue({
                        referencia: `RD${await data.value[0].idEmbarque}`,
                        empresa: await data.value[0].empresa,
                        cliente: await data.value[0].cliente,
                        tipoViaje: await data.value[0].tipoViaje,
                        estatus: await data.value[0].estatus,
                        tipoServicio: await data.value[0].tipoServicio,
                        tipoUnidad: await data.value[0].tipoUnidad,
                        origen: await data.value[0].origen,
                        destino: await data.value[0].destino,
                        fecEfectiva: await data.value[0].fecEfectiva,
                        clasificacion: await data.value[0].clasificacion,
                        venta: `${montoFormateado} ${await data.value[0].codMoneda}`,
                        utilidad: utilidadFormatado,
                        profit: profitFormteado,
                        tipoMercancia: await data.value[0].tipoMercancia,
                        observaciones: await data.value[0].observaciones
                    });
                }
            }
        });
    }

    async cargaProveedorRuta() {
        this._embarqueServicio.listaEmbarqueProveedorRuta(this.idEmbarque!).subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaConsulProveedorRuta = await data.value;
                }
            }
        });
    }

    async registrarNoUnidad(registro: iReporteProveedorRuta) {
        this.ref = this.dialog.open(ModalSecundariaNoUnidadComponent, {
            header: 'Registro No. Unidad',
            width: '285px',
            height: '170px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: registro
        });

        this.ref.onClose.subscribe(async (resultado: boolean) => {
            if (resultado) {
                await this.cargaInfoDetalle();
                await this.cargaProveedorRuta();
            }
        });
    }

    async registrarCostosAdicionales(registro: iReporteProveedorRuta) {
        this.ref = this.dialog.open(ModalSecundariaCostoAdicionalComponent, {
            header: 'Costo Adicional',
            width: '700px',
            // height: "485px",
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: registro
        });

        this.ref.onClose.subscribe(async () => {
            await this.cargaInfoDetalle();
        });
    }

    async revisarDocumentacion() {
        this.ref = this.dialog.open(ModalDocumentacionClienteComponent, {
            header: 'Documentación',
            width: '550px',
            // height: "485px",
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            dismissableMask: true,
            data: this.idEmbarque
        });
    }

    async registroDirecciones(registro: iReporteProveedorRuta, pTipoDireccion: number) {
        //1 ORIGEN
        //2 DESTINO

        const InfoDatos: iCatDirecciones = {
            idSolicitud: registro.idSolicitud,
            idEmbarque: registro.idEmbarque,
            idRuta: registro.idRuta,
            tipoDireccion: pTipoDireccion
        };

        if (pTipoDireccion == 1) {
            this.ref = this.dialog.open(ModalSecundariaDireccionComponent, {
                header: 'Dirección Origen',
                width: '1130px',
                // height: "485px",
                modal: true,
                focusOnShow: false,
                closable: true,
                draggable: true,
                dismissableMask: true,
                data: InfoDatos
            });
        } else if (pTipoDireccion == 0) {
            this.ref = this.dialog.open(ModalSecundariaDireccionComponent, {
                header: 'Dirección Destino',
                width: '1100px',
                // height: "485px",
                modal: true,
                focusOnShow: false,
                closable: true,
                draggable: true,
                dismissableMask: true,
                data: InfoDatos
            });
        }
    }

    async cargaInfoCarta(registro: iReporteProveedorRuta) {}

    async generarCIES() {
        const tarifaFormateada = this.currencyPipe.transform(this.listaConsulProveedorRuta[0].tarifa, 'MXN', 'symbol', '1.2-2', 'es-MX');
        const listaDireccionesOrigen: iDetalleDirecciones[] = this.listaConsulProveedorRuta[0].direccionesOrigen;
        const listaDireccionesDestino: iDetalleDirecciones[] = this.listaConsulProveedorRuta[0].direccionesDestino;
        const listaDocumentacion: iDetalleDocumentos[] = this.embarque?.listaDocumentos!;

        let lstOrigen: string[] = [];
        let lstDestino: string[] = [];
        let lstDocuemento: string[] = [];

        listaDireccionesOrigen.forEach((lst: iDetalleDirecciones) => {
            lstOrigen.push(`BODEGA: ${lst.almacen} \n DIRECCIÓN: ${lst.calle}, ${lst.colonia}, ${lst.cp}, ${lst.municipio} \n CONTACTO: ${lst.contacto} \n FECHA Y HORA: ${lst.fecEfectiva} ${lst.hInicio} - ${lst.hFinal}\n\n`);
        });

        listaDireccionesDestino.forEach((lst: iDetalleDirecciones) => {
            lstDestino.push(`BODEGA: ${lst.almacen} \n DIRECCIÓN: ${lst.calle}, ${lst.colonia}, ${lst.cp}, ${lst.municipio} \n CONTACTO: ${lst.contacto} \n FECHA Y HORA: ${lst.fecEfectiva} ${lst.hInicio} - ${lst.hFinal}\n\n`);
        });

        listaDocumentacion.forEach((lst: iDetalleDocumentos) => {
            lstDocuemento.push(`${lst.documento.toUpperCase()}.`);
        });

        lstOrigen[lstOrigen.length - 1] = lstOrigen[lstOrigen.length - 1].substring(0, lstOrigen[lstOrigen.length - 1].length - 2);
        lstDestino[lstDestino.length - 1] = lstDestino[lstDestino.length - 1].substring(0, lstDestino[lstDestino.length - 1].length - 2);

        let contenidoPDF = {
            content: [
                { fontSize: 10, bold: true, text: 'CARTA DE INSTRUCCIONES\n\n', style: 'header' },
                {
                    table: {
                        widths: ['*', '*'],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    image: 'data:image/png;base64,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',
                                    width: 121,
                                    height: 45
                                },
                                {
                                    border: [false, false, false, false],
                                    fit: '60',
                                    alignment: 'right',
                                    qr: this.frmEmbarque.value.referencia
                                }
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: [250, '*', 210],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    table: {
                                        body: [
                                            [
                                                { border: [false, false, false, false], fontSize: 10, bold: true, text: 'REF RAD Factura:' },
                                                { border: [false, false, false, false], fontSize: 10, text: this.frmEmbarque.value.referencia }
                                            ],
                                            [
                                                { border: [false, false, false, false], fontSize: 10, bold: true, text: 'REQUESTED BY:' },
                                                { border: [false, false, false, false], fontSize: 10, text: this.embarque?.usuario! }
                                            ]
                                        ]
                                    }
                                },
                                { border: [false, false, false, false], text: '' },
                                {
                                    border: [false, false, false, false],
                                    table: {
                                        body: [
                                            [
                                                { border: [false, false, false, false], fontSize: 10, bold: true, text: 'FECHA DE CREACIÓN:' },
                                                { border: [false, false, false, false], fontSize: 10, text: this.frmEmbarque.value.fecEfectiva }
                                            ],
                                            [
                                                { border: [false, false, false, false], fontSize: 10, bold: true, text: 'NO. UNIDAD:' },
                                                { border: [false, false, false, false], fontSize: 10, text: this.listaConsulProveedorRuta[0].noUnidad }
                                            ]
                                        ]
                                    }
                                }
                            ]
                        ]
                    }
                },
                '',
                {
                    table: {
                        widths: ['*'],
                        headerRows: 1,
                        body: [
                            [{ fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'COSTOS' }],
                            [
                                {
                                    fontSize: 10,
                                    text: `FLETE - ${tarifaFormateada} ${this.listaConsulProveedorRuta[0].codMoneda}`
                                }
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: ['*', '*', '*'],
                        headerRows: 1,
                        body: [
                            [
                                { fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'PROVEEDOR' },
                                { fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'RUTA' },
                                { fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'TIPO DE UNIDAD' }
                            ],
                            [
                                { fontSize: 10, text: this.listaConsulProveedorRuta[0].proveedor },
                                { fontSize: 10, text: `${this.listaConsulProveedorRuta[0].origen} - ${this.listaConsulProveedorRuta[0].destino}` },
                                { fontSize: 10, text: this.embarque?.tipoUnidad! }
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: ['*'],
                        headerRows: 1,
                        body: [[{ fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'AGENTE ADUANAL' }], [{ fontSize: 10, text: this.embarque?.agenteAduanal }]]
                    }
                },
                {
                    table: {
                        widths: ['*'],
                        headerRows: 1,
                        body: [[{ fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'OBSERVACIONES' }], [{ fontSize: 10, text: this.embarque?.observaciones }]]
                    }
                },
                {
                    table: {
                        widths: ['*'],
                        headerRows: 1,
                        body: [
                            [{ fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'LUGAR(ES) DE RECOLECCIÓN' }],
                            [
                                {
                                    fontSize: 10,
                                    ul: [lstOrigen]
                                }
                            ]
                        ]
                    }
                },
                ,
                {
                    table: {
                        widths: ['*'],
                        headerRows: 1,
                        body: [
                            [{ fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'LUGAR(ES) DE ENTREGA' }],
                            [
                                {
                                    fontSize: 10,
                                    ul: [lstDestino]
                                }
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: ['*'],
                        headerRows: 1,
                        body: [
                            [{ fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'PROCESO FACTURACIÓN' }],
                            [
                                {
                                    fontSize: 10,
                                    text: 'LA FACTURA SE RECIBE JUNTO CON SU PRUEBA DE ENTREGA CORRESPONDIENTE ESCANEADAS Y FÍSICA (FIRMADAS Y/O SELLADAS AL MOMENTO DE FINALIZAR EL SERVICIO\n\nCORREOS: YCORDOVA@RAD-LOGISTICS.COM, FESTRADA@RAD-LOGISTICS.COM, BBAZALDUA@RAD-LOGISTICS.COM, APEREZ@RAD-LOGISTICS.COM, ADMINISTRACION@RAD-LOGISTICS.COM \nENVIAR LA FACTURA, XML Y LA PRUEBA ENTREGDA. ASEGURARSE DE QUE LA REFERENCIA DE RAD ESTÉ INCLUIDA EN LA FACTURA Y CARTA PORTE.'
                                }
                            ]
                        ]
                    }
                },

                {
                    table: {
                        widths: ['*', '*'],
                        headerRows: 1,
                        body: [
                            [
                                { fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'FACTURAR A', alignment: 'center' },
                                { fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'EVIDENCIAS', alignment: 'center' }
                            ],
                            [
                                { fontSize: 10, alignment: 'justify', text: this.embarque?.datosFacturacion! },
                                {
                                    fontSize: 10,
                                    alignment: 'justify',
                                    ul: [lstDocuemento]
                                }
                            ]
                        ]
                    }
                }
            ]
        };

        this._pdfService.openPdf(contenidoPDF);

        // const docDefinition = {
        //     pageSize: 'A4',
        //     pageMargins: [40, 60, 40, 60], // [izq, arriba, der, abajo]
        //     header: {
        //         text: 'Reporte de Ventas',
        //         style: 'header',
        //         alignment: 'center',
        //         margin: [0, 20, 0, 20]
        //     },
        //     footer: (currentPage: number, pageCount: number) => {
        //         return {
        //             text: `Página ${currentPage} de ${pageCount}`,
        //             alignment: 'right',
        //             margin: [0, 0, 40, 20]
        //         };
        //     },
        //     content: [
        //         { text: 'Resumen de Ingresos', style: 'subheader' },
        //         {
        //             table: {
        //                 headerRows: 1,
        //                 widths: ['*', 'auto', 'auto', '*'],
        //                 body: [
        //                     ['Producto', 'Cant.', 'Precio', 'Total'],
        //                     ['Camisa', '2', '$20', '$40'],
        //                     ['Pantalón', '1', '$35', '$35']
        //                     // … más filas
        //                 ]
        //             },
        //             layout: 'lightHorizontalLines'
        //         },
        //         { text: 'Gracias por tu preferencia.', margin: [0, 20, 0, 0] }
        //     ],
        //     styles: {
        //         header: { fontSize: 18, bold: true },
        //         subheader: { fontSize: 14, margin: [0, 10, 0, 5] },
        //         tableHeader: { bold: true, fillColor: '#eeeeee' }
        //     }
        // };

        // // Descarga directamente
        // // this._pdfService.downloadPdf(docDefinition, 'reporte-ventas.pdf');
        // // O bien lo abres en pestaña:
        // this._pdfService.openPdf(docDefinition);
    }

    async generarCIIN() {
        const tarifaFormateada = this.currencyPipe.transform(this.listaConsulProveedorRuta[0].tarifa, 'MXN', 'symbol', '1.2-2', 'es-MX');
        const listaDireccionesOrigen: iDetalleDirecciones[] = this.listaConsulProveedorRuta[0].direccionesOrigen;
        const listaDireccionesDestino: iDetalleDirecciones[] = this.listaConsulProveedorRuta[0].direccionesDestino;
        const listaDocumentacion: iDetalleDocumentos[] = this.embarque?.listaDocumentos!;

        let lstOrigen: string[] = [];
        let lstDestino: string[] = [];
        let lstDocuemento: string[] = [];

        listaDireccionesOrigen.forEach((lst: iDetalleDirecciones) => {
            lstOrigen.push(`BODEGA: ${lst.almacen} \n DIRECCIÓN: ${lst.calle}, ${lst.colonia}, ${lst.cp}, ${lst.municipio} \n CONTACTO: ${lst.contacto} \n FECHA Y HORA: ${lst.fecEfectiva} ${lst.hInicio} - ${lst.hFinal}\n\n`);
        });

        listaDireccionesDestino.forEach((lst: iDetalleDirecciones) => {
            lstDestino.push(`BODEGA: ${lst.almacen} \n DIRECCIÓN: ${lst.calle}, ${lst.colonia}, ${lst.cp}, ${lst.municipio} \n CONTACTO: ${lst.contacto} \n FECHA Y HORA: ${lst.fecEfectiva} ${lst.hInicio} - ${lst.hFinal}\n\n`);
        });

        listaDocumentacion.forEach((lst: iDetalleDocumentos) => {
            lstDocuemento.push(`${lst.documento.toUpperCase()}.`);
        });

        lstOrigen[lstOrigen.length - 1] = lstOrigen[lstOrigen.length - 1].substring(0, lstOrigen[lstOrigen.length - 1].length - 2);
        lstDestino[lstDestino.length - 1] = lstDestino[lstDestino.length - 1].substring(0, lstDestino[lstDestino.length - 1].length - 2);

        let contenidoPDF = {
            content: [
                { fontSize: 10, bold: true, text: 'LETTER INSTRUCTIONS\n\n', style: 'header' },
                {
                    table: {
                        widths: ['*', '*'],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    image: 'data:image/png;base64,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',
                                    width: 121,
                                    height: 45
                                },
                                {
                                    border: [false, false, false, false],
                                    fit: '60',
                                    alignment: 'right',
                                    qr: this.frmEmbarque.value.referencia
                                }
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: [250, '*', 210],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    table: {
                                        body: [
                                            [
                                                { border: [false, false, false, false], fontSize: 10, bold: true, text: 'REF RAD INVOICE:' },
                                                { border: [false, false, false, false], fontSize: 10, text: this.frmEmbarque.value.referencia }
                                            ],
                                            [
                                                { border: [false, false, false, false], fontSize: 10, bold: true, text: 'REQUESTED BY:' },
                                                { border: [false, false, false, false], fontSize: 10, text: this.embarque?.usuario! }
                                            ]
                                        ]
                                    }
                                },
                                { border: [false, false, false, false], text: '' },
                                {
                                    border: [false, false, false, false],
                                    table: {
                                        body: [
                                            [
                                                { border: [false, false, false, false], fontSize: 10, bold: true, text: 'CREATION DATE:' },
                                                { border: [false, false, false, false], fontSize: 10, text: this.frmEmbarque.value.fecEfectiva }
                                            ],
                                            [
                                                { border: [false, false, false, false], fontSize: 10, bold: true, text: 'UNIT NUMBER:' },
                                                { border: [false, false, false, false], fontSize: 10, text: this.listaConsulProveedorRuta[0].noUnidad }
                                            ]
                                        ]
                                    }
                                }
                            ]
                        ]
                    }
                },
                '',
                {
                    table: {
                        widths: ['*'],
                        headerRows: 1,
                        body: [
                            [{ fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'COSTS' }],
                            [
                                {
                                    fontSize: 10,
                                    text: `FLETE - ${tarifaFormateada} ${this.listaConsulProveedorRuta[0].codMoneda}`
                                }
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: ['*', '*', '*'],
                        headerRows: 1,
                        body: [
                            [
                                { fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'SUPPLIER' },
                                { fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'ROUTE' },
                                { fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'UNIT TYPE' }
                            ],
                            [
                                { fontSize: 10, text: this.listaConsulProveedorRuta[0].proveedor },
                                { fontSize: 10, text: `${this.listaConsulProveedorRuta[0].origen} - ${this.listaConsulProveedorRuta[0].destino}` },
                                { fontSize: 10, text: this.embarque?.tipoUnidad! }
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: ['*'],
                        headerRows: 1,
                        body: [[{ fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'CUSTOMS AGENT' }], [{ fontSize: 10, text: this.embarque?.agenteAduanal }]]
                    }
                },
                {
                    table: {
                        widths: ['*'],
                        headerRows: 1,
                        body: [[{ fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'OBSERVATIONS' }], [{ fontSize: 10, text: this.embarque?.observaciones }]]
                    }
                },
                {
                    table: {
                        widths: ['*'],
                        headerRows: 1,
                        body: [
                            [{ fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'ADDRES PICKUP' }],
                            [
                                {
                                    fontSize: 10,
                                    ul: [lstOrigen]
                                }
                            ]
                        ]
                    }
                },
                ,
                {
                    table: {
                        widths: ['*'],
                        headerRows: 1,
                        body: [
                            [{ fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'ADDRES DELIVERY' }],
                            [
                                {
                                    fontSize: 10,
                                    ul: [lstDestino]
                                }
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: ['*'],
                        headerRows: 1,
                        body: [
                            [{ fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'BILLING PROCESS' }],
                            [
                                {
                                    fontSize: 10,
                                    text: 'LA FACTURA SE RECIBE JUNTO CON SU PRUEBA DE ENTREGA CORRESPONDIENTE ESCANEADAS Y FÍSICA (FIRMADAS Y/O SELLADAS AL MOMENTO DE FINALIZAR EL SERVICIO\n\nCORREOS: YCORDOVA@RAD-LOGISTICS.COM, FESTRADA@RAD-LOGISTICS.COM, BBAZALDUA@RAD-LOGISTICS.COM, APEREZ@RAD-LOGISTICS.COM, ADMINISTRACION@RAD-LOGISTICS.COM \nENVIAR LA FACTURA, XML Y LA PRUEBA ENTREGDA. ASEGURARSE DE QUE LA REFERENCIA DE RAD ESTÉ INCLUIDA EN LA FACTURA Y CARTA PORTE.'
                                }
                            ]
                        ]
                    }
                },

                {
                    table: {
                        widths: ['*', '*'],
                        headerRows: 1,
                        body: [
                            [
                                { fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'BILL TO', alignment: 'center' },
                                { fontSize: 10, bold: true, fillColor: '#000000', color: '#FFFFFF', text: 'EVIDENCES', alignment: 'center' }
                            ],
                            [
                                { fontSize: 10, alignment: 'justify', text: this.embarque?.datosFacturacion! },
                                {
                                    fontSize: 10,
                                    alignment: 'justify',
                                    ul: [lstDocuemento]
                                }
                            ]
                        ]
                    }
                }
            ]
        };

        this._pdfService.openPdf(contenidoPDF);
    }
}

interface iRepDetalle {
    idSolicitud: number;
    idEmbarque: number;
    empresa: string;
    cliente: string;
    tipoServicio: string;
    tipoUnidad: string;
    origen: string;
    destino: string;
    fecEfectiva: string;
    codMoneda: string;
    monto: number;
    tipoMercancia: string;
    observaciones: string;
    clasificacion: string;
    tipoViaje: string;
    estatus: string;
    utilidad: number;
    margen: number;
    usuario: string;
    agenteAduanal: string;
    datosFacturacion: string;
    listaDocumentos: iDetalleDocumentos[];
}

interface iDetalleDocumentos {
    documento: string;
}

interface iReporteProveedorRuta {
    idSolicitud: number;
    idEmbarque: number;
    idRuta: number;
    noUnidad: string;
    proveedor: string;
    codMoneda: string;
    tarifa: number;
    origen: string;
    direccionesOrigen: iDetalleDirecciones[];
    destino: string;
    direccionesDestino: iDetalleDirecciones[];
}

interface iDetalleDirecciones {
    almacen: string;
    calle: string;
    colonia: string;
    cp: string;
    municipio: string;
    contacto: string;
    fecEfectiva: string;
    hInicio: string;
    hFinal: string;
}

interface iCatDirecciones {
    idSolicitud: number;
    idEmbarque: number;
    idRuta: number;
    tipoDireccion: number;
}
