import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VERIFY_FEATURE_KEY, VerifyStateInterface } from './verify.reducer';

export const selectVerifyState =
  createFeatureSelector<VerifyStateInterface>(VERIFY_FEATURE_KEY);

export const selectedVerified = createSelector(
  selectVerifyState,
  (state) => state.verified
);

export const selectedLoading = createSelector(
  selectVerifyState,
  (state) => state.loading
);

export const selectedError = createSelector(
  selectVerifyState,
  (state) => state.error
);

export const selectedToken = createSelector(
  selectVerifyState,
  (state) => state.token
);
