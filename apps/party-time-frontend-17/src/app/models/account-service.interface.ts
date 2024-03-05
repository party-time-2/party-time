import { ApiError, ChangePasswordDTO } from '@party-time/models';
import { Observable } from 'rxjs';

/**
 * Represents an account service.
 */
export interface IAccountService {
  /**
   * Changes the password for the account.
   * @param changeRequestDTO - The change password request DTO.
   * @returns An Observable that emits void or an ApiError.
   */
  changePassword(
    changeRequestDTO: ChangePasswordDTO
  ): Observable<void | ApiError>;

  /**
   * Deletes the account.
   * @param password - The password for account deletion.
   * @returns An Observable that emits void or an ApiError.
   */
  deleteAccount(password: string): Observable<void | ApiError>;
}
