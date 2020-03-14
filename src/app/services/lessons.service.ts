import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lesson } from '../model/lesson';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { rxSubscriber } from 'rxjs/internal-compatibility';
import { logger } from 'codelyzer/util/logger';
import * as _ from 'lodash';

@Injectable()
export class LessonsService {

  constructor(private http: HttpClient) {
  }

  /** JSON hijacking array's can be overridden and getting data
   * the same-origin policy does not apply to script tags
   * any does allow access not present field
   * type safety given through method return type
   */
  loadAllLessons(): Observable<Lesson[]> {

    // convert returned object to array: for security
    return this.http.get<any>('/api/lessons').pipe(map(res => _.values(res.lessons)));
  }

  findLessonById(id: number) {
    return this.http.get<Lesson>('/api/lessons/' + id);
  }

}

