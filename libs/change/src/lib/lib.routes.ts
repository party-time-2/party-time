import { Route } from '@angular/router';
import { ChangeComponent } from './change/change.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as fromChange from './change/+state/change.reducer';
import { ChangeEffects } from './change/+state/change.effects';

export const changeRoutes: Route[] = [
  {
    path: '',
    component: ChangeComponent,
    providers: [
      provideState(fromChange.CHANGE_FEATURE_KEY, fromChange.changeReducer),
      provideEffects(ChangeEffects),
    ],
  },
];
