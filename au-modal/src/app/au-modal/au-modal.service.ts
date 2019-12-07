import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AuModalService {
  private subject = new Subject(); // provides publish subscribe API can emit events

  close$: Observable<any> = this.subject.asObservable(); // can consume events

  constructor() {
  }

  close() {
    this.subject.next();
  }
}
