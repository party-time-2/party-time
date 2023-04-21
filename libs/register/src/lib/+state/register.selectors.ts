import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  REGISTER_FEATURE_KEY,
  RegisterStateInterface,
} from './register.reducer';

export const selectRegisterState =
  createFeatureSelector<RegisterStateInterface>(REGISTER_FEATURE_KEY);

export const selectedRegisterd = createSelector(
  selectRegisterState,
  (state) => state.registerd
);

export const selectedLoading = createSelector(
  selectRegisterState,
  (state) => state.loading
);

export const selectedError = createSelector(
  selectRegisterState,
  (state) => state.error
);

export const selectedErrorStatus = createSelector(
  selectRegisterState,
  (state) => state.error?.status
);

export const selectedAccountRegisterDTO = createSelector(
  selectRegisterState,
  (state) => state.accountRegisterDTO
);

export const selectedAccountRegisterDTOName = createSelector(
  selectRegisterState,
  (state) => state.accountRegisterDTO?.name
);

export const selectedAccountRegisterDTOEmail = createSelector(
  selectRegisterState,
  (state) => state.accountRegisterDTO?.email
);
