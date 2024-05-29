import { inject, Injectable } from '@angular/core';
import { IAuthService } from '../../models/auth-service.interface';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';
import {
  LoginRequestDTO,
  LoginResponseDTO,
} from '../../models/dto/auth-dto.interface';
import { ApiError } from '../../models/error.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private http: HttpClient = inject(HttpClient);
  private storageService: StorageService = inject(StorageService);
  private authStatus$ = new BehaviorSubject<boolean>(this.hasToken());

  isAuthenticated(): Observable<boolean> {
    return this.authStatus$.asObservable();
  }

  isLoggedIn() {
    return this.authStatus$.value;
  }

  private hasToken(): boolean {
    return this.storageService.getAuthToken() !== null;
  }

  login(loginRequestDTO: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http
      .post<LoginResponseDTO>(
        environment.api.endpoints.authentication.login(),
        loginRequestDTO
      )
      .pipe(
        map((response) => {
          if ('token' in response && response.token) {
            this.storageService.storeAuthToken(response.token);
            this.authStatus$.next(this.hasToken());
            return response;
          } else {
            throw new Error('Invalid response');
          }
        }),
        catchError((error) => {
          return throwError(() => error.error as ApiError);
        })
      );
  }

  verifyEmail(token: string): Observable<void> {
    return this.http
      .request<void>(
        'POST',
        environment.api.endpoints.authentication.verify(token),
        { body: {} }
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error.error as ApiError);
        })
      );
  }

  logout(): void {
    this.storageService.removeAuthToken();
    this.authStatus$.next(this.hasToken());
  }
}
