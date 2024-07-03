import { Observable } from 'rxjs';
import {
  AccountDTO,
  AccountDeleteDTO,
  AccountRegisterDTO,
  ChangePasswordDTO,
} from './dto/account-dto.interface';

/**
 * Controller for account related matters.
 *
 * @param accountService Service used for registering accounts and changing passwords
 * @param accountDeletionService Service used for deleting accounts
 */
export interface IAccountService {
  /**
   * F013 - Passwort Ändern
   *
   * Changes the password of an authenticated user.
   *
   * @param body Information required for changing the password (old password & new password)
   * @param authentication Authentication information of the authenticated user
   */
  changePassword(changeRequestDTO: ChangePasswordDTO): Observable<void>;

  /**
   * F015 - Konto Löschen
   *
   * Deletes the account of the authenticated user.
   *
   * @param body Information required for deleting the account (current password)
   * @param authentication Authentication information of the authenticated user
   */
  deleteAccount(accountDeleteDTO: AccountDeleteDTO): Observable<void>;

  /**
   * F010 - Konto Erstellen
   *
   * Creates a new account with the provided information.
   *
   * @param body Information about the to-be-created account.
   * @return Information about the registered account.
   */
  register(accountRegisterDTO: AccountRegisterDTO): Observable<AccountDTO>;
}
