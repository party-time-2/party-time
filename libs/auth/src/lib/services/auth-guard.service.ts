import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  //authState$ = this.store.select(selectAuthState);

  constructor(private router: Router, private store: Store) {}

  // canActivate(): Observable<boolean> {
  //   return this.authState$.pipe(
  //     map((authState) => {
  //       if (authState.isAuthenticated) {
  //         return true;
  //       }
  //       // Redirect to the login page
  //       this.router.navigate(['/auth/login']);
  //       return false;
  //     })
  //   );
  // }
}
