//implements F010
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AccountDTO, AccountRegisterDTO } from '@party-time/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient);

  private registerPath = '/api/auth/register';

  // Registers a new account
  registerAccount(account: AccountRegisterDTO): Observable<AccountDTO> {
    return this.http.post<AccountDTO>(this.registerPath, account);
  }
}
