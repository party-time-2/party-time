import { inject, Injectable } from '@angular/core';
import { IAuthService } from '../../models/auth-service.interface';
import {
  AccountDTO,
  AccountRegisterDTO,
  ApiError,
  LoginRequestDTO,
  LoginResponseDTO,
} from '@party-time/models';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private http: HttpClient = inject(HttpClient);
  private storageService: StorageService = inject(StorageService);

  isAuthenticated(): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  login(
    loginRequestDTO: LoginRequestDTO
  ): Observable<LoginResponseDTO | ApiError> {
    return this.http
      .post<LoginResponseDTO | ApiError>(
        environment.api.endpoints.authentication.login(),
        loginRequestDTO,
        {}
      )
      .pipe(
        tap((response: LoginResponseDTO | ApiError) => {
          if ('token' in response && response.token) {
            this.storageService.storeAuthToken(response.token);
          }
        })
      );
  }
  register(
    accountRegisterDTO: AccountRegisterDTO
  ): Observable<AccountDTO | ApiError> {
    return this.http.post<AccountDTO | ApiError>(
      environment.api.endpoints.authentication.register(),
      accountRegisterDTO,
      {}
    );
  }
  verifyEmail(token: string): Observable<void | ApiError> {
    return this.http.get<void | ApiError>(
      environment.api.endpoints.authentication.verify(token)
    );
  }

  logout(): void {
    this.storageService.removeAuthToken();
  }
}
