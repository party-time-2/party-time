import { TestBed } from '@angular/core/testing';

import { EventParticipantsService } from './event.participants.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';
import { ParticipantEventDTO, ParticipantStatus } from '@party-time/models';

describe('EventParticipantsService', () => {
  let service: EventParticipantsService;
  let httpTestingController: HttpTestingController;
  const eventId = '1';
  const mockEvent: ParticipantEventDTO = {
    id: '1',
    name: 'Abschlussfeier von Gustav Gans',
    organizer: {
      id: 1,
      name: 'Gustav Gans',
      email: 'gustav@gans.de',
      emailVerified: true,
    },
    dateTime: new Date().toISOString(),
    address: {
      addressLine: 'Entenstraße 1',
      addressLineAddition: '',
      zip: '12345',
      city: 'Entenhausen',
      country: 'Deutschland',
    },
    participants: [],
    participatingStatus: ParticipantStatus.PARTICIPATING,
  };

  const mockEvents: ParticipantEventDTO[] = [mockEvent];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventParticipantsService],
    });
    service = TestBed.inject(EventParticipantsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should decline an event', () => {
    service.declineEvent(eventId).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.participant.declineEvent(eventId)
    );
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });

  it('should accept an event', () => {
    service.acceptEvent(eventId).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.participant.acceptEvent(eventId)
    );
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });

  it('should get participating events', () => {
    service.getParticipaintingEvents().subscribe((response) => {
      expect(response).toEqual(mockEvents);
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.participant.getParticipatingEvents()
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents);
  });

  it('should get participating event', () => {
    service.getParticipaintingEvent(eventId).subscribe((response) => {
      expect(response).toEqual(mockEvent);
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.participant.getParticipatingEvent(eventId)
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockEvent);
  });
});
