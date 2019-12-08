import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { LEFT_ARROW, overrideCharAtPosition, RIGHT_ARROW, SPECIAL_CHARACTERS, TAB } from './mask.utils';
import { el } from '@angular/platform-browser/testing/src/browser_util';

@Directive({
  selector: '[mask]'
})
export class MaskDirective implements OnInit {

  @Input('mask')
  mask = '';

  input: HTMLInputElement;

  constructor(el: ElementRef) {
    this.input = el.nativeElement;
  }

  ngOnInit(): void {
    this.input.value = this.buildPlaceHolder();
  }

  @HostListener('keydown', ['$event', '$event.keyCode'])
  onKeyDownEvent($event: KeyboardEvent, keyCode) {
    if (keyCode !== TAB) $event.preventDefault();

    const key = String.fromCharCode(keyCode),
      cursorPosition = this.input.selectionStart;
    let nextCurPos: number;

    switch (keyCode) {
      case LEFT_ARROW:
        this.handelLeftArrow(cursorPosition);
        break;
      case RIGHT_ARROW:
        this.handelRightArrow(cursorPosition);
        break;
    }

    overrideCharAtPosition(this.input, cursorPosition, key);
    this.handelRightArrow(cursorPosition);
  }

  handelLeftArrow(cursorPosition) {
    let nextCurPos: number;
    const previousCurPos: string[] =
      this.input.value
        .slice(0, cursorPosition)
        .split('');

    previousCurPos
      .reduceRight((index, char) => {
        if (!nextCurPos && !SPECIAL_CHARACTERS.includes(char)) nextCurPos = index;
        return index += -1;
      }, previousCurPos.length - 1);

    if (nextCurPos != undefined) this.input.setSelectionRange(nextCurPos, nextCurPos);
  }

  handelRightArrow(cursorPosition) {
    let nextCurPos: number;
    this.input.value
      .slice(cursorPosition + 1)
      .split('')
      .reduce((index, char) => {
        if (!nextCurPos && !SPECIAL_CHARACTERS.includes(char)) nextCurPos = cursorPosition + index;
        return index += +1;
      }, 1);

    if (nextCurPos != undefined) this.input.setSelectionRange(nextCurPos, nextCurPos);
  }

  buildPlaceHolder(): string {
    const chars = this.mask.split('');
    return chars.reduce((result, char) => { // result = accumulator which wil be passed to  each iteration
      return result += SPECIAL_CHARACTERS.includes(char) ? char : '_';
    }, ''); // empty string is the starting point  string
  }
}
