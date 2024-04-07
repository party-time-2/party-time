import { Routes } from '@angular/router';

export const EVENT_ROUTES: Routes = [
  {
    path: 'participant',
    loadChildren: () =>
      import('./participant/participant-routes').then(
        (r) => r.PARTICIPANT_ROUTES
      ),
  },
  {
    path: 'host',
    loadChildren: () => import('./host/host-routes').then((r) => r.HOST_ROUTES),
  },
];
