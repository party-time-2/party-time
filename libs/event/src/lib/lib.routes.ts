// implements F001
// implements F002
// implements F003
// implements F016

import { Route } from '@angular/router';
import { EventComponent } from './event/event.component';
import { CreateEventComponent } from './create/create-event.component';
import { OverviewComponent } from './overview/overview.component';
import { EditEventComponent } from './edit/edit-event.component';
import { DeleteEventComponent } from './delete-event/delete-event.component';

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
    path: 'change/:id',
    component: EditEventComponent,
  },
  {
    path: 'delete/:id',
    component: DeleteEventComponent,
  }
];
