//implements F011
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoginRequestDTO, LoginResponseDTO } from '@party-time/models';
import { Observable, map } from 'rxjs';
import { selectAuthState } from '../+state/auth.selectors';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {}

  authState$ = this.store.select(selectAuthState);
  loginPath = '/api/auth/login';
  redirectUrl: string | null = null;

  // Logs in a user
  login(loginRequestDTO: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(this.loginPath, loginRequestDTO);
  }

  canActivate(): Observable<boolean> {
    return this.authState$.pipe(
      map((authState) => {
        if (authState.isAuthenticated) {
          return true;
        }
        // Redirect to the login page
        return false;
      })
    );
  }

  // Load the user token from the local storage
  loadToken(): LoginResponseDTO {
    const loginResponseDTO: LoginResponseDTO = {
      token: localStorage.getItem('auth_token') || '',
    };
    return loginResponseDTO;
  }

  // Stores the user token in the local storage
  storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }
}

// export const authGuard = (
//   authService: AuthService,
//   store: Store,
//   router: Router
// ) => {
//   return {
//     canActivate: () => {
//       if (
//         store
//           .select(selectAuthState)
//           .subscribe((state) => state.isAuthenticated)
//       ) {
//         authService.redirectUrl = null;
//         return true;
//       }
//       // Redirect to the login page
//       return router.parseUrl('/auth/login');
//     },
//   };
// };
