import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { authGuard } from './auth.guard';
import { AuthService } from '../auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock implementations
const mockRouter = {
  navigate: jest.fn(),
};

const authServiceMock = {
  isLoggedIn: jest.fn(),
};

describe('authGuard', () => {
  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: mockRouter },
      ],
    });

    // Reset mocks before each test
    mockRouter.navigate.mockReset();
    authServiceMock.isLoggedIn.mockReset();
  });

  it('should allow route activation for authenticated user', (done) => {
    authServiceMock.isLoggedIn.mockReturnValue(true); // Simulate authenticated user

    // Execute the guard and normalize the output to an Observable
    const result = TestBed.runInInjectionContext(() =>
      authGuard(mockRoute, mockState)
    );

    // Normalize the return value to an Observable
    const resultObservable = result instanceof Observable ? result : of(result);

    resultObservable.subscribe((isAllowed) => {
      expect(isAllowed).toBeTruthy();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should redirect to login for unauthenticated user', (done) => {
    authServiceMock.isLoggedIn.mockReturnValue(false); // Simulate unauthenticated user

    const result = TestBed.runInInjectionContext(() =>
      authGuard(mockRoute, mockState)
    );

    // Normalize the return value to an Observable
    const resultObservable = result instanceof Observable ? result : of(result);

    resultObservable.subscribe((isAllowed) => {
      expect(isAllowed).toBeFalsy();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
      done();
    });
  });
});
