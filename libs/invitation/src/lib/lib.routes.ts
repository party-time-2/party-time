// implements F008
// implements F009
import { Route } from '@angular/router';
import { InvitationComponent } from './invitation/invitation.component';

export const invitationRoutes: Route[] = [
  { path: ':eventId/:action', component: InvitationComponent },
];
