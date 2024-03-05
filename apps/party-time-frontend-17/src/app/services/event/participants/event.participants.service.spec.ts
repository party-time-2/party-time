import { TestBed } from '@angular/core/testing';

import { EventParticipantsService } from './event.participants.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('EventParticipantsService', () => {
  let service: EventParticipantsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventParticipantsService],
    });
    service = TestBed.inject(EventParticipantsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
