import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  authService.isAuthenticated().subscribe((isAuthenticated) => {
    if (!isAuthenticated) {
      authService.redirectToLogin();
    }
  });
  return true;
};
