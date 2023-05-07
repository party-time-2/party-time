//implements F011
import {
  AccountLoginDTO,
  ApiError,
  LoginRequestDTO,
  LoginResponseDTO,
} from '@party-time/models';
import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AuthService } from '../services/auth.service';
import { Observable, exhaustMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { Store } from '@ngrx/store';
import { routerRequestAction } from '@ngrx/router-store';

export interface AuthStateInterface {
  isAuthenticated: boolean; // has the Auth Api request been completed
  loginRequestDTO?: LoginRequestDTO;
  loginResponseDTO?: LoginResponseDTO;
  accountLoginDTO?: AccountLoginDTO;
  returnUrl?: string[]; // where do you want to redirect the user to
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
  returnUrl: undefined,
};

@Injectable({ providedIn: 'root' })
export class AuthStore extends ComponentStore<AuthStateInterface> {
  private isLoading$ = this.select((state) => state.loading);
  private isAuthenticated$ = this.select((state) => state.isAuthenticated);
  private loginRequestDTO$ = this.select((state) => state.loginRequestDTO);
  private loginResponseDTO$ = this.select((state) => state.loginResponseDTO);
  private error$ = this.select((state) => state.error);
  private accountLoginDTO$ = this.select((state) => state.accountLoginDTO);
  private returnUrl$ = this.select((state) => state.returnUrl);

  vm$ = this.select({
    isLoading: this.isLoading$,
    isAuthenticated: this.isAuthenticated$,
    loginRequestDTO: this.loginRequestDTO$,
    loginResponseDTO: this.loginResponseDTO$,
    error: this.error$,
    returnUrl: this.returnUrl$,
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

  setIsAuthenticated = this.updater((state, isAuthenticated: boolean) => ({
    ...state,
    isAuthenticated,
  }));

  setAccountLoginDTO = this.updater(
    (state, accountLoginDTO: AccountLoginDTO) => ({
      ...state,
      accountLoginDTO,
    })
  );

  setReturnUrl = this.updater((state, returnUrl: string[]) => ({
    ...state,
    returnUrl,
  }));

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
                this.setIsAuthenticated(true);
                this.returnToUrl();
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

  returnToUrl() {
    this.returnUrl$.subscribe((url) => {
      if (url) {
        this.router.navigate(url);
      }
    });
  }

  constructor(private authService: AuthService, private router: Router) {
    super(initialState);
  }
}
