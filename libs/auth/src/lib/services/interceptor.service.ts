//implements F011
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import {
  selectAuthState,
  selectLoginResponseDTOToken,
} from '../+state/auth.selectors';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store$ = inject(Store);

  let token = null;

  store$.select(selectLoginResponseDTOToken).subscribe((storedToken) => {
    token = storedToken;
  });

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  }

  return next(req);
};
