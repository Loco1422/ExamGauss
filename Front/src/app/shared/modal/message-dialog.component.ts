import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-message-dialog',
  template: `
  <div class="modal-header">
<h4 class="modal-title">{{title}}</h4>
  <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
    <i class="fa fa-times"></i>
  </button>
</div>
<div class="modal-body">
     <p [innerHTML]="prompt"></p>
</div>
`
})
export class MessageDialogComponent {
  title: string;
  prompt: string;
  

    constructor(public activeModal: NgbActiveModal) {
        
  }
}
