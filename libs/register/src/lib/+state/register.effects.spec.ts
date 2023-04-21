import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as RegisterActions from './register.actions';
import { RegisterEffects } from './register.effects';

describe('RegisterEffects', () => {
  let actions: Observable<Action>;
  let effects: RegisterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        RegisterEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(RegisterEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: RegisterActions.initRegister() });

      const expected = hot('-a-|', {
        a: RegisterActions.loadRegisterSuccess({ register: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
