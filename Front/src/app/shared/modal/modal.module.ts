import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ModalService } from './modal.service';
import { MessageDialogComponent } from './message-dialog.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ConfirmDialogComponent, MessageDialogComponent],
    providers: [ModalService],
    entryComponents: [ConfirmDialogComponent, MessageDialogComponent],
    exports: [ConfirmDialogComponent, MessageDialogComponent]
})
export class ModalModule {

}

export * from './modal.service';

