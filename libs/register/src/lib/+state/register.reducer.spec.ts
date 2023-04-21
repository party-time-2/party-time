import { Action } from '@ngrx/store';

import * as RegisterActions from './register.actions';
import { RegisterEntity } from './register.models';
import {
  RegisterState,
  initialRegisterState,
  registerReducer,
} from './register.reducer';

describe('Register Reducer', () => {
  const createRegisterEntity = (id: string, name = ''): RegisterEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Register actions', () => {
    it('loadRegisterSuccess should return the list of known Register', () => {
      const register = [
        createRegisterEntity('PRODUCT-AAA'),
        createRegisterEntity('PRODUCT-zzz'),
      ];
      const action = RegisterActions.loadRegisterSuccess({ register });

      const result: RegisterState = registerReducer(
        initialRegisterState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = registerReducer(initialRegisterState, action);

      expect(result).toBe(initialRegisterState);
    });
  });
});
