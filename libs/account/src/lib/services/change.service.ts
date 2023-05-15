//implements F013
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangePasswordDTO } from '@party-time/models';

@Injectable()
export class ChangeService {
  constructor(private http: HttpClient) {}

  changePath = '/api/auth/change';

  changePassword(changeRequestDTO: ChangePasswordDTO) {
    return this.http.post(this.changePath, changeRequestDTO);
  }
}
