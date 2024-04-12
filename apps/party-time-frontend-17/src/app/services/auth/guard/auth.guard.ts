import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    snackBar
      .open('Bitte melde dich an', 'Login', {
        duration: 1000,
      })
      .afterDismissed()
      .subscribe(() => {
        router.navigate(['/auth/login']);
      });
    return false;
  }
};
