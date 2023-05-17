//implements F013
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ApiError, ChangePasswordDTO } from '@party-time/models';
import { ChangeService } from '../../../../../account/src/lib/services/change.service';
import { Observable, exhaustMap, tap } from 'rxjs';

export interface ChangeStateInterface {
  changePasswordDTO?: ChangePasswordDTO;
  isLoading: boolean;
  error: ApiError | null;
  isPasswordChanged: boolean;
}

export const initialState: ChangeStateInterface = {
  changePasswordDTO: undefined,
  isLoading: false,
  error: null,
  isPasswordChanged: false,
};

@Injectable()
export class ChangeStore extends ComponentStore<ChangeStateInterface> {
  private isLoading$ = this.select((state) => state.isLoading);
  private isPasswordChanged$ = this.select((state) => state.isPasswordChanged);
  private error$ = this.select((state) => state.error);
  private changePasswordDTO$ = this.select((state) => state.changePasswordDTO);

  vm$ = this.select({
    isLoading: this.isLoading$,
    isPasswordChanged: this.isPasswordChanged$,
    error: this.error$,
    changePasswordDTO: this.changePasswordDTO$,
  });

  setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  setError = this.updater((state, error: ApiError) => ({
    ...state,
    error,
  }));

  setIsPasswordChanged = this.updater((state, isPasswordChanged: boolean) => ({
    ...state,
    isPasswordChanged,
  }));

  setChangePasswordDTO = this.updater(
    (state, changePasswordDTO: ChangePasswordDTO) => ({
      ...state,
      changePasswordDTO,
    })
  );

  getPasswordChanged = this.effect(
    (changePasswordDTO$: Observable<ChangePasswordDTO>) =>
      changePasswordDTO$.pipe(
        tap(() => this.setIsLoading(true)),
        exhaustMap((changePasswordDTO) =>
          this.changeService.changePassword(changePasswordDTO).pipe(
            tapResponse(
              () => {
                this.setIsPasswordChanged(true);
                this.setIsLoading(false);
              },
              (error: ApiError) => {
                this.setError(error);
                this.setIsLoading(false);
              }
            )
          )
        )
      )
  );

  constructor(private changeService: ChangeService) {
    super(initialState);
  }
}
