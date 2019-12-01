import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'au-fa-input input'   // this directive will applied to any nested input that is inside au-fa-input
})
export class InputRefDirective {  // this directive will automatic applied to any input inside au-fa-input tags/element in the html


  focus = false;

  @HostListener('focus')
  onFocus() {
    this.focus = true;
  }

  @HostListener('blur')
  onBlur() {
    this.focus = false;
  }
}
