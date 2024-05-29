import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(
        (c) => c.LandingComponent
      ),
    title: 'Party Time',
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account/account-routes').then((r) => r.ACCOUNT_ROUTES),
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./pages/event/event-routes').then((r) => r.EVENT_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth-routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
    title: 'Seite nicht gefunden',
  },
];
