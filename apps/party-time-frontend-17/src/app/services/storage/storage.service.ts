import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IStorageService } from '../../models/storage-service.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements IStorageService {
  getAuthToken(): string | null {
    return localStorage.getItem(environment.storage.key);
  }
  storeAuthToken(token: string): void {
    localStorage.setItem(environment.storage.key, token);
  }
  removeAuthToken(): void {
    localStorage.removeItem(environment.storage.key);
  }
}
