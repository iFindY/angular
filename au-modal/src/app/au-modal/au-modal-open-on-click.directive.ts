import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuModalService } from './au-modal.service';

@Directive({
  selector: '[auModalOpenOnClick]'
})
export class AuModalOpenOnClickDirective implements OnInit {

  /**
   * all structural directive need this.
   * this structural directive was applied on the templateRef template.
   * can access and handle and instantiate the ng-template.
   * can handle only ng-templates
   */
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private modalService: AuModalService) {
  }

  @Input()
  set auModalOpenOnClick(els) {
    let elements: HTMLBaseElement[];
    elements = els.length ? els : [els];

    elements.forEach(el => {
      el.addEventListener('click', () => {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef)
      })
    })
  }

  ngOnInit(): void {
    this.modalService.close$.subscribe(() => this.viewContainer.clear());
  }
}
