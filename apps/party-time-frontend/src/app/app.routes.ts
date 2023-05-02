/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Route } from '@angular/router';
import { AuthGuardService } from '@party-time/auth';

export const appRoutes: Route[] = [
  {
    path: 'profil/change',
    loadChildren: () =>
      import('@party-time/change').then((m) => m.changeRoutes),
    canActivate: [AuthGuardService],
  },
  {
    path: 'auth/login',
    loadChildren: () => import('@party-time/auth').then((m) => m.authRoutes),
  },
  {
    path: 'auth/verify',
    loadChildren: () =>
      import('@party-time/verify').then((m) => m.verifyRoutes),
  },
  {
    path: 'auth/register',
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
