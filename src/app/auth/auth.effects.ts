import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthActions} from './action-types';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable()
export class AuthEffects {

  /**
   * catch login action dispatched by the global actions$ observable
   * which is injected in the constructor.
   * And safe the login data in the local storage as a side effect with the "tap" operator.
   * An effect must emit an Action which in this case is dropped by the "dispatch:false" configuration.
   */
    login$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.login),
                tap(action => localStorage.setItem('user',
                        JSON.stringify(action.user))
                )
            )
    ,
    {dispatch: false});

    logout$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.logout),
                tap(action => {
                    localStorage.removeItem('user');
                    this.router.navigateByUrl('/login');
                })
            )
    , {dispatch: false});


    constructor(private actions$: Actions,
                private router: Router) {

    }

}
