//implements F011
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginRequestDTO, LoginResponseDTO } from '@party-time/models';
import { Observable, map } from 'rxjs';
import { selectAuthState } from '../+state/auth.selectors';
import { Router } from '@angular/router';

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
