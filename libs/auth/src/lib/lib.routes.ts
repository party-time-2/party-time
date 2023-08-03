//implements F011
//implements F012
import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

export const authRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'verify',
    loadChildren: () =>
      import('@party-time/verify').then((m) => m.verifyRoutes),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('@party-time/register').then((m) => m.registerRoutes),
  },
];
