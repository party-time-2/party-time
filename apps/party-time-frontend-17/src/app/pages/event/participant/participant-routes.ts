import { Routes } from '@angular/router';

export const PARTICIPANT_ROUTES: Routes = [
  {
    path: 'event:eventId',
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
  {
    path: 'invitaions',
    loadComponent: () =>
      import('./invitations/invitations.component').then(
        (c) => c.InvitationsComponent
      ),
    title: 'Einladungen',
  },
];
