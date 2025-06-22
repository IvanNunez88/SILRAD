// src/app/services/pdf.service.ts
import { Injectable } from '@angular/core';

declare const pdfMake: any;

@Injectable({ providedIn: 'root' })
export class PdfService {
    downloadPdf(docDefinition: any, fileName = 'documento.pdf') {
        pdfMake.createPdf(docDefinition).download(fileName);
    }
    openPdf(docDefinition: any) {
        pdfMake.createPdf(docDefinition).open();
    }
}
