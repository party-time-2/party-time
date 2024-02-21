import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { StorageService } from '../storage/storage.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountRegisterDTO, ApiError, ApiErrorStatus, LoginRequestDTO, LoginResponseDTO } from '@party-time/models';
import { environment } from '../../../environments/environment.development';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let mockStorageService: Partial<StorageService>;

  const mockVerifyEmailToken = 'eyJhbGci';
  const mockLoginResponse: LoginResponseDTO = { token: 'eyJhbGciOiJIUzM4NCJ9.eyJqdGkiOiJjOWE3YzdmYy05Mjg2LTQwNGEtOTc0Yy1hMWE1OTVjM2Y3OTYiLCJpYXQiOjE3MDg1MTI3MTMsImlzcyI6Imh0dHBzOi8vcGFydHl0aW1lLmRlL2F1dGgiLCJzdWIiOiIzYThjM2M2Ni03MzU3LTRlZjItODg1MC0xZDUxNjBlZTI4ODIiLCJlbWFpbCI6InZlcmlmaWVkNEBwYXJ0eXRpbWUuZGUiLCJuYW1lIjoiVmVyaWZpZWQgVXNlciA0IiwiZW1haWxfdmVyaWZpZWQiOnRydWV9.4IaM-lNItv2P8J06Ho1elQNn3qqvujoP6ymL7JEsa3dw1M2Np8YNOw7VWq_NO-bY' };
  const loginRequestDTO: LoginRequestDTO = { email: 'test', password: 'password' };

  const mockAccountRegisterDTO: AccountRegisterDTO = { email: 'test', password: 'password', name: 'test' };
  const mockAccountDTO = { email: 'test', name: 'test' };

  const mockBadRequestApiError: ApiError = { status: ApiErrorStatus['400 BAD_REQUEST'], timestamp: new Date(), message: 'Bad Request', error: { status: '400', message: 'Bad Request', timestamp: '2021-12-14T14:00:00.000Z' } };

  beforeEach( () =>
  {
    mockStorageService = {
       storeAuthToken: jest.fn(),
      removeAuthToken: jest.fn()
     };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: StorageService, useValue: mockStorageService }]
    })

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should store the token on successful login', done => {

    authService.login(loginRequestDTO).subscribe(response => {
      if ('token' in response) {
        expect(response.token).toEqual(mockLoginResponse.token);
      }
      expect(mockStorageService.storeAuthToken).toHaveBeenCalledWith(mockLoginResponse.token);
      done();
    });

    const req = httpTestingController.expectOne(environment.api.baseUrl + environment.api.endpoints.authentication.login);
    expect(req.request.method).toBe('POST');
    req.flush(mockLoginResponse); // Simulate successful response with a token
  });


  it('should not store a token if login response contains ApiError', done => {
    authService.login(loginRequestDTO).subscribe(response => {
      if ('error' in response && response.error) {
        expect(response).toEqual(mockBadRequestApiError);
        expect(mockStorageService.storeAuthToken).not.toHaveBeenCalled();
        done();
      } else {
        fail('Expected an ApiError');
      }
    });

    const req = httpTestingController.expectOne(environment.api.baseUrl + environment.api.endpoints.authentication.login);
    expect(req.request.method).toBe('POST');
    req.flush(mockBadRequestApiError);
  });


  it('should return AccountDTO on successful registration', done => {

    authService.register(mockAccountRegisterDTO).subscribe(response => {
      expect(response).toEqual(mockAccountDTO);
      done();
    });

    const req = httpTestingController.expectOne(environment.api.baseUrl + environment.api.endpoints.authentication.register);
    expect(req.request.method).toBe('POST');
    req.flush(mockAccountDTO); // Simulate successful response
  });


  it('should return ApiError on registration failure', done => {

    authService.register(mockAccountRegisterDTO).subscribe({
      next: () => {
        fail('Expected error');
      },
      error: error => {
        expect(error.error).toEqual(mockBadRequestApiError);
        done();
      }
    });

    const req = httpTestingController.expectOne(environment.api.baseUrl + environment.api.endpoints.authentication.register);
    expect(req.request.method).toBe('POST');
    req.flush(mockBadRequestApiError, { status: 400, statusText: 'Bad Request' }); // Simulate error response
  });

  it('should successfully verify email without returning a value', done => {

    authService.verifyEmail(mockVerifyEmailToken).subscribe({
      next: () => {
        done();
      },
      error: () => {
        fail('Should not have failed');
      }
    });

    const req = httpTestingController.expectOne(`${environment.api.baseUrl}${environment.api.endpoints.authentication.verifyEmail}/${mockVerifyEmailToken}`);
    expect(req.request.method).toBe('GET');
    req.flush(null); // Simulating a void response
  });


  it('should return an ApiError on failed email verification', done => {

    authService.verifyEmail(mockVerifyEmailToken).subscribe({
      next: () => {
        fail('Expected an error');
      },
      error: error => {
        expect(error.error).toEqual(mockBadRequestApiError);
        done();
      }
    });

    const req = httpTestingController.expectOne(`${environment.api.baseUrl}${environment.api.endpoints.authentication.verifyEmail}/${mockVerifyEmailToken}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBadRequestApiError, { status: 400, statusText: 'Bad Request' }); // Simulate error response
  });


  it('should remove the auth token on logout', () => {
    // Call the logout method
    authService.logout();

    // Verify that the storage service's removeAuthToken method was called
    expect(mockStorageService.removeAuthToken).toHaveBeenCalled();
  });
});
