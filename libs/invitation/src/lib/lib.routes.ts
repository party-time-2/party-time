import { Route } from '@angular/router';
import { AcceptComponent } from './accept/accept.component';
import { DeclineComponent } from './decline/decline.component';

export const invitationRoutes: Route[] = [
  { path: ':eventId/accept', component: AcceptComponent },
  { path: ':eventId/decline', component: DeclineComponent },
];
