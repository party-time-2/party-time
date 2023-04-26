//implements F014
import { Route } from '@angular/router';
import { VerifyComponent } from './verify/verify.component';
import * as fromVerify from './+state/verify.reducer';
import { VerifyEffects } from './+state/verify.effects';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

export const verifyRoutes: Route[] = [
  {
    path: '**',
    component: VerifyComponent,
    providers: [
      provideState(fromVerify.VERIFY_FEATURE_KEY, fromVerify.verifyReducer),
      provideEffects(VerifyEffects),
    ],
  },
];
