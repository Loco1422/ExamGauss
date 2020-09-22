import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <div class="modal-header alert-danger">
    <h4 class="modal-title">{{title}}</h4>
 <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss(false)" title="Cerrar">
        <!--span aria-hidden="true">&times;</span-->
        <i class="fa fa-times"></i>
    </button>
  </div>
  <div class="modal-body">
    <p [innerHTML]="prompt"></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-primary" (click)="activeModal.close(true)" ngbAutofocus>{{ok}}</button>
    <button type="button" class="btn btn-outline-secondary" (click)="activeModal.close(false)">{{cancel}}</button>
  </div>
`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
  title: string;
  prompt: string;
  ok: string;
  cancel: string;

    constructor(public activeModal: NgbActiveModal) {

  }
}
