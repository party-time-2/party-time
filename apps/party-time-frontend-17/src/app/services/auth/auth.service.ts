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
        catchError((error) => throwError(() => new Error(error.message)))
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
          return of(error.error);
        })
      );
  }

  logout(): void {
    this.storageService.removeAuthToken();
    this.authStatus$.next(this.hasToken());
  }
}
