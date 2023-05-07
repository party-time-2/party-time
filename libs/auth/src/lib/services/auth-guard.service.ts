import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthStore } from '../+state/auth.state';
import { getRouterSelectors } from '@ngrx/router-store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  routerStore$ = inject(Store).select(getRouterSelectors().selectUrl);
  vm$ = inject(AuthStore).vm$;
  returnUrl = '';

  constructor(
    private router: Router,
    private store: Store,
    private authState: AuthStore
  ) {}

  canActivate() {
    this.routerStore$.subscribe((url) => {
      this.returnUrl = url;
    });

    return this.vm$.pipe(
      map((state) => {
        if (state.isAuthenticated) {
          return true;
        } else {
          this.authState.setReturnUrl([this.returnUrl]);
          this.router.navigate(['auth/login']);
          return false;
        }
      })
    );
  }
}
