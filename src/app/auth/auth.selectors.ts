import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './reducers';

/**
 * initial selection of a state by name
 */
export const selectAuthState =
    createFeatureSelector<AuthState>("auth");
/**
 * sub selector which access nested properties.
 * return an arbitrary value based on state.
 */
export const isLoggedIn = createSelector(
    selectAuthState,
    auth =>  !!auth.user

);


export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
);
