import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';

bootstrapApplication(AppComponent, {
  providers: [
    //provideEffects(AuthEffects),
    provideStore({ router: routerReducer }),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(StoreDevtoolsModule.instrument()),
    provideHttpClient(),
    provideRouterStore(),
    // provideHttpClient(withInterceptors([authInterceptor])),
  ],
}).catch((err) => console.error(err));
