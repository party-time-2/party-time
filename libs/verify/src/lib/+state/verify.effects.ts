import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as VerifyActions from './verify.actions';
import { VerifyService } from '../services/verify.service';

@Injectable()
export class VerifyEffects {
  constructor(
    private actions$: Actions,
    private verifyService: VerifyService
  ) {}

  loadVerifys$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerifyActions.verify),
      concatMap(({ token }) =>
        this.verifyService.verifyAccount(token).pipe(
          map(() => VerifyActions.verifiedSuccess()),
          catchError((error) => of(VerifyActions.verifiedFailure({ error })))
        )
      )
    )
  );
}
