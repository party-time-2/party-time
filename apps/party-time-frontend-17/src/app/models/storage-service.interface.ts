export interface IStorageService {
  getAuthToken(): string | null;
  storeAuthToken(token: string): void;
  removeAuthToken(): void;
}
