import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'verify',
    loadComponent: () =>
      import('./verify/verify.component').then((c) => c.VerifyComponent),
  },
];
