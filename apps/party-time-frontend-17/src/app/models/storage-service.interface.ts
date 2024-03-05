/**
 * Represents a storage service interface.
 */
export interface IStorageService {
  /**
   * Retrieves the authentication token from storage.
   * @returns The authentication token, or null if not found.
   */
  getAuthToken(): string | null;

  /**
   * Stores the authentication token in storage.
   * @param token - The authentication token to store.
   */
  storeAuthToken(token: string): void;

  /**
   * Removes the authentication token from storage.
   */
  removeAuthToken(): void;
}
