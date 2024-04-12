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
      getAuthToken: jest.fn(),
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

  describe('isAuthenticated', () => {
    it('should return true if the user is authenticated', () => {
      mockStorageService.getAuthToken = jest.fn().mockReturnValue('token');

      authService.isAuthenticated().subscribe((authStatus) => {
        expect(authStatus).toBe(true);
      });
    });

    it('should return false if the user is not authenticated', () => {
      mockStorageService.getAuthToken = jest.fn().mockReturnValue(null);
      authService.isAuthenticated().subscribe((authStatus) => {
        expect(authStatus).toBe(false);
      });
    });
  });

  describe('login', () => {
    it('should store the token on successful login', () => {
      mockStorageService.storeAuthToken = jest.fn();
      authService.login(loginRequestDTO).subscribe((response) => {
        expect(response).toEqual(mockLoginResponse);
        expect(mockStorageService.storeAuthToken).toHaveBeenCalledWith(
          mockLoginResponse.token
        );
      });

      const req = httpTestingController.expectOne(
        environment.api.endpoints.authentication.login()
      );
      expect(req.request.method).toEqual('POST');
      req.flush(mockLoginResponse);
    });

    it('should throw error on invalid response', () => {
      authService.login(loginRequestDTO).subscribe({
        next: (response) => fail('should have failed with the error'),
        error: (error) => {
          expect(error.message).toEqual('Invalid response');
        },
      });

      const req = httpTestingController.expectOne(
        environment.api.endpoints.authentication.login()
      );
      req.flush({}); // Simulating an invalid response without a token
    });
  });

  describe('logout', () => {
    it('should remove the token and update auth status', () => {
      mockStorageService.removeAuthToken = jest.fn();
      authService.logout();
      expect(mockStorageService.removeAuthToken).toHaveBeenCalled();
      authService.isAuthenticated().subscribe((authStatus) => {
        expect(authStatus).toBe(false);
      });
    });
  });

  describe('verifyEmail', () => {
    it('should handle the response correctly on email verification', () => {
      authService.verifyEmail(mockVerifyEmailToken).subscribe({
        next: (response) => expect(response).toEqual({}),
        error: () => fail('Should have succeeded'),
      });

      const req = httpTestingController.expectOne(
        environment.api.endpoints.authentication.verify(mockVerifyEmailToken)
      );
      expect(req.request.method).toEqual('POST');
      req.flush({});
    });

    it('should return error information on failure', () => {
      authService.verifyEmail(mockVerifyEmailToken).subscribe({
        next: (response) => fail('Should have failed'),
        error: (error) => expect(error).toEqual(mockBadRequestApiError),
      });

      const req = httpTestingController.expectOne(
        environment.api.endpoints.authentication.verify(mockVerifyEmailToken)
      );
      req.flush(mockBadRequestApiError, {
        status: 400,
        statusText: 'Bad Request',
      });
    });
  });

  describe('isLoggedIn', () => {
    it('should return true when there is a token', () => {
      // Simulate a scenario where the token is present in the storage service
      mockStorageService.getAuthToken = jest.fn().mockReturnValue('token');

      // Trigger any method that updates the authStatus based on the token presence
      authService.logout(); // This will call hasToken() internally and update authStatus$

      const isLoggedIn = authService.isLoggedIn();
      expect(isLoggedIn).toBe(true);
    });

    it('should return false when there is no token', () => {
      // Simulate a scenario where the token is not present
      mockStorageService.getAuthToken = jest.fn().mockReturnValue(null);

      // Trigger any method that updates the authStatus based on the token presence
      authService.logout(); // This will call hasToken() internally and update authStatus$

      const isLoggedIn = authService.isLoggedIn();
      expect(isLoggedIn).toBe(false);
    });
  });
});
