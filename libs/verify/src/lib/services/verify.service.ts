import { HttpStatusCode } from '@angular/common/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerifyService {
  constructor(private httpCLient: HttpClient) {}
  verifyPath = '/api/auth/verify/';

  verifyAccount(token: string): Observable<HttpStatusCode.Ok> {
    return this.httpCLient.post<HttpStatusCode.Ok>(this.verifyPath + token, {});
  }
}
