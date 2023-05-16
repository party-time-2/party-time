//implements F014
import { Route } from '@angular/router';
import { VerifyComponent } from './verify/verify.component';

export const verifyRoutes: Route[] = [
  {
    path: '**',
    component: VerifyComponent,
  },
];
