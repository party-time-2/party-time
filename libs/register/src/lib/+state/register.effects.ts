import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as RegisterActions from './register.actions';
import { RegisterService } from '../services/register.service';

@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private registerService: RegisterService
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.register),
      switchMap(({ accountRegisterDTO }) =>
        this.registerService.registerAccount(accountRegisterDTO).pipe(
          map((accountDTO) =>
            RegisterActions.registeredSuccess({ accountDTO })
          ),
          catchError((error) =>
            of(RegisterActions.registerFailure({ error: error.error }))
          )
        )
      )
    )
  );
}