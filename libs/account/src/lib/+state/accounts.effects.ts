import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as AccountsActions from './accounts.actions';
import * as AccountsFeature from './accounts.reducer';

@Injectable()
export class AccountsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.initAccounts),
      switchMap(() =>
        of(AccountsActions.loadAccountsSuccess({ accounts: [] }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(AccountsActions.loadAccountsFailure({ error }));
      })
    )
  );
}
