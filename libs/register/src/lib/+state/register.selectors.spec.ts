import { RegisterEntity } from './register.models';
import {
  registerAdapter,
  RegisterPartialState,
  initialRegisterState,
} from './register.reducer';
import * as RegisterSelectors from './register.selectors';

describe('Register Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRegisterId = (it: RegisterEntity) => it.id;
  const createRegisterEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RegisterEntity);

  let state: RegisterPartialState;

  beforeEach(() => {
    state = {
      register: registerAdapter.setAll(
        [
          createRegisterEntity('PRODUCT-AAA'),
          createRegisterEntity('PRODUCT-BBB'),
          createRegisterEntity('PRODUCT-CCC'),
        ],
        {
          ...initialRegisterState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Register Selectors', () => {
    it('selectAllRegister() should return the list of Register', () => {
      const results = RegisterSelectors.selectAllRegister(state);
      const selId = getRegisterId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = RegisterSelectors.selectEntity(state) as RegisterEntity;
      const selId = getRegisterId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectRegisterLoaded() should return the current "loaded" status', () => {
      const result = RegisterSelectors.selectRegisterLoaded(state);

      expect(result).toBe(true);
    });

    it('selectRegisterError() should return the current "error" state', () => {
      const result = RegisterSelectors.selectRegisterError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
