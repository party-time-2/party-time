//implements F011
//implements F013
import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../+state/auth.state';
import { mergeMap } from 'rxjs';

export const BYPASS_LOG = new HttpContextToken(() => false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const vm$ = inject(AuthStore).vm$;

  if (req.context.get(BYPASS_LOG) === true) {
    return next(req);
  }

  return vm$.pipe(
    mergeMap((vm) => {
      const authReq = vm.loginResponseDTO?.token
        ? req.clone({
            setHeaders: {
              Authorization: vm.loginResponseDTO.token,
            },
          })
        : req;

      console.log('authReq', authReq);

      return next(authReq);
    })
  );
};
