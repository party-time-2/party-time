import { TestBed } from '@angular/core/testing';

import { EventHostService } from './event.host.service';

describe('EventHostService', () => {
  let service: EventHostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventHostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
