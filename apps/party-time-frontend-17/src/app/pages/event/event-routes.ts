import { Routes } from '@angular/router';
import { authGuard } from '../../services/auth/guard/auth.guard';

export const EVENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./overview/overview.component').then((c) => c.OverviewComponent),
    canActivate: [authGuard],
  },
];
