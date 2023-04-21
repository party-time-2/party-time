import { createAction, props } from '@ngrx/store';
import { AccountDTO, AccountRegisterDTO, ApiError } from '@party-time/models';

export const initRegisterPage = createAction('[Register Page] Init');

export const registeredLoading = createAction(
  '[Register/API] Register Loading'
);

export const registeredLoaded = createAction('[Register/API] Register Loaded');

export const registeredSuccess = createAction(
  '[Register/API] Register Success',
  props<{ accountDTO: AccountDTO }>()
);

export const registerFailure = createAction(
  '[Register/API] Register Failure',
  props<{ error: ApiError }>()
);

export const register = createAction(
  '[Register/API] Register',
  props<{ accountRegisterDTO: AccountRegisterDTO }>()
);
