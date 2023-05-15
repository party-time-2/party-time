import { Route } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ChangeComponent } from './change/change.component';

export const accountRoutes: Route[] = [
  { path: '', component: AccountComponent },
  {
    path: 'change',
    component: ChangeComponent,
  },
];
