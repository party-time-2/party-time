import { Route } from '@angular/router';
import { DeclineComponent } from './decline/decline.component';
import { AcceptComponent } from './accept/accept.component';

export const invitationRoutes: Route[] = [
  {
    path: ':eventId/accept', component: AcceptComponent
  },
  {
    path: ':eventId/decline', component: DeclineComponent
  },
];
