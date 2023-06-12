// implements F001
import { Route } from '@angular/router';
import { EventComponent } from './event/event.component';
import { CreateEventComponent } from './create/create-event.component';

export const eventRoutes: Route[] = [
  { path: '', component: EventComponent },
  {
    path: 'create',
    component: CreateEventComponent,
  },
];
