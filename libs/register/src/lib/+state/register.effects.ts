//implements F010
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, concatMap } from 'rxjs';
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
      concatMap(({ accountRegisterDTO }) =>
        this.registerService.registerAccount(accountRegisterDTO).pipe(
          map((accountDTO) =>
            RegisterActions.registeredSuccess({ accountDTO })
          ),
          catchError((res) =>
            of(RegisterActions.registerFailure({ error: res.error }))
          )
        )
      )
    )
  );
}
