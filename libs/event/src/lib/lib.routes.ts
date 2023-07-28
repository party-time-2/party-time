// implements F001
// implements F002
// implements F003
// implements F004
// implements F005
// implements F006
// implements F016

import { Route } from '@angular/router';
import { EventComponent } from './event/event.component';
import { CreateEventComponent } from './create/create-event.component';
import { OverviewComponent } from './overview/overview.component';
import { EditEventComponent } from './edit/edit-event.component';
import { DeleteEventComponent } from './delete-event/delete-event.component';
import { ParticipantsComponent } from './participants/participants.component';
import { OtherComponent } from './other/other.component';
import { LocationComponent } from './location/location.component';

export const eventRoutes: Route[] = [
  { path: '', component: EventComponent },
  {
    path: 'create',
    component: CreateEventComponent,
  },
  {
    path: 'overview',
    component: OverviewComponent,
  },
  {
    path: 'other',
    component: OtherComponent,
  },
  {
    path: 'change/:id',
    component: EditEventComponent,
  },
  {
    path: 'delete/:id',
    component: DeleteEventComponent,
  },
  {
    path: 'participants/:id',
    component: ParticipantsComponent,
  },
  {
    path: 'map/:id',
    component: LocationComponent,
  },
];
