import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment.development';

describe('StorageService', () => {
  let service: StorageService;
    const testToken = 'eyJhbGciOiJIUzM4NCJ9.eyJqdGkiOiJjOWE3YzdmYy05Mjg2LTQwNGEtOTc0Yy1hMWE1OTVjM2Y3OTYiLCJpYXQiOjE3MDg1MTI3MTMsImlzcyI6Imh0dHBzOi8vcGFydHl0aW1lLmRlL2F1dGgiLCJzdWIiOiIzYThjM2M2Ni03MzU3LTRlZjItODg1MC0xZDUxNjBlZTI4ODIiLCJlbWFpbCI6InZlcmlmaWVkNEBwYXJ0eXRpbWUuZGUiLCJuYW1lIjoiVmVyaWZpZWQgVXNlciA0IiwiZW1haWxfdmVyaWZpZWQiOnRydWV9.4IaM-lNItv2P8J06Ho1elQNn3qqvujoP6ymL7JEsa3dw1M2Np8YNOw7VWq_NO-bY';
  // Mock localStorage setup
  beforeEach(() => {
   TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });


  it('should store auth token to localStorage', () => {
    service.storeAuthToken(testToken);
    expect(localStorage.setItem).toHaveBeenCalledWith(environment.storage.key, testToken);
  });

  it('should remove auth token from localStorage', () => {
    service.removeAuthToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith(environment.storage.key);
  });

  it('should get auth token from localStorage', () => {
    service.getAuthToken();
    expect(localStorage.getItem).toHaveBeenCalledWith(environment.storage.key);
  });
});
