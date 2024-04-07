import { Route, Routes } from '@angular/router';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: 'delete',
    loadComponent: () =>
      import('./delete/delete.component').then((c) => c.DeleteComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((c) => c.RegisterComponent),
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./changePassword/changePassword.component').then(
        (c) => c.ChangePasswordComponent
      ),
  },
];
