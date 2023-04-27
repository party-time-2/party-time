import { Route } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AUTH_FEATURE_KEY, authReducer } from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';

export const authRoutes: Route[] = [
  {
    path: '',
    component: AuthComponent,
    providers: [
      provideState(AUTH_FEATURE_KEY, authReducer),
      provideEffects(AuthEffects),
    ],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ],
  },
];
