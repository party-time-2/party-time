/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { importProvidersFrom } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from 'libs/auth/src/lib/services/interceptor.service';
import { authReducer, initialState } from '@party-time/auth';
import { AuthEffects } from 'libs/auth/src/lib/+state/auth.effects';
import { changeReducer } from 'libs/change/src/lib/change/+state/change.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideEffects(AuthEffects),
    provideStore({ auth: authReducer, change: changeReducer }),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(StoreDevtoolsModule.instrument()),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
}).catch((err) => console.error(err));
