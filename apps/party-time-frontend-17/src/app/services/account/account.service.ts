import { Injectable, inject } from '@angular/core';
import { IAccountService } from '../../models/account-service.interface';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';
import {
  ChangePasswordDTO,
  AccountDeleteDTO,
  AccountRegisterDTO,
  AccountDTO,
} from '../../models/dto/account-dto.interface';
import { ApiError } from '../../models/error.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements IAccountService {
  private http: HttpClient = inject(HttpClient);

  changePassword(changeRequestDTO: ChangePasswordDTO): Observable<void> {
    return this.http
      .post<void | ApiError>(
        environment.api.endpoints.account.changePassword(),
        changeRequestDTO
      )
      .pipe(
        map((response: void | ApiError) => {
          if (response === null) {
            return;
          } else {
            throw response as ApiError;
          }
        })
      );
  }

  deleteAccount(accountDeleteDTO: AccountDeleteDTO): Observable<void> {
    return this.http
      .request<void | ApiError>(
        'DELETE',
        environment.api.endpoints.account.delete(),
        {
          body: accountDeleteDTO,
        }
      )
      .pipe(
        map((response: void | ApiError) => {
          if (response === null) {
            return;
          } else {
            throw response as ApiError;
          }
        })
      );
  }

  register(accountRegisterDTO: AccountRegisterDTO): Observable<AccountDTO> {
    return this.http
      .post<AccountDTO | ApiError>(
        environment.api.endpoints.account.register(),
        accountRegisterDTO
      )
      .pipe(
        map((response: AccountDTO | ApiError) => {
          if ('id' in response) {
            return response as AccountDTO;
          } else {
            throw response as ApiError;
          }
        })
      );
  }
}
