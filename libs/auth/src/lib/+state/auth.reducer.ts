//implements F011
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {
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
}

export const initialState: AuthStateInterface = {
  isAuthenticated: undefined,
  loading: false,
  loginRequestDTO: undefined,
  loginResponseDTO: undefined,
  error: null,
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
  }))
);

export function authReducer(
  state: AuthStateInterface | undefined,
  action: Action
) {
  return reducer(state, action);
}
