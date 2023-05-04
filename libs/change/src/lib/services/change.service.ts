import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangePasswordDTO } from '@party-time/models';

@Injectable({
  providedIn: 'root',
})
export class ChangeService {
  constructor(private http: HttpClient) {}

  changePath = '/api/auth/change';

  changePassword(changeRequestDTO: ChangePasswordDTO) {
    console.log(changeRequestDTO);
    return this.http.post(this.changePath, changeRequestDTO);
  }
}
