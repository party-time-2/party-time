//implements F011
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { ChangeService } from '../../services/change.service';
import * as ChangeActions from './change.actions';

@Injectable()
export class ChangeEffects {
  constructor(
    private actions$: Actions,
    private changeService: ChangeService
  ) {}

  loadChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangeActions.loadChangePassword),
      concatMap(({ changePasswordDTO }) =>
        this.changeService.changePassword(changePasswordDTO).pipe(
          map(() => ChangeActions.changePasswordSuccess()),
          catchError((res) =>
            of(ChangeActions.changePasswordFailure({ error: res.error }))
          )
        )
      )
    )
  );
}
