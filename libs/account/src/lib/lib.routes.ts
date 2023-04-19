import { Route } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import { RegisterComponent } from './register/register.component';

export const accountRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    component: AccountPageComponent,
    path: '',
    title: 'Account',
    children: [
      {
        component: RegisterComponent,
        path: 'register',
        title: 'Registrieren',
      },
    ],
  },
];
