import { Route } from '@angular/router';
import { AuthGuardService } from '@party-time/auth';

export const appRoutes: Route[] = [
  {
    path: 'profile/change',
    loadChildren: () =>
      import('@party-time/change').then((m) => m.changeRoutes),
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
