import { Injectable } from '@angular/core';
import { IStoreageService } from '../../models/storeage-service.interface';
import { LoginResponseDTO } from '@party-time/models';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements IStoreageService {
  removeToken(key: string): void {
    throw new Error('Method not implemented.');
  }
  getToken(): LoginResponseDTO | null {
    throw new Error('Method not implemented.');
  }
  storeToken(token: string): void {
    throw new Error('Method not implemented.');
  }
}
