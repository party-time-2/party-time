//implements F014
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VerifyService {
  constructor(private httpCLient: HttpClient) {}
  verifyPath = '/api/auth/verify/';

  verifyAccount(token: string) {
    return this.httpCLient.post(this.verifyPath + token, {});
  }
}
