//implements F015
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ApiError, LoginResponseDTO } from '@party-time/models';
import { Observable, exhaustMap, tap } from 'rxjs';
import { DeleteService } from '../../services/delete.service';

export interface DeleteStateInterface {
  passwordDTO?: LoginResponseDTO;
  isLoading: boolean;
  error: ApiError | null;
  isDeleted: boolean;
}

export const initialState: DeleteStateInterface = {
  passwordDTO: undefined,
  isLoading: false,
  error: null,
  isDeleted: false,
};

@Injectable()
export class DeleteStore extends ComponentStore<DeleteStateInterface> {
  private isLoading$ = this.select((state) => state.isLoading);
  private isDeleted$ = this.select((state) => state.isDeleted);
  private passwordDTO$ = this.select((state) => state.passwordDTO);
  private error$ = this.select((state) => state.error);

  vm$ = this.select({
    isLoading: this.isLoading$,
    error: this.error$,
    passwordDTO: this.passwordDTO$,
    isDeleted: this.isDeleted$,
  });

  setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  setError = this.updater((state, error: ApiError) => ({
    ...state,
    error,
    isLoading: false,
    passwordDTO: undefined,
  }));

  setIsDeleted = this.updater((state) => ({
    ...state,
    isLoading: false,
    isDeleted: true,
    passwordDTO: undefined,
  }));

  setPasswordDTO = this.updater((state, passwordDTO: LoginResponseDTO) => ({
    ...state,
    passwordDTO,
  }));

  getAccountDeleted = this.effect((passwordDTO$: Observable<string>) =>
    passwordDTO$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((currentPassword) =>
        this.deleteService.deleteAccount(currentPassword).pipe(
          tapResponse(
            () => {
              this.setIsDeleted();
            },
            (error: ApiError) => {
              this.setError(error);
            }
          )
        )
      )
    )
  );

  constructor(private deleteService: DeleteService) {
    super(initialState);
  }
}
