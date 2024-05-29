import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
    title: 'Login',
  },
  {
    path: 'verify',
    loadComponent: () =>
      import('./verify/verify.component').then((c) => c.VerifyComponent),
    title: 'Verifizieren',
  },
];
