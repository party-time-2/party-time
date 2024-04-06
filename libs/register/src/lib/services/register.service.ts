//implements F010
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AccountDTO, AccountRegisterDTO, ApiError } from '@party-time/models';
import { environment } from '../../../../../apps/party-time-frontend/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient);

  private registerPath = '/api/auth/register';

  // Registers a new account
  registerAccount(
    accountRegisterDTO: AccountRegisterDTO
  ): Observable<AccountDTO> {
    return this.http.post<AccountDTO>(
      'http://localhost:8090/api/account',
      accountRegisterDTO
    );
  }
}
