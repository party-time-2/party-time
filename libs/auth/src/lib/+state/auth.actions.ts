//implements F011
import { createAction, props } from '@ngrx/store';
import {
  AccountLoginDTO,
  ApiError,
  LoginRequestDTO,
  LoginResponseDTO,
} from '@party-time/models';

export const initAuthPage = createAction('[Auth Page] Init');

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ loginResponseDTO: LoginResponseDTO }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: ApiError }>()
);

export const loadAuth = createAction('[Auth/API] Load Auth');

export const login = createAction(
  '[Auth/API] Login',
  props<{ loginRequestDTO: LoginRequestDTO }>()
);

export const decodeTokenSuccsess = createAction(
  '[Auth/API] Token Decoded',
  props<{ accountLoginDTO: AccountLoginDTO }>()
);

export const resetError = createAction('[Auth/API] Reset Error');

export const logout = createAction('[Auth/API] Logout');

export const logoutSuccess = createAction('[Auth/API] Logout Success');
