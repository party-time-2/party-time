import { LoginRequestDTO, LoginResponseDTO } from '@party-time/models';
import { Observable } from 'rxjs';

export interface IAuthService {
  isAuthenticated(): Observable<boolean>;
  login(loginRequestDTO: LoginRequestDTO): Observable<LoginResponseDTO>;
  logout(): void;
}
