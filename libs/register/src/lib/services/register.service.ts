//implements F010
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDTO, AccountRegisterDTO } from '@party-time/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  registerPath = '/api/auth/register';

  // Registers a new account
  registerAccount(account: AccountRegisterDTO): Observable<AccountDTO> {
    return this.http.post<AccountDTO>(this.registerPath, account);
  }
}
