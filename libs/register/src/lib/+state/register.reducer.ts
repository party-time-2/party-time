//implements F010
import { createReducer, on, Action } from '@ngrx/store';

import * as RegisterActions from './register.actions';
import { AccountDTO, AccountRegisterDTO, ApiError } from '@party-time/models';

export const REGISTER_FEATURE_KEY = 'register';

export interface RegisterStateInterface {
  registerd?: boolean; // has the Register Api request been completed
  accountRegisterDTO?: AccountRegisterDTO; // last known value (if any)
  accountDTO?: AccountDTO; // last known value (if any)
  loading: boolean; // is this request loading
  error?: ApiError | null; // last known error (if any)
}

export const initialRegisterState: RegisterStateInterface = {
  registerd: undefined,
  loading: false,
  accountRegisterDTO: undefined,
  accountDTO: undefined,
  error: null,
};

const reducer = createReducer(
  initialRegisterState,
  on(RegisterActions.initRegisterPage, (state) => ({
    ...state,
  })),
  on(RegisterActions.registeredSuccess, (state, { accountDTO }) => ({
    ...state,
    loading: false,
    registerd: true,
    accountDTO,
  })),
  on(RegisterActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    registerd: false,
    error,
  })),
  on(RegisterActions.register, (state, { accountRegisterDTO }) => ({
    ...state,
    loading: true,
    accountRegisterDTO,
  }))
);

export function registerReducer(
  state: RegisterStateInterface | undefined,
  action: Action
) {
  return reducer(state, action);
}
