//implements F013
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DeleteService {
  constructor(private http: HttpClient) {}

  changePath = '/api/auth/delete';

  deleteAccount(password: string) {
    const bodyJson = JSON.stringify(password);
    return this.http.delete(this.changePath, {
      body: bodyJson,
    });
  }
}
