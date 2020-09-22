import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageDialogComponent } from './message-dialog.component';


@Injectable(
    //{providedIn: 'root'}
)
export class ModalService {

    constructor(private ngbModal: NgbModal) { }

    confirm(
        prompt = '', title = 'Confirmación', ok = 'Aceptar', cancel = 'Cancelar'
    ): Observable<boolean> {
        const modal = this.ngbModal.open(
            ConfirmDialogComponent, { centered: true, windowClass: 'animated' });

        modal.componentInstance.prompt = prompt;
        modal.componentInstance.title = title;

        modal.componentInstance.ok = ok;
        modal.componentInstance.cancel = cancel;

        return from(modal.result).pipe(
            catchError(error => {
                return of(undefined);
            })
        );
    }

    message(
      prompt = '', title = ''
    ): Observable<boolean> {
      const modal = this.ngbModal.open(
        MessageDialogComponent, { backdrop: 'static' });

      modal.componentInstance.prompt = prompt;
      modal.componentInstance.title = title;

      return from(modal.result).pipe(
        catchError(error => {
          console.warn(error);
          return of(undefined);
        })
      );
    }
}

