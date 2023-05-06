//implements F010
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AccountDTO, AccountRegisterDTO, ApiError } from '@party-time/models';
import { RegisterService } from '../services/register.service';
import { tap, exhaustMap, Observable } from 'rxjs';

export interface RegisterStateInterface {
  isRegisterd?: boolean; // has the Register Api request been completed
  accountRegisterDTO?: AccountRegisterDTO; // last known value (if any)
  accountDTO?: AccountDTO; // last known value (if any)
  loading: boolean; // is this request loading
  error?: ApiError | null; // last known error (if any)
}

export const initialRegisterState: RegisterStateInterface = {
  isRegisterd: false,
  loading: false,
  accountRegisterDTO: undefined,
  accountDTO: undefined,
  error: null,
};

@Injectable()
export class RegisterStore extends ComponentStore<RegisterStateInterface> {
  private isLoading$ = this.select((state) => state.loading);
  private isRegisterd$ = this.select((state) => state.isRegisterd);
  private accountRegisterDTO$ = this.select(
    (state) => state.accountRegisterDTO
  );
  private accountDTO$ = this.select((state) => state.accountDTO);
  private error$ = this.select((state) => state.error);

  vm$ = this.select({
    isLoading: this.isLoading$,
    isRegisterd: this.isRegisterd$,
    accountRegisterDTO: this.accountRegisterDTO$,
    accountDTO: this.accountDTO$,
    error: this.error$,
  });

  setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    loading: isLoading,
  }));

  setError = this.updater((state, error: ApiError) => ({
    ...state,
    error,
  }));

  setIsRegisterd = this.updater((state, isRegisterd: boolean) => ({
    ...state,
    isRegisterd,
  }));

  setAccountRegisterDTO = this.updater(
    (state, accountRegisterDTO: AccountRegisterDTO) => ({
      ...state,
      accountRegisterDTO,
    })
  );

  setAccountDTO = this.updater((state, accountDTO: AccountDTO) => ({
    ...state,
    accountDTO,
  }));

  getAccountDTO = this.effect(
    (accountRegisterDTO$: Observable<AccountRegisterDTO>) =>
      accountRegisterDTO$.pipe(
        tap(() => this.setIsLoading(true)),
        exhaustMap((accountRegisterDTO) =>
          this.registerService.registerAccount(accountRegisterDTO).pipe(
            tapResponse(
              (accountDTO: AccountDTO) => {
                this.setAccountDTO(accountDTO);
                this.setIsRegisterd(true);
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

  constructor(private registerService: RegisterService) {
    super(initialRegisterState);
  }
}
