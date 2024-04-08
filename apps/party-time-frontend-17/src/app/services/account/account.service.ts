import { Injectable, inject } from '@angular/core';
import { IAccountService } from '../../models/account-service.interface';
import {
  ChangePasswordDTO,
  ApiError,
  AccountDeleteDTO,
  AccountDTO,
  AccountRegisterDTO,
} from '@party-time/models';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements IAccountService {
  private http: HttpClient = inject(HttpClient);

  changePassword(
    changeRequestDTO: ChangePasswordDTO
  ): Observable<void | ApiError> {
    return this.http.post<void | ApiError>(
      environment.api.endpoints.account.changePassword(),
      changeRequestDTO
    );
  }

  deleteAccount(
    accountDeleteDTO: AccountDeleteDTO
  ): Observable<void | ApiError> {
    return this.http.request<void | ApiError>(
      'DELETE',
      environment.api.endpoints.account.delete(),
      {
        body: accountDeleteDTO,
      }
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
