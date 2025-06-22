import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { LazyImageWidget } from '@/pages/landing/components/lazyimagewidget';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { DividerModule } from 'primeng/divider';
import { CurrencyPipe } from '@angular/common';
import { PercentPipe } from '@angular/common';
import localeEsMX from '@angular/common/locales/es-MX';

import { DatePipe } from '@angular/common';
registerLocaleData(localeEsMX, 'es-MX');

@NgModule({
    declarations: [],
    imports: [CommonModule, LazyImageWidget],
    exports: [
        CommonModule,
        DatePickerModule,
        ReactiveFormsModule,
        FormsModule,
        InputTextModule,
        LazyImageWidget,
        ButtonModule,
        CheckboxModule,
        PasswordModule,
        RippleModule,
        FloatLabelModule,
        ProgressBarModule,
        ToastModule,
        MessageModule,
        TableModule,
        ToolbarModule,
        IconFieldModule,
        InputIconModule,
        SelectModule,
        ToggleSwitchModule,
        DynamicDialogModule,
        DialogModule,
        InputGroupModule,
        InputGroupAddonModule,
        TooltipModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        InputNumberModule,
        TagModule,
        PasswordModule,
        TextareaModule,
        DividerModule
    ],
    providers: [DatePipe, MessageService, DialogService, CurrencyPipe, PercentPipe, ConfirmationService, { provide: LOCALE_ID, useValue: 'es-MX' }]
})
export class SharedModule {}
