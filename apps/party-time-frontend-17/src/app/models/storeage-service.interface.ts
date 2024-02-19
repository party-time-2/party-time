import { LoginResponseDTO } from '@party-time/models';

export interface IStoreageService {
  getToken(): LoginResponseDTO | null;
  storeToken(token: string): void;
  removeToken(key: string): void;
}
