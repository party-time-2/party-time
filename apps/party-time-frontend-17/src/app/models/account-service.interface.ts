import {
  AccountDTO,
  AccountDeleteDTO,
  AccountRegisterDTO,
  ApiError,
  ChangePasswordDTO,
} from '@party-time/models';
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
  changePassword(changeRequestDTO: ChangePasswordDTO): Observable<void>;

  /**
   * Deletes the account.
   * @param password - The password for account deletion.
   * @returns An Observable that emits void or an ApiError.
   */
  deleteAccount(accountDeleteDTO: AccountDeleteDTO): Observable<void>;

  /**
   * Registers a new user account with the provided account registration data.
   * @param accountRegisterDTO - The account registration data.
   * @returns An Observable that emits an AccountDTO if the registration is successful, or an ApiError if there is an error.
   */
  register(accountRegisterDTO: AccountRegisterDTO): Observable<AccountDTO>;
}
