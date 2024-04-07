import { Route, Routes } from '@angular/router';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: 'delete',
    loadComponent: () =>
      import('./delete/delete.component').then((c) => c.DeleteComponent),
    title: 'Account löschen',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((c) => c.RegisterComponent),
    title: 'Registrieren',
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./changePassword/changePassword.component').then(
        (c) => c.ChangePasswordComponent
      ),
    title: 'Passwort ändern',
  },
];
