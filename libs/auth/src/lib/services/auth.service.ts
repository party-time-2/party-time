//implements F011
//implements F012
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginRequestDTO, LoginResponseDTO } from '@party-time/models';
import { Observable } from 'rxjs';
import { BYPASS_LOG } from './interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private loginPath = '/api/auth/login';

  // Logs in a user
  login(loginRequestDTO: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(this.loginPath, loginRequestDTO, {
      context: new HttpContext().set(BYPASS_LOG, true),
    });
  }

  // Logs out a user
  logout(): void {
    localStorage.removeItem('auth_token');
  }

  // Load the user token from the local storage
  loadToken(): LoginResponseDTO | null {
    const token = localStorage.getItem('auth_token');
    if (token !== null) {
      const loginResponseDTO: LoginResponseDTO = {
        token,
      };
      return loginResponseDTO;
    } else {
      return null;
    }
  }

  // Stores the user token in the local storage
  storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }
}
