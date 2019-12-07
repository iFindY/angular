import { AfterContentInit, ContentChild, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuModalComponent } from './au-modal.component';

@Directive({
  selector: '[auModalOpenOnClick]'
})
export class AuModalOpenOnClickDirective {

  /**
   * all structural directive need this.
   * this structural directive was applied on the templateRef template.
   * can access and handle and instantiate the ng-template.
   * can handle only ng-templates
   */
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef //one or more view can be attached
  ) {
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
}
