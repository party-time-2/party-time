//implements F014
import { Action, createReducer, on } from '@ngrx/store';
import * as VerifyActions from './verify.actions';
import { ApiError } from '@party-time/models';

export const VERIFY_FEATURE_KEY = 'verify';

export interface VerifyStateInterface {
  token: string | null;
  loading: boolean;
  verified: boolean;
  error: ApiError | null;
}

export const initialVerifyState: VerifyStateInterface = {
  token: null,
  loading: false,
  verified: false,
  error: null,
};

export const reducer = createReducer(
  initialVerifyState,

  on(VerifyActions.initVerifyPage, (state) => state),
  on(VerifyActions.verify, (state, { token }) => ({
    ...state,
    token,
    loading: true,
  })),
  on(VerifyActions.verifiedSuccess, (state) => ({
    ...state,
    loading: false,
    verified: true,
  })),
  on(VerifyActions.verifiedFailure, (state, { error }) => ({
    ...state,
    loading: false,
    verified: false,
    error,
  }))
);

export function verifyReducer(
  state: VerifyStateInterface | undefined,
  action: Action
): VerifyStateInterface {
  return reducer(state, action);
}
