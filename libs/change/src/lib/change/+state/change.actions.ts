//implements F013
import { createAction, props } from '@ngrx/store';
import { ApiError, ChangePasswordDTO } from '@party-time/models';

export const initChangePage = createAction('[Change Page] Init');

export const loadChangePassword = createAction(
  '[Change/API] Load Change Password',
  props<{ changePasswordDTO: ChangePasswordDTO }>()
);

export const changePasswordSuccess = createAction(
  '[Change/API] Change Password Success'
);

export const changePasswordFailure = createAction(
  '[Change/API] Change Password Failure',
  props<{ error: ApiError }>()
);
