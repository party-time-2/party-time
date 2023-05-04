//implements F013
import { createAction, props } from '@ngrx/store';
import { ApiError, ChangePasswordDTO } from '@party-time/models';

export const initChangePage = createAction('[Auth Page] Init');

export const loadChangePassword = createAction(
  '[Auth/API] Load Change Password',
  props<{ changePasswordDTO: ChangePasswordDTO }>()
);

export const changePasswordSuccess = createAction(
  '[Auth/API] Change Password Success'
);

export const changePasswordFailure = createAction(
  '[Auth/API] Change Password Failure',
  props<{ error: ApiError }>()
);
