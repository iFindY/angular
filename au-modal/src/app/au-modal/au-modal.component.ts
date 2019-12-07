import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { AuModalService } from './au-modal.service';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'au-modal',
  templateUrl: './au-modal.component.html',
  styleUrls: ['./au-modal.component.scss']
})
export class AuModalComponent implements OnInit {

  @Input()
  body: TemplateRef<any>;

  @Input()
  hiddenOnEsc = true;

  @Input()
  hiddenOnClickOutside = true;

  constructor(private modalService: AuModalService,
              private eventManager: EventManager) {
  }

  closeModal() {
    this.modalService.close();
  }

  cancelClick($event: Event) {
    //$event.preventDefault();
    $event.stopPropagation();
  }

  ngOnInit(): void {
    this.eventManager.addGlobalEventListener('window', 'keyup.esc', () => {
      if (this.hiddenOnEsc) this.closeModal();
    })

  }

  onClickOutsideModal() {
    if (this.hiddenOnClickOutside) this.closeModal();
  }
}
