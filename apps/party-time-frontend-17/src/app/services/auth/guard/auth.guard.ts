import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment.development';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();

  isAuthenticated.subscribe((isAuthenticated) => {
    if (!isAuthenticated) {
      router.navigate([environment.pages.login]);
    }
  });

  return isAuthenticated;
};
