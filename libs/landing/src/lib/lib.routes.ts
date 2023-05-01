/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Route } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AUTH_FEATURE_KEY, authReducer } from '@party-time/auth';
import { AuthEffects } from 'libs/auth/src/lib/+state/auth.effects';

export const landingRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    providers: [
      provideState(AUTH_FEATURE_KEY, authReducer),
      provideEffects(AuthEffects),
    ],
  },
];
