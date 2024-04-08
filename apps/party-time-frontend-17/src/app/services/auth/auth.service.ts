import { inject, Injectable } from '@angular/core';
import { IAuthService } from '../../models/auth-service.interface';
import {
  AccountDTO,
  AccountRegisterDTO,
  ApiError,
  LoginRequestDTO,
  LoginResponseDTO,
} from '@party-time/models';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private http: HttpClient = inject(HttpClient);
  private storageService: StorageService = inject(StorageService);

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      observer.next(this.storageService.getAuthToken() !== null);
      observer.complete();
    });
  }

  login(loginRequestDTO: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http
      .post<LoginResponseDTO | ApiError>(
        environment.api.endpoints.authentication.login(),
        loginRequestDTO
      )
      .pipe(
        map((response: LoginResponseDTO | ApiError) => {
          if ('token' in response && response.token) {
            this.storageService.storeAuthToken(response.token);
            return response as LoginResponseDTO;
          } else {
            throw response as ApiError;
          }
        })
      );
  }

  verifyEmail(token: string): Observable<void | ApiError> {
    return this.http.request<void | ApiError>(
      'POST',
      environment.api.endpoints.authentication.verify(token),
      { body: {} }
    );
  }

  logout(): void {
    this.storageService.removeAuthToken();
  }
}
