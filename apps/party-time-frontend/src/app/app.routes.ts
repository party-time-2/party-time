import { Route } from '@angular/router';

export const appRoutes: Route[] = [
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
