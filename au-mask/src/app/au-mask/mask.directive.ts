import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { BACKSPACE, DELETE, LEFT_ARROW, overrideCharAtPosition, RIGHT_ARROW, SPECIAL_CHARACTERS, TAB } from './mask.utils';
import { el } from '@angular/platform-browser/testing/src/browser_util';
import { dateValidator, maskDigitValidators, neverValidator } from './digit-validaotr';

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

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData.getData('text/plain');

    if (dateValidator(pastedInput)) {
      this.input.value= '';
      document.execCommand('insertText', false, pastedInput);
    }
  }

  @HostListener('keydown', ['$event', '$event.keyCode'])
  onKeyDownEvent($event: KeyboardEvent, keyCode) {
    if ($event.metaKey || $event.ctrlKey) return;
    if (keyCode !== TAB) $event.preventDefault();

    const key = String.fromCharCode(keyCode),
      cursorPosition = this.input.selectionStart;

    switch (keyCode) {
      case LEFT_ARROW:
        this.handelLeftArrow(cursorPosition);
        break;
      case RIGHT_ARROW:
        this.handelRightArrow(cursorPosition);
        break;
      case BACKSPACE:
        this.handelBackSpace(cursorPosition);
        break;
      case DELETE:
        this.handelDelete(cursorPosition);
        break;
    }

    const maskDigit = this.mask.charAt(cursorPosition),
      digitValidator = maskDigitValidators[maskDigit] || neverValidator;

    if (digitValidator((key))) {
      overrideCharAtPosition(this.input, cursorPosition, key);
      this.handelRightArrow(cursorPosition);
    }
  }

  handelBackSpace(cursorPosition) {
    let nextCurPos = this.getTextLeftCurPosition(cursorPosition);

    if (nextCurPos != undefined) {
      overrideCharAtPosition(this.input, nextCurPos, '_');
      this.input.setSelectionRange(nextCurPos, nextCurPos);
    }
  }

  handelDelete(cursorPosition) {
    const nextCurPos = this.getNextRightCurPosition(cursorPosition),
      validPosition = (cursorPosition != undefined &&
        cursorPosition < this.input.value.length &&
        this.input.value[cursorPosition] !== '_'),
      nextValidPosition = (nextCurPos != undefined &&
        this.input.value[cursorPosition] === '_');

    if (validPosition) {
      overrideCharAtPosition(this.input, cursorPosition, '_');
      this.input.setSelectionRange(cursorPosition, cursorPosition);
    } else if (nextValidPosition) {
      overrideCharAtPosition(this.input, nextCurPos, '_');
      this.input.setSelectionRange(nextCurPos, nextCurPos);

    }
  }

  handelLeftArrow(cursorPosition) {
    let nextCurPos = this.getTextLeftCurPosition(cursorPosition);

    if (nextCurPos != undefined) this.input.setSelectionRange(nextCurPos, nextCurPos);
  }

  handelRightArrow(cursorPosition) {
    let nextCurPos = this.getNextRightCurPosition(cursorPosition);

    if (nextCurPos != undefined) this.input.setSelectionRange(nextCurPos, nextCurPos);
  }

  private getNextRightCurPosition(cursorPosition) {
    let nextCurPos: number;
    this.input.value
      .slice(cursorPosition + 1)
      .split('')
      .reduce((index, char) => {
        if (!nextCurPos && !SPECIAL_CHARACTERS.includes(char)) nextCurPos = cursorPosition + index;
        return index += +1;
      }, 1);
    return nextCurPos;
  }

  private getTextLeftCurPosition(cursorPosition): number {
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
    return nextCurPos;
  }

  buildPlaceHolder(): string {
    const chars = this.mask.split('');
    return chars.reduce((result, char) => { // result = accumulator which wil be passed to  each iteration
      return result += SPECIAL_CHARACTERS.includes(char) ? char : '_';
    }, ''); // empty string is the starting point  string
  }
}
