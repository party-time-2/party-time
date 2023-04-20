import { Route } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromAccounts from './+state/accounts.reducer';
import { AccountsEffects } from './+state/accounts.effects';

export const accountRoutes: Route[] = [
  {
    path: '',
    component: AccountComponent,
    providers: [
      provideState(
        fromAccounts.ACCOUNTS_FEATURE_KEY,
        fromAccounts.accountsReducer
      ),
      provideEffects(AccountsEffects),
    ],
  },
];
