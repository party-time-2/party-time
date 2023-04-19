import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@party-time/landing').then((m) => m.LandingModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('@party-time/account').then((m) => m.AccountModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('@party-time/not-found').then((m) => m.NotFoundModule),
  },
];
