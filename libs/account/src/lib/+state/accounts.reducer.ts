import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AccountsActions from './accounts.actions';
import { AccountsEntity } from './accounts.models';

export const ACCOUNTS_FEATURE_KEY = 'accounts';

export interface AccountsState extends EntityState<AccountsEntity> {
  selectedId?: string | number; // which Accounts record has been selected
  loaded: boolean; // has the Accounts list been loaded
  error?: string | null; // last known error (if any)
}

export interface AccountsPartialState {
  readonly [ACCOUNTS_FEATURE_KEY]: AccountsState;
}

export const accountsAdapter: EntityAdapter<AccountsEntity> =
  createEntityAdapter<AccountsEntity>();

export const initialAccountsState: AccountsState =
  accountsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialAccountsState,
  on(AccountsActions.initAccounts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AccountsActions.loadAccountsSuccess, (state, { accounts }) =>
    accountsAdapter.setAll(accounts, { ...state, loaded: true })
  ),
  on(AccountsActions.loadAccountsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function accountsReducer(
  state: AccountsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
