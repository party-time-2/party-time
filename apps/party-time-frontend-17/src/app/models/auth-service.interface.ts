import { Observable } from 'rxjs';
import { LoginRequestDTO, LoginResponseDTO } from './dto/auth-dto.interface';
import { ApiError } from './error.interface';

/**
 * Controller for authentication related matters.
 *
 * @param authService Service for authentication related matters (e.g. logging in)
 */
export interface IAuthService {
  /**
   * Checks if the user is authenticated.
   * @returns An Observable that emits a boolean value indicating whether the user is authenticated or not.
   */
  isAuthenticated(): Observable<boolean>;

  /**
   * F011 - Konto anmelden
   *
   * Logs a user into the plattform.
   *
   * @param body Information required for the log-in
   * @return Information about the successful log-in (contains the auth-token for password-less authentication)
   */
  login(loginRequestDTO: LoginRequestDTO): Observable<LoginResponseDTO>;

  /**
   * F014 - Konto Verifizieren
   *
   * Verifies the validity of the provided e-mail address of an account.
   *
   * @param token The e-mail-verification token used to identify which account should be marked as e-mail-verified
   * @param emptyBody An empty message body, as required by the HTTP POST method
   */
  verifyEmail(token: string): Observable<void | ApiError>;

  /**
   * F012 Konto abmelden
   * Logs out the user.
   */
  logout(): void;
}
