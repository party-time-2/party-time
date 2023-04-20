import { createAction, props } from '@ngrx/store';
import { AccountsEntity } from './accounts.models';

export const initAccounts = createAction('[Accounts Page] Init');

export const loadAccountsSuccess = createAction(
  '[Accounts/API] Load Accounts Success',
  props<{ accounts: AccountsEntity[] }>()
);

export const loadAccountsFailure = createAction(
  '[Accounts/API] Load Accounts Failure',
  props<{ error: any }>()
);
