//implements F011
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CHANGE_FEATURE_KEY, ChangeStateInterface } from './change.reducer';

export const selectChangeState =
  createFeatureSelector<ChangeStateInterface>(CHANGE_FEATURE_KEY);

export const selectChangeRequestDTO = createSelector(
  selectChangeState,
  (state: ChangeStateInterface) => state.changeRequestDTO
);

export const selectChangeIsLoading = createSelector(
  selectChangeState,
  (state: ChangeStateInterface) => state.isLoading
);

export const selectChangeError = createSelector(
  selectChangeState,
  (state: ChangeStateInterface) => state.error
);
