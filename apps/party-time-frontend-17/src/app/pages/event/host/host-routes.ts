import { Routes } from '@angular/router';

export const HOST_ROUTES: Routes = [
  {
    path: 'event',
    loadComponent: () =>
      import('./event/event.component').then((c) => c.EventComponent),
    title: 'Event',
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./events/events.component').then((c) => c.EventsComponent),
    title: 'Events',
  },
];
