//implements F011
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, concatMap, map, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  loadLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap(({ loginRequestDTO }) =>
        this.authService.login(loginRequestDTO).pipe(
          map((loginResponseDTO) =>
            AuthActions.loginSuccess({ loginResponseDTO })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );
}
