//implements F013
//implements F015
import { Route } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ChangeComponent } from './change/change.component';
import { DeleteComponent } from './delete/delete.component';

export const accountRoutes: Route[] = [
  { path: '', component: AccountComponent },
  {
    path: 'change',
    component: ChangeComponent,
  },
  {
    path: 'delete',
    component: DeleteComponent,
  },
];
