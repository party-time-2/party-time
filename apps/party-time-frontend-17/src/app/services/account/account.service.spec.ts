import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  AccountDeleteDTO,
  AccountRegisterDTO,
  ApiError,
  ApiErrorStatus,
  ChangePasswordDTO,
} from '@party-time/models';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';

describe('AccountService', () => {
  let service: AccountService;
  let httpTestingController: HttpTestingController;
  const mockAccountRegisterDTO: AccountRegisterDTO = {
    email: 'test',
    password: 'password',
    name: 'test',
  };
  const mockAccountDTO = { email: 'test', name: 'test' };

  const mockBadRequestApiError: ApiError = {
    status: ApiErrorStatus['400 BAD_REQUEST'],
    timestamp: new Date(),
    message: 'Bad Request',
    error: {
      status: '400',
      message: 'Bad Request',
      timestamp: '2021-12-14T14:00:00.000Z',
    },
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
        expect(error.error).toEqual(mockBadRequestApiError);
        done();
      },
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.account.register()
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockBadRequestApiError, {
      status: 400,
      statusText: 'Bad Request',
    }); // Simulate error response
  });
});
