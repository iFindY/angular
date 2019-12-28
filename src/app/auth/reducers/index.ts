import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector, createReducer,
    createSelector,
    MetaReducer, on
} from '@ngrx/store';
import {User} from '../model/user.model';
import {AuthActions} from '../action-types';

/**
 * reducer defines application state object.
 * this interface definition the auth sub state with only one property => user
 */
export interface AuthState { //
    user: User
}

export const initialAuthState: AuthState = {
    user: undefined
};

/**
 * only one reducer per (sub)state with different reduce function.
 * those depends on the caught action type.
 * the reducer need an initial state which is null in this case.
 * The reduce functions takes the current state of "AuthState" and the "action" with optional payload.
 * The function returns a new state which implements the "AuthState",
 * in this case a simple user state.
 * The state name is defined int the module under StoreModule.forFeature('auth', authReducer).
 */
export const authReducer = createReducer<AuthState>(

    initialAuthState,

    on(AuthActions.login, (state, action) => {
        return {
            user: action.user
        }
    }),

    on(AuthActions.logout, (state, action) => {
        return {
            user: undefined
        }
    })



);

