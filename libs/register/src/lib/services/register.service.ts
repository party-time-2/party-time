import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDTO, AccountRegisterDTO } from '@party-time/models';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  registerPath = '/api/auth/register';

  registerAccount(account: AccountRegisterDTO) {
    console.log('registerAccount', account);
    return this.http.post<AccountDTO>(this.registerPath, account);
  }
}
