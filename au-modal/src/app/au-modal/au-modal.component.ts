import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'au-modal',
  templateUrl: './au-modal.component.html',
  styleUrls: ['./au-modal.component.scss']
})
export class AuModalComponent  {

  @Input()
  body: TemplateRef<any>;

  closeModal() {

  }
}
