import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DecodeTokenService {
  decodeToken(token: string) {
    if (!token) {
      return;
    }
    const _decodeToken = (token: string) => {
      try {
        return JSON.parse(atob(token));
      } catch {
        return;
      }
    };
    return token
      .split('.')
      .map((token) => _decodeToken(token))
      .reduce((acc, curr) => {
        if (curr) acc = { ...acc, ...curr };
        return acc;
      }, Object.create(null));
  }
}
