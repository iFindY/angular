import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CourseActions} from './action-types';
import {CoursesHttpService} from './services/courses-http.service';
import {concatMap, map} from 'rxjs/operators';
import {allCoursesLoaded} from './course.actions';


@Injectable()
export class CoursesEffects {

    loadCourses$ = createEffect(  // effects have to dispatch an action
        () => this.actions$ 
            .pipe(
                ofType(CourseActions.loadAllCourses),
                concatMap(action => // concatMap send only one request at a time 
                    this.coursesHttpService.findAllCourses()),
                map(courses => allCoursesLoaded({courses})) // this effect have to return an action 

            )
    );


    saveCourse$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(CourseActions.courseUpdated),
                concatMap(action => this.coursesHttpService.saveCourse( // only perform this operation if current operation finished 
                    action.update.id,
                    action.update.changes
                ))
            ),
        {dispatch: false} // cancel dispatching of an expected action 
    );

    constructor(private actions$: Actions,
                private coursesHttpService: CoursesHttpService) {

    }

}
