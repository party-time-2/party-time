import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { importProvidersFrom } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideEffects(),
    provideStore(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(StoreDevtoolsModule.instrument()),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
