import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {loadAllCourses} from './course.actions';
import {areCoursesLoaded} from './courses.selectors';


@Injectable()
export class CoursesResolver implements Resolve<any> {

    loading = false;

    constructor(private store: Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {

        return this.store
            .pipe(
                select(areCoursesLoaded), // select custom coursesLoaded state 
                tap(coursesLoaded => { // at this point courses are not loaded 
                    if (!this.loading && !coursesLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadAllCourses());
                    }
                }),
                filter(coursesLoaded => coursesLoaded), // only if courses are loaded, terminate observable and show page 
                first(), // after first value is emitted the observable completes (stop listening on new values) and operation can be finished.
                finalize(() => this.loading = false) // on success or error we set the flag in both cases  
            );

    }

}
