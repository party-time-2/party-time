import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { appRoutes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@party-time/auth';
export const appConfig: ApplicationConfig = {
  providers: [
    //provideEffects(AuthEffects),
    provideStore({ router: routerReducer }),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(StoreDevtoolsModule.instrument()),
    provideRouterStore(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
