//implements F011
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //const store$ = inject(Store);

  //let token = null;

  // store$.select(selectLoginResponseDTOToken).subscribe((storedToken) => {
  //   token = storedToken;
  // });

  // if (token) {
  //   req = req.clone({
  //     setHeaders: {
  //       Authorization: token,
  //     },
  //   });
  // }

  return next(req);
};
