import { TestBed } from '@angular/core/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpInterceptorFn,
} from '@angular/common/http';

import { AuthInterceptor } from './authInterceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StorageService } from '../../storage/storage.service';
import { environment } from '../../../../environments/environment';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let storageServiceMock: { getAuthToken: jest.Mock<any, any, any> };

  beforeEach(() => {
    storageServiceMock = {
      getAuthToken: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: StorageService, useValue: storageServiceMock },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding.
  });

  it('should pass through requests to excluded URLs without modification', () => {
    // Make an HTTP request to an excluded URL
    const http = TestBed.inject(HttpClient);
    http
      .get(environment.api.endpoints.authentication.login())
      .subscribe((response) => {
        expect(response).toBeTruthy();
      });

    // Expect the request to pass through without the Authorization header
    const req = httpMock.expectOne(
      environment.api.endpoints.authentication.login()
    );
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({}); // Respond with an empty object
  });

  it('should pass through requests to non-excluded URLs without a token without modification', () => {
    storageServiceMock.getAuthToken.mockReturnValue(null); // Simulate no token

    const nonExcludedUrl = '/api/any-data'; // Example non-excluded URL

    const http = TestBed.inject(HttpClient);
    http.get(nonExcludedUrl).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(nonExcludedUrl);
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should add an Authorization header to requests to non-excluded URLs with a token', () => {
    const token = 'some-token';
    storageServiceMock.getAuthToken.mockReturnValue(token); // Simulate token presence

    const nonExcludedUrl = '/api/secure-data'; // Example non-excluded URL

    const http = TestBed.inject(HttpClient);
    http.get(nonExcludedUrl).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(nonExcludedUrl);
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toEqual(token);
    req.flush({});
  });
});
