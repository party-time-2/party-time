import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../../storage/storage.service';
import { environment } from '../../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const storageService = inject(StorageService);

  const excludedUrls: string[] = [
    environment.api.endpoints.authentication.login(),
    environment.api.endpoints.account.register(),
    environment.api.endpoints.authentication.verify(''),
  ];
  if (excludedUrls.includes(req.url) && req.method === 'POST') {
    return next(req);
  }
  const token = storageService.getAuthToken();
  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    headers: req.headers.set('Authorization', token),
  });
  return next(authReq);
};
