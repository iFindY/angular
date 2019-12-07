import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuModalService } from './au-modal.service';

@Directive({
  selector: '[auModalOpenOnClick]'
})
export class AuModalOpenOnClickDirective implements OnInit, OnDestroy {

  elements: HTMLBaseElement[];

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
    this.elements = els.length ? els : [els];

    this.elements.forEach(el => {
      el.addEventListener('click', () => this.clickHandler())
    })
  }

  ngOnInit(): void {
    this.modalService.close$.subscribe(() => this.viewContainer.clear());
  }

  ngOnDestroy(): void {
    this.elements.forEach(el => el.removeEventListener('click', this.clickHandler))
  }

  clickHandler = (() => { // be sure  that this object exists this always populated
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef)
  }).bind(this)
}
