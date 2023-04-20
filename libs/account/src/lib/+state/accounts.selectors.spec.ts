import { AccountsEntity } from './accounts.models';
import {
  accountsAdapter,
  AccountsPartialState,
  initialAccountsState,
} from './accounts.reducer';
import * as AccountsSelectors from './accounts.selectors';

describe('Accounts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAccountsId = (it: AccountsEntity) => it.id;
  const createAccountsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AccountsEntity);

  let state: AccountsPartialState;

  beforeEach(() => {
    state = {
      accounts: accountsAdapter.setAll(
        [
          createAccountsEntity('PRODUCT-AAA'),
          createAccountsEntity('PRODUCT-BBB'),
          createAccountsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialAccountsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Accounts Selectors', () => {
    it('selectAllAccounts() should return the list of Accounts', () => {
      const results = AccountsSelectors.selectAllAccounts(state);
      const selId = getAccountsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = AccountsSelectors.selectEntity(state) as AccountsEntity;
      const selId = getAccountsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectAccountsLoaded() should return the current "loaded" status', () => {
      const result = AccountsSelectors.selectAccountsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectAccountsError() should return the current "error" state', () => {
      const result = AccountsSelectors.selectAccountsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
