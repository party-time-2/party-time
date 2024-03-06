import { TestBed } from '@angular/core/testing';

import { EventHostService } from './event.host.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';
import {
  AccountInvitationDetailsDTO,
  EventDTO,
  ParticipantDTO,
  ParticipantStatus,
} from '@party-time/models';

describe('EventHostService', () => {
  let service: EventHostService;
  let httpTestingController: HttpTestingController;
  const eventId = '1';
  const mockEvent: EventDTO = {
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
  };
  const mockEvents: EventDTO[] = [mockEvent, mockEvent];
  const participantEmail = 'mockParticipantEmail';
  const mockParticipants: ParticipantDTO[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventHostService],
    });
    service = TestBed.inject(EventHostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get organized events', () => {
    service.getOrganizedEvents().subscribe((response) => {
      expect(response).toEqual(mockEvents);
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.getOrganizedEvents()
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents);
  });

  it('should get an event', () => {
    const eventId = 'mockEventId';

    service.getEvent(eventId).subscribe((response) => {
      expect(response).toEqual(mockEvent);
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.getEvent(eventId)
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockEvent);
  });

  it('should delete an event', () => {
    service.deleteEvent(eventId).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.deleteEvent(eventId)
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should update an event', () => {
    service.updateEvent(mockEvent).subscribe((response) => {
      expect(response).toEqual(mockEvent);
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.updateEvent()
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockEvent);
    req.flush(mockEvent);
  });

  it('should create an event', () => {
    service.createEvent(mockEvent).subscribe((response) => {
      expect(response).toEqual(mockEvent);
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.createEvent()
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockEvent);
    req.flush(mockEvent);
  });

  it('should invite a participant', () => {
    const invidedParticipant: AccountInvitationDetailsDTO = {
      id: 0,
      status: ParticipantStatus.INVITED,
      invitee: {
        id: 0,
        name: 'string',
        email: 'string',
      },
    };
    service
      .inviteParticipant(eventId, participantEmail)
      .subscribe((response) => {
        expect(response).toEqual([invidedParticipant]);
      });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.inviteParticipant(eventId)
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ participantEmail });
    req.flush([invidedParticipant]);
  });

  it('should remove a participant', () => {
    service
      .removeParticipant(eventId, participantEmail)
      .subscribe((response) => {
        expect(response).toEqual(mockParticipants);
      });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.removeParticipant(
        eventId,
        participantEmail
      )
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(mockParticipants);
  });

  it('should get participants', () => {
    const eventId = 'mockEventId';
    service.getParticipants(eventId).subscribe((response) => {
      expect(response).toEqual(mockParticipants);
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.getParticipants(eventId)
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockParticipants);
  });
});
