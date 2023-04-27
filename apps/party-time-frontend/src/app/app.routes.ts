/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadChildren: () =>
      import('@party-time/register').then((m) => m.registerRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('@party-time/landing').then((m) => m.landingRoutes),
  },
  {
    path: '**',
    loadChildren: () =>
      import('@party-time/not-found').then((m) => m.notFoundRoutes),
  },
];
