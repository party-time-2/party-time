import { createReducer, on, Action } from '@ngrx/store';

import * as RegisterActions from './register.actions';
import { AccountDTO, ApiError } from '@party-time/models';

export const REGISTER_FEATURE_KEY = 'register';

export interface RegisterStateInterface {
  registerd?: boolean; // has the Register Api request been completed
  accountRegisterDTO?: AccountDTO; // last known value (if any)
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
  on(RegisterActions.registeredLoading, (state) => ({
    ...state,
    loading: true,
  })),
  on(RegisterActions.registeredLoaded, (state) => ({
    ...state,
    loading: false,
  })),
  on(RegisterActions.registeredSuccess, (state, { accountDTO }) => ({
    ...state,
    loading: false,
    accountDTO,
    registerd: true,
  })),
  on(RegisterActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    registerd: false,
    error,
  }))
);

export function registerReducer(
  state: RegisterStateInterface | undefined,
  action: Action
) {
  return reducer(state, action);
}
