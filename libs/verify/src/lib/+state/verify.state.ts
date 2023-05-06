//implements F014
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ApiError } from '@party-time/models';
import { Observable, exhaustMap, tap } from 'rxjs';
import { VerifyService } from '../services/verify.service';

export interface VerifyStateInterface {
  token: string | null;
  isLoading: boolean;
  isVerified: boolean;
  error: ApiError | null;
}

export const initialVerifyState: VerifyStateInterface = {
  token: null,
  isLoading: false,
  isVerified: false,
  error: null,
};

@Injectable()
export class VerifyStore extends ComponentStore<VerifyStateInterface> {
  private isLoading$ = this.select((state) => state.isLoading);
  private isVerified$ = this.select((state) => state.isVerified);
  private token$ = this.select((state) => state.token);
  private error$ = this.select((state) => state.error);

  vm$ = this.select({
    isLoading: this.isLoading$,
    isVerified: this.isVerified$,
    token: this.token$,
    error: this.error$,
  });

  setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  setError = this.updater((state, error: ApiError) => ({
    ...state,
    error,
  }));

  setIsVerified = this.updater((state, isVerified: boolean) => ({
    ...state,
    isVerified,
  }));

  setToken = this.updater((state, token: string) => ({
    ...state,
    token,
  }));

  getVerified = this.effect((token$: Observable<string>) =>
    token$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((token) =>
        this.verifyService.verifyAccount(token).pipe(
          tapResponse(
            () => {
              this.setIsVerified(true);
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

  constructor(private verifyService: VerifyService) {
    super(initialVerifyState);
  }
}
