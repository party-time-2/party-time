import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'account',
    loadChildren: () =>
      import('@party-time/account').then((m) => m.accountRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('@party-time/landing').then((m) => m.LandingModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('@party-time/not-found').then((m) => m.NotFoundModule),
  },
];
