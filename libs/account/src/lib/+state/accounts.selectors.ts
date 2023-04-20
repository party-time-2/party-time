import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ACCOUNTS_FEATURE_KEY,
  AccountsState,
  accountsAdapter,
} from './accounts.reducer';

// Lookup the 'Accounts' feature state managed by NgRx
export const selectAccountsState =
  createFeatureSelector<AccountsState>(ACCOUNTS_FEATURE_KEY);

const { selectAll, selectEntities } = accountsAdapter.getSelectors();

export const selectAccountsLoaded = createSelector(
  selectAccountsState,
  (state: AccountsState) => state.loaded
);

export const selectAccountsError = createSelector(
  selectAccountsState,
  (state: AccountsState) => state.error
);

export const selectAllAccounts = createSelector(
  selectAccountsState,
  (state: AccountsState) => selectAll(state)
);

export const selectAccountsEntities = createSelector(
  selectAccountsState,
  (state: AccountsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectAccountsState,
  (state: AccountsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectAccountsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
