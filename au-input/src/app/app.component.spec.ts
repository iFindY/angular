import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AuFaInputComponent } from './lib/au-fa-input/au-fa-input.component';
import { InputRefDirective } from './lib/common/input-ref.directive';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let component: AppComponent,
    fixture: ComponentFixture<AppComponent>,
    el: DebugElement,
    emailField: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, AuFaInputComponent, InputRefDirective
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    el = fixture.debugElement;
    emailField = el.query(By.css('#email-filed'));
    fixture.detectChanges()
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should create email field', async(() => {
    expect(emailField).toBeTruthy();
  }));

  it('should include email icon input', async(() => {
    expect(emailField.query(By.css('i.icon.fa.fa-envelope'))).toBeTruthy();
  }));
});
