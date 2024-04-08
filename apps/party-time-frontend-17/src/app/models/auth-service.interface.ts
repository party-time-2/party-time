import {
  AccountDTO,
  AccountRegisterDTO,
  ApiError,
  LoginRequestDTO,
  LoginResponseDTO,
} from '@party-time/models';
import { Observable } from 'rxjs';

/**
 * Represents the interface for an authentication service.
 */
export interface IAuthService {
  /**
   * Checks if the user is authenticated.
   * @returns An Observable that emits a boolean value indicating whether the user is authenticated or not.
   */
  isAuthenticated(): Observable<boolean>;

  /**
   * Logs in the user with the provided login request data.
   * @param loginRequestDTO - The login request data.
   * @returns An Observable that emits a LoginResponseDTO if the login is successful, or an ApiError if there is an error.
   */
  login(loginRequestDTO: LoginRequestDTO): Observable<LoginResponseDTO>;

  /**
   * Verifies the user's email with the provided verification token.
   * @param token - The verification token.
   * @returns An Observable that emits void if the email verification is successful, or an ApiError if there is an error.
   */
  verifyEmail(token: string): Observable<void | ApiError>;

  /**
   * Logs out the user.
   */
  logout(): void;
}
