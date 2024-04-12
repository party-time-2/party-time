import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { StorageService } from '../storage/storage.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import {
  LoginResponseDTO,
  LoginRequestDTO,
} from '../../models/dto/auth-dto.interface';
import { ApiError, ApiErrorStatus } from '../../models/error.interface';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let mockStorageService: Partial<StorageService>;

  const mockVerifyEmailToken = 'eyJhbGci';
  const mockLoginResponse: LoginResponseDTO = {
    token:
      'eyJhbGciOiJIUzM4NCJ9.eyJqdGkiOiJjOWE3YzdmYy05Mjg2LTQwNGEtOTc0Yy1hMWE1OTVjM2Y3OTYiLCJpYXQiOjE3MDg1MTI3MTMsImlzcyI6Imh0dHBzOi8vcGFydHl0aW1lLmRlL2F1dGgiLCJzdWIiOiIzYThjM2M2Ni03MzU3LTRlZjItODg1MC0xZDUxNjBlZTI4ODIiLCJlbWFpbCI6InZlcmlmaWVkNEBwYXJ0eXRpbWUuZGUiLCJuYW1lIjoiVmVyaWZpZWQgVXNlciA0IiwiZW1haWxfdmVyaWZpZWQiOnRydWV9.4IaM-lNItv2P8J06Ho1elQNn3qqvujoP6ymL7JEsa3dw1M2Np8YNOw7VWq_NO-bY',
  };
  const loginRequestDTO: LoginRequestDTO = {
    email: 'test',
    password: 'password',
  };

  const mockBadRequestApiError: ApiError = {
    status: ApiErrorStatus['400 BAD_REQUEST'],
    timestamp: new Date(),
    message: 'Bad Request',
    additionalInformation: {
      status: '400',
      message: 'Bad Request',
      timestamp: '2021-12-14T14:00:00.000Z',
    },
  };

  beforeEach(() => {
    mockStorageService = {
      storeAuthToken: jest.fn(),
      removeAuthToken: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: StorageService, useValue: mockStorageService },
      ],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should store the token on successful login', (done) => {
    authService.login(loginRequestDTO).subscribe((response) => {
      if ('token' in response) {
        expect(response.token).toEqual(mockLoginResponse.token);
      }
      expect(mockStorageService.storeAuthToken).toHaveBeenCalledWith(
        mockLoginResponse.token
      );
      done();
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.authentication.login()
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockLoginResponse); // Simulate successful response with a token
  });

  it('should successfully verify email without returning a value', (done) => {
    authService.verifyEmail(mockVerifyEmailToken).subscribe({
      next: () => {
        done();
      },
      error: () => {
        fail('Should not have failed');
      },
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.authentication.verify(mockVerifyEmailToken)
    );
    expect(req.request.method).toBe('POST');
    req.flush(null); // Simulating a void response
  });

  it('should remove the auth token on logout', () => {
    // Call the logout method
    authService.logout();

    // Verify that the storage service's removeAuthToken method was called
    expect(mockStorageService.removeAuthToken).toHaveBeenCalled();
  });

  it('should throw an error if login response does not contain a valid token', (done) => {
    const invalidResponse = {}; // Simulating an invalid response

    authService.login(loginRequestDTO).subscribe({
      next: () => {
        fail('Expected to throw an Invalid response error');
      },
      error: (error) => {
        expect(error.message).toEqual('Invalid response');
        done();
      },
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.authentication.login()
    );
    expect(req.request.method).toBe('POST');
    req.flush(invalidResponse); // Simulate invalid response
  });

  it('should return true from isAuthenticated when a token exists', (done) => {
    // Mock getAuthToken to simulate the presence of an auth token
    mockStorageService.getAuthToken = jest
      .fn()
      .mockReturnValue(mockLoginResponse.token);

    authService.isAuthenticated().subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBe(true);
      done();
    });
  });

  it('should return false from isAuthenticated when no token exists', (done) => {
    // Mock getAuthToken to simulate the absence of an auth token
    mockStorageService.getAuthToken = jest.fn().mockReturnValue(null);

    authService.isAuthenticated().subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBe(false);
      done();
    });
  });

  it('should store the token on successful login', (done) => {
    const mockLoginRequestDTO: LoginRequestDTO = {
      email: 'test',
      password: 'password',
    };
    const mockLoginResponse: LoginResponseDTO = {
      token: 'mockToken',
    };

    authService.login(mockLoginRequestDTO).subscribe((response) => {
      expect(response).toEqual(mockLoginResponse);
      expect(mockStorageService.storeAuthToken).toHaveBeenCalledWith(
        mockLoginResponse.token
      );
      done();
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.authentication.login()
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockLoginResponse);
  });

  it('should return an ApiError on failed email verification', (done) => {
    const apiErrorResponse = { status: 400, message: 'Invalid token' };

    authService.verifyEmail(mockVerifyEmailToken).subscribe({
      next: (error) => {
        expect(error).toEqual(apiErrorResponse);
        done();
      },
      error: () => {
        fail('Expected to handle the error without failing');
      },
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.authentication.verify(mockVerifyEmailToken)
    );
    expect(req.request.method).toBe('POST');
    req.flush(apiErrorResponse, { status: 400, statusText: 'Bad Request' });
  });
});
