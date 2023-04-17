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
      // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
      import('@party-time/not-found').then((m) => m.NotFoundModule),
  },
];
