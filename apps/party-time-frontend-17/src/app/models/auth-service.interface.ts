import { AccountDTO, AccountRegisterDTO, ApiError, LoginRequestDTO, LoginResponseDTO } from '@party-time/models';
import { Observable } from 'rxjs';

export interface IAuthService {
  isAuthenticated(): Observable<boolean>;
  login(loginRequestDTO: LoginRequestDTO): Observable<LoginResponseDTO | ApiError>;
  register(accountRegisterDTO: AccountRegisterDTO): Observable<AccountDTO | ApiError>;
  verifyEmail(token: string): Observable<void | ApiError>;
  logout(): void;
}
