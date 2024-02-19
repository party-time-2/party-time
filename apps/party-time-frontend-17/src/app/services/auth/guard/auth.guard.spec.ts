import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../auth.service';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should call isAuthenticated', () => {
    const isAuthenticatedSpy = jest.spyOn(authService, 'isAuthenticated');
    const routeSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    executeGuard(routeSnapshot, null as any);
    expect(isAuthenticatedSpy).toHaveBeenCalled();
  });
});
