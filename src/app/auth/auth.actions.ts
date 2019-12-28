import {createAction, props} from '@ngrx/store';
import {User} from './model/user.model';

/**
 * the props argument contain a payload which can be accessed by the reducer.
 * this can be typed with "USER"
 */
export const login = createAction(
    "[Login Page] User Login",
    props<{user: User}>()
);



export const logout = createAction(
  "[Top Menu] Logout"
);
