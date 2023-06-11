// implements F001
// implements F002
// implements F016

import { Route } from '@angular/router';
import { EventComponent } from './event/event.component';
import { CreateEventComponent } from './create/create-event.component';
import { OverviewComponent } from './overview/overview.component';
import { EditEventComponent } from './edit/edit-event.component';

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
    path: 'edit/:id',
    component: EditEventComponent,
  }
];
