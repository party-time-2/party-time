//implements F010
import { Route } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromRegister from './+state/register.reducer';
import { RegisterEffects } from './+state/register.effects';

export const registerRoutes: Route[] = [
  {
    path: '',
    component: RegisterComponent,
    providers: [
      provideState(
        fromRegister.REGISTER_FEATURE_KEY,
        fromRegister.registerReducer
      ),
      provideEffects(RegisterEffects),
    ],
  },
];
