import { HttpInterceptor } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../../storage/storage.service';
import { environment } from '../../../../environments/environment';

export class AuthInterceptor implements HttpInterceptor {
  storageService = inject(StorageService);

  intercept(req: any, next: any) {
    const excludedUrls: string[] = [
      environment.api.endpoints.authentication.login(),
      environment.api.endpoints.account.register(),
      environment.api.endpoints.authentication.verify(''),
    ];
    if (excludedUrls.includes(req.url)) {
      return next.handle(req);
    }
    const token = this.storageService.getAuthToken();
    if (!token) {
      return next.handle(req);
    }
    const authReq = req.clone({
      headers: req.headers.set('Authorization', token),
    });
    return next.handle(authReq);
  }
}
