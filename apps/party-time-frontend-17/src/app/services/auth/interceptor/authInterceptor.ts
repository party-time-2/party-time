import {
  HttpHandlerFn,
  HttpInterceptor,
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
  console.log('AuthInterceptor: ', req);

  const excludedUrls: string[] = [
    environment.api.endpoints.authentication.login(),
    environment.api.endpoints.account.register(),
    environment.api.endpoints.authentication.verify(''),
  ];
  if (excludedUrls.includes(req.url) && req.method === 'POST') {
    console.log('AuthInterceptor[excluded]: ', req);
    return next(req);
  }
  const token = storageService.getAuthToken();
  if (!token) {
    console.log('AuthInterceptor[no token]: ', req);
    return next(req);
  }
  console.log('AuthInterceptor[token]: ', token);

  const authReq = req.clone({
    headers: req.headers.set('Authorization', token),
  });
  console.log('AuthInterceptor[cloned]: ', authReq);
  return next(authReq);
};
