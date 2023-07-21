import { Route } from '@angular/router';
import { AuthGuardService } from '@party-time/auth';

export const appRoutes: Route[] = [
  {
    path: 'event',
    loadChildren: () => import('@party-time/event').then((m) => m.eventRoutes),
    canActivate: [AuthGuardService],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('@party-time/account').then((m) => m.accountRoutes),
    canActivate: [AuthGuardService],
  },
  {
    path: 'auth',
    loadChildren: () => import('@party-time/auth').then((m) => m.authRoutes),
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
