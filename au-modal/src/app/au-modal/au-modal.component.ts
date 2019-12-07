import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { AuModalService } from './au-modal.service';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'au-modal',
  templateUrl: './au-modal.component.html',
  styleUrls: ['./au-modal.component.scss']
})
export class AuModalComponent implements OnInit {

  @Input() body: TemplateRef<any>;
  @Input() hiddenOnEsc = true;
  @Input() hiddenOnClickOutside = true;
  @Input() context: any;

  constructor(private modalService: AuModalService,
              private eventManager: EventManager) {
  }

  close() {
    this.modalService.close();
  }

  cancelClick($event: Event) {
    //$event.preventDefault();
    $event.stopPropagation();
  }

  ngOnInit(): void {
    this.eventManager.addGlobalEventListener('window', 'keyup.esc', () => {
      if (this.hiddenOnEsc) this.close();
    })

  }

  onClickOutsideModal() {
    if (this.hiddenOnClickOutside) this.close();
  }
}
