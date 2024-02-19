import { Injectable } from '@angular/core';
import { IAuthService } from '../../models/auth-service.interface';
import { LoginRequestDTO, LoginResponseDTO } from '@party-time/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  redirectToLogin() {
    throw new Error('Method not implemented.');
  }
  isAuthenticated(): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  login(loginRequestDTO: LoginRequestDTO): Observable<LoginResponseDTO> {
    throw new Error('Method not implemented.');
  }
  logout(): void {
    throw new Error('Method not implemented.');
  }
}
