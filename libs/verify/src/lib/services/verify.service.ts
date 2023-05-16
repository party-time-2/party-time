//implements F014
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VerifyService {
  private http = inject(HttpClient);

  private verifyPath = '/api/auth/verify/';

  verifyAccount(token: string) {
    return this.http.post(this.verifyPath + token, {}, { observe: 'response' });
  }
}
