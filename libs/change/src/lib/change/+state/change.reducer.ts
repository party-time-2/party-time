//implements F011
import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from '@party-time/models';
import * as ChangeActions from './change.actions';

export const CHANGE_FEATURE_KEY = 'change';

export interface ChangeStateInterface {
  changeRequestDTO: null;
  isLoading: boolean;
  error: ApiError | null;
  isPasswordChanged: boolean;
}

export const initialState: ChangeStateInterface = {
  changeRequestDTO: null,
  isLoading: false,
  error: null,
  isPasswordChanged: false,
};

export const reducer = createReducer(
  initialState,
  on(ChangeActions.initChangePage, (state) => ({
    ...state,
  })),
  on(ChangeActions.loadChangePassword, (state, { changePasswordDTO }) => ({
    ...state,
    isLoading: true,
    changePasswordDTO,
  })),
  on(ChangeActions.changePasswordSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(ChangeActions.changePasswordFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);

export function changeReducer(
  state: ChangeStateInterface | undefined,
  action: Action
) {
  return reducer(state, action);
}
