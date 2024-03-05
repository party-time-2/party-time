import { TestBed } from '@angular/core/testing';

import { EventParticipantsService } from './event.participants.service';

describe('EventParticipantsService', () => {
  let service: EventParticipantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventParticipantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
