//implements F011
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../+state/auth.state';
import { mergeMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const vm$ = inject(AuthStore).vm$;

  return vm$.pipe(
    mergeMap((vm) => {
      const authReq = vm.loginResponseDTO?.token
        ? req.clone({
            setHeaders: {
              Authorization: vm.loginResponseDTO.token,
            },
          })
        : req;

      return next(authReq);
    })
  );
};
