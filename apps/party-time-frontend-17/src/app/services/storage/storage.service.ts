import { Injectable } from '@angular/core';
import { IStorageService } from '../../models/storeage-service.interface';
import { environment } from '../../../environments/environment.development';

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
