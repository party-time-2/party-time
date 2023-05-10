//implements F011
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginRequestDTO, LoginResponseDTO } from '@party-time/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private loginPath = '/api/auth/login';

  // Logs in a user
  login(loginRequestDTO: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(this.loginPath, loginRequestDTO);
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
