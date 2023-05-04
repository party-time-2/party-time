//implements F011
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {
  AccountLoginDTO,
  ApiError,
  LoginRequestDTO,
  LoginResponseDTO,
} from '@party-time/models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthStateInterface {
  isAuthenticated?: boolean; // has the Auth Api request been completed
  loginRequestDTO?: LoginRequestDTO;
  loginResponseDTO?: LoginResponseDTO;
  loading: boolean; // is this request loading
  error?: ApiError | null; // last known error (if any)
  accountLoginDTO?: AccountLoginDTO;
}

export const initialState: AuthStateInterface = {
  isAuthenticated: undefined,
  loading: false,
  loginRequestDTO: undefined,
  loginResponseDTO: undefined,
  error: null,
  accountLoginDTO: undefined,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.initAuthPage, (state) => ({
    ...state,
  })),
  on(AuthActions.loginSuccess, (state, { loginResponseDTO }) => ({
    ...state,
    loading: false,
    isAuthenticated: true,
    loginResponseDTO,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    error,
  })),
  on(AuthActions.login, (state, { loginRequestDTO }) => ({
    ...state,
    loading: true,
    loginRequestDTO,
  })),
  on(AuthActions.loadAuth, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.decodeTokenSuccsess, (state, { accountLoginDTO }) => ({
    ...state,
    loading: false,
    accountLoginDTO,
  })),
  on(AuthActions.resetError, (state) => ({
    ...state,
    error: null,
  }))
);

export function authReducer(
  state: AuthStateInterface | undefined,
  action: Action
) {
  return reducer(state, action);
}
