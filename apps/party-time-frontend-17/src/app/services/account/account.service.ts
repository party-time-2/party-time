import { Injectable, inject } from '@angular/core';
import { IAccountService } from '../../models/account-service.interface';
import {
  ChangePasswordDTO,
  ApiError,
  AccountDeleteDTO,
} from '@party-time/models';
import { Observable } from 'rxjs';
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
      environment.api.endpoints.account.deleteAccount(),
      {
        body: accountDeleteDTO,
      }
    );
  }
}
