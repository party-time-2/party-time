import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AccountDeleteDTO, ChangePasswordDTO } from '@party-time/models';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';

describe('AccountService', () => {
  let service: AccountService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService],
    });
    service = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to change password', () => {
    const changeRequestDTO: ChangePasswordDTO = {
      newPassword: 'newPassword',
      oldPassword: 'oldPassword',
    };

    service.changePassword(changeRequestDTO).subscribe(() => {
      // add any assertions here if needed
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.account.changePassword()
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(changeRequestDTO);

    req.flush(null);
  });

  it('should send a DELETE request to delete account', () => {
    const accountDeleteDTO: AccountDeleteDTO = {
      password: 'password',
    };

    service.deleteAccount(accountDeleteDTO).subscribe(() => {
      // add any assertions here if needed
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.account.deleteAccount()
    );

    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual(accountDeleteDTO);

    req.flush(null);
  });
});
