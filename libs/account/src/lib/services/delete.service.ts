//implements F015
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DeleteService {
  constructor(private http: HttpClient) {}

  changePath = '/api/account/delete';

  deleteAccount(password: string) {
    return this.http.delete(this.changePath, {
      body: { password },
    });
  }
}
