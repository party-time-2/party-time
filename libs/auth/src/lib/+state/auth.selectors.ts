//implements F011
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthStateInterface } from './auth.reducer';

export const selectAuthState =
  createFeatureSelector<AuthStateInterface>(AUTH_FEATURE_KEY);

export const selectedIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectedLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectedError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectedErrorStatus = createSelector(
  selectAuthState,
  (state) => state.error?.status
);

export const selectedLoginRequestDTOEmail = createSelector(
  selectAuthState,
  (state) => state.loginRequestDTO?.email
);

export const selectLoginResponseDTO = createSelector(
  selectAuthState,
  (state) => state.loginResponseDTO
);

export const selectLoginResponseDTOToken = createSelector(
  selectAuthState,
  (state) => state.loginResponseDTO?.token
);
