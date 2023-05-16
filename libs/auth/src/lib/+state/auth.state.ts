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

  setError = this.updater((state, error: ApiError) => ({
    ...state,
    error,
  }));

  setReturnUrl = this.updater((state, returnUrl: string[]) => ({
    ...state,
    returnUrl,
  }));

  // effect which will be triggered when the user submits the login form and only runs once the user has submitted the form
  getAccountLoginDTO = this.effect(
    (accountLoginDTO$: Observable<LoginRequestDTO>) =>
      accountLoginDTO$.pipe(
        tap(() => this.patchState({ loading: true })),
        exhaustMap((accountLoginDTO: LoginRequestDTO) =>
          this.authService.login(accountLoginDTO).pipe(
            tapResponse(
              (loginResponseDTO) => {
                this.patchState({
                  loginResponseDTO,
                  isAuthenticated: true,
                });
                this.saveTokenToLocalStorage();
                this.returnToUrl();
              },
              (error: ApiError) => {
                this.patchState({ error });
              }
            )
          )
        ),
        tap(() => this.patchState({ loading: false }))
      )
  );

  getAccountLogout() {
    this.authService.logout();
    this.patchState({ isAuthenticated: false, loginResponseDTO: undefined });
    this.router.navigate(['auth/login']);
  }

  loadTokenFromLocalStorage() {
    const loginResponseDTO = this.authService.loadToken();
    if (loginResponseDTO && loginResponseDTO.token) {
      this.patchState({ loginResponseDTO, isAuthenticated: true });
    }
  }

  saveTokenToLocalStorage() {
    this.loginResponseDTO$.subscribe((loginResponseDTO) => {
      if (loginResponseDTO?.token)
        this.authService.storeToken(loginResponseDTO.token);
    });
  }

  returnToUrl() {
    this.returnUrl$.subscribe((url) => {
      if (url) {
        this.router.navigate(url);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  constructor(private authService: AuthService, private router: Router) {
    super(initialState);
    this.loadTokenFromLocalStorage();
  }
}
