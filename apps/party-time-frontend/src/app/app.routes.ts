/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('@party-time/auth').then((m) => m.authRoutes),
  },
  {
    path: 'verify',
    loadChildren: () =>
      import('@party-time/verify').then((m) => m.verifyRoutes),
  },
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
