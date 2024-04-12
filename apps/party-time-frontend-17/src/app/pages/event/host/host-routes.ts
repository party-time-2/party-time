import { Routes } from '@angular/router';
import { authGuard } from '../../../services/auth/guard/auth.guard';

export const HOST_ROUTES: Routes = [
  {
    path: 'event',
    loadComponent: () =>
      import('./event/event.component').then((c) => c.EventComponent),
    title: 'Event',
    canActivate: [authGuard],
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./events/events.component').then((c) => c.EventsComponent),
    title: 'Events',
    canActivate: [authGuard],
  },
];
