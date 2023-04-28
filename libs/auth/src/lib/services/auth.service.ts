//implements F011
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestDTO, LoginResponseDTO } from '@party-time/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginPath = '/api/auth/login';

  // Logs in a user
  login(loginRequestDTO: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(this.loginPath, loginRequestDTO);
  }

  // Stores the user token in the local storage
  storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }
}
