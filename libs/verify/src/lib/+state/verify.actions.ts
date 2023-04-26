//implements F014
import { createAction, props } from '@ngrx/store';
import { ApiError } from '@party-time/models';

export const initVerifyPage = createAction('[Verify Page] Init');

export const verify = createAction(
  '[Verify/API] Verify',
  props<{ token: string }>()
);

export const verifiedSuccess = createAction(
  '[Verify/API] Load Verifys Success'
);

export const verifiedFailure = createAction(
  '[Verify/API] Load Verifys Failure',
  props<{ error: ApiError }>()
);
