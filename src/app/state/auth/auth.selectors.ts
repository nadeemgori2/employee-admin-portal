import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.username
);
export const selectRole = createSelector(
  selectAuthState,
  (state) => state.role
);
export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => !!state.token
);
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
