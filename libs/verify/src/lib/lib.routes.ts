import { Route } from '@angular/router';
import { VerifyComponent } from './verify/verify.component';

export const verifyRoutes: Route[] = [
  { path: ':token', component: VerifyComponent },
];
