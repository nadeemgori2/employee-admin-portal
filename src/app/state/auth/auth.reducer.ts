import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  username: string | null;
  role: string | null;
  token: string | null;
  error: string | null;
}

export const initialState: AuthState = {
  username: null,
  role: null,
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { username, role, token }) => ({
    ...state,
    username,
    role,
    token,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    username: null,
    role: null,
    token: null,
  })),
  on(AuthActions.logout, () => initialState)
);
