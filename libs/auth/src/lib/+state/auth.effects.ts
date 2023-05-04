//implements F011
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { DecodeTokenService } from '../services/decode-token.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private decodeTokenService: DecodeTokenService
  ) {}

  loadLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap(({ loginRequestDTO }) =>
        this.authService.login(loginRequestDTO).pipe(
          map((loginResponseDTO) =>
            AuthActions.loginSuccess({ loginResponseDTO })
          ),
          catchError((res) =>
            of(AuthActions.loginFailure({ error: res.error }))
          )
        )
      )
    )
  );

  storeToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map(({ loginResponseDTO }) => {
          if (loginResponseDTO.token !== undefined) {
            this.authService.storeToken(loginResponseDTO.token);
          }
        })
      ),
    { dispatch: false }
  );

  loadToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAuth),
      map(() => {
        const loginResponseDTO = this.authService.loadToken();
        if (loginResponseDTO !== null) {
          return AuthActions.loginSuccess({ loginResponseDTO });
        } else {
          return AuthActions.loginFailure({
            error: { message: 'Token is undefined' },
          });
        }
      })
    )
  );

  decodeToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map(({ loginResponseDTO }) => {
        if (loginResponseDTO.token !== undefined) {
          return AuthActions.decodeTokenSuccsess({
            accountLoginDTO: this.decodeTokenService.decodeToken(
              loginResponseDTO.token
            ),
          });
        } else {
          return AuthActions.loginFailure({
            error: { message: 'Token is undefined' },
          });
        }
      })
    )
  );
}
