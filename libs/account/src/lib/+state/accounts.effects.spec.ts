import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as AccountsActions from './accounts.actions';
import { AccountsEffects } from './accounts.effects';

describe('AccountsEffects', () => {
  let actions: Observable<Action>;
  let effects: AccountsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AccountsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AccountsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AccountsActions.initAccounts() });

      const expected = hot('-a-|', {
        a: AccountsActions.loadAccountsSuccess({ accounts: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
