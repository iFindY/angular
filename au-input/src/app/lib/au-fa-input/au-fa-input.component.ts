import { AfterContentInit, Component, ContentChild, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { InputRefDirective } from '../common/input-ref.directive';

@Component({
  selector: 'au-fa-input',
  templateUrl: './au-fa-input.component.html',
  styleUrls: ['./_au-fa-input.component.scss']
})
export class AuFaInputComponent implements OnInit, AfterContentInit {

  @Input()
  icon: string;

  @ContentChild(InputRefDirective, { static: false }) // search the presented dom for input element reference
  input: InputRefDirective;

  constructor() {}

  ngOnInit() {}

  get classes(): any { // emulate
    const cssClasses = {};
    if (this.icon) {
      cssClasses['fa-' + this.icon] = true; // extend object with new property
    }
    return cssClasses;
  }

  ngAfterContentInit(): void {
    if (!this.input) {
      console.error('the ua-fa-input component need content inside its container')
    }
  }

  @HostBinding('class.input-focus') // if method/input.focus return true this class will be applied on the host element
  get isInputFocus() {
    return this.input ? this.input.focus : false;
  }
}
