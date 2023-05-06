//implements F011
import {
  AccountLoginDTO,
  ApiError,
  LoginRequestDTO,
  LoginResponseDTO,
} from '@party-time/models';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AuthService } from '../services/auth.service';
import { Observable, exhaustMap, tap } from 'rxjs';

export interface AuthStateInterface {
  isAuthenticated?: boolean; // has the Auth Api request been completed
  loginRequestDTO?: LoginRequestDTO;
  loginResponseDTO?: LoginResponseDTO;
  accountLoginDTO?: AccountLoginDTO;
  loading: boolean; // is this request loading
  error?: ApiError | null; // last known error (if any)
}

export const initialState: AuthStateInterface = {
  isAuthenticated: false,
  loading: false,
  loginRequestDTO: undefined,
  loginResponseDTO: undefined,
  error: undefined,
  accountLoginDTO: undefined,
};

@Injectable({ providedIn: 'root' })
export class AuthStore extends ComponentStore<AuthStateInterface> {
  private isLoading$ = this.select((state) => state.loading);
  private isAuthenticated$ = this.select((state) => state.isAuthenticated);
  private loginRequestDTO$ = this.select((state) => state.loginRequestDTO);
  private loginResponseDTO$ = this.select((state) => state.loginResponseDTO);
  private error$ = this.select((state) => state.error);
  private accountLoginDTO$ = this.select((state) => state.accountLoginDTO);

  vm$ = this.select({
    isLoading: this.isLoading$,
    isAuthenticated: this.isAuthenticated$,
    loginRequestDTO: this.loginRequestDTO$,
    loginResponseDTO: this.loginResponseDTO$,
    error: this.error$,
    accountLoginDTO: this.accountLoginDTO$,
  });

  setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    loading: isLoading,
  }));

  setError = this.updater((state, error: ApiError) => ({
    ...state,
    error,
  }));

  setLoginRequestDTO = this.updater(
    (state, loginResponseDTO: LoginResponseDTO) => ({
      ...state,
      loginResponseDTO,
    })
  );

  setLoginResponseDTO = this.updater(
    (state, loginResponseDTO: LoginResponseDTO) => ({
      ...state,
      loginResponseDTO,
    })
  );

  setAccountLoginDTO = this.updater(
    (state, accountLoginDTO: AccountLoginDTO) => ({
      ...state,
      accountLoginDTO,
    })
  );

  getAccountLoginDTO = this.effect(
    (loginRequestDTO$: Observable<LoginRequestDTO>) =>
      loginRequestDTO$.pipe(
        tap(() => this.setIsLoading(true)),
        exhaustMap((loginRequestDTO) =>
          this.authService.login(loginRequestDTO).pipe(
            tapResponse(
              (loginResponseDTO: LoginResponseDTO) => {
                this.setLoginResponseDTO(loginResponseDTO);
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

  constructor(private authService: AuthService) {
    super(initialState);
  }
}
