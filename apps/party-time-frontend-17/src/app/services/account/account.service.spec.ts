import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';
import {
  AccountRegisterDTO,
  ChangePasswordDTO,
  AccountDeleteDTO,
} from '../../models/dto/account-dto.interface';
import { ApiError, ApiErrorStatus } from '../../models/error.interface';

describe('AccountService', () => {
  let service: AccountService;
  let httpTestingController: HttpTestingController;
  const mockAccountRegisterDTO: AccountRegisterDTO = {
    email: 'test',
    password: 'password',
    name: 'test',
  };
  const mockAccountDTO = { email: 'test', name: 'test', id: '1' };

  const mockBadRequestApiError: ApiError = {
    status: ApiErrorStatus['400 BAD_REQUEST'],
    timestamp: new Date(),
    message: 'Bad Request',
    additionalInformation: [],
  };

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

  it('should throw ApiError on change password failure', (done) => {
    const changeRequestDTO: ChangePasswordDTO = {
      newPassword: 'newPassword',
      oldPassword: 'oldPassword',
    };

    service.changePassword(changeRequestDTO).subscribe({
      next: () => fail('Expected an error, not a password change success'),
      error: (error) => {
        expect(error).toEqual(mockBadRequestApiError);
        done();
      },
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.account.changePassword()
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockBadRequestApiError);
  });

  it('should send a DELETE request to delete account', () => {
    const accountDeleteDTO: AccountDeleteDTO = {
      password: 'password',
    };

    service.deleteAccount(accountDeleteDTO).subscribe(() => {
      //
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.account.delete()
    );

    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual(accountDeleteDTO);

    req.flush(null);
  });

  it('should return ApiError on delete account failure', (done) => {
    const accountDeleteDTO: AccountDeleteDTO = { password: 'password' };

    service.deleteAccount(accountDeleteDTO).subscribe({
      next: () => fail('Expected an error, not delete account success'),
      error: (error) => {
        expect(error).toEqual(mockBadRequestApiError);
        done();
      },
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.account.delete()
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(mockBadRequestApiError);
  });

  it('should return AccountDTO on successful registration', (done) => {
    service.register(mockAccountRegisterDTO).subscribe((response) => {
      expect(response).toEqual(mockAccountDTO);
      done();
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.account.register()
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockAccountDTO); // Simulate successful response
  });

  it('should return ApiError on registration failure', (done) => {
    service.register(mockAccountRegisterDTO).subscribe({
      next: () => {
        fail('Expected error');
      },
      error: (error) => {
        expect(error).toEqual(mockBadRequestApiError);
        done();
      },
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.account.register()
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockBadRequestApiError); // Simulate error response
  });
});
