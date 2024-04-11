import { TestBed } from '@angular/core/testing';

import { EventHostService } from './event.host.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';
import {
  AccountInvitationDetailsDTO,
  EventDetailsDTO,
  OrganizerEventDTO,
  Status,
} from '../../../models/dto/event-dto.interface';

describe('EventHostService', () => {
  let service: EventHostService;
  let httpTestingController: HttpTestingController;
  const eventId = 1;
  const mockEvent: EventDetailsDTO = {
    id: 1,
    name: 'Test Event',
    dateTime: new Date(),
    address: {
      addressLine: 'Test Street 1',
      zip: '12345',
      city: 'Test City',
      country: 'Test Country',
    },
  };
  const mockEvents: EventDetailsDTO[] = [mockEvent, mockEvent];
  const participantEmail = 'mockParticipantEmail';
  const mockParticipants: AccountInvitationDetailsDTO[] = [];

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
    service.getEvent(eventId).subscribe((response) => {
      expect(response).toEqual(mockEvent);
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.getEvent(eventId.toString())
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockEvent);
  });

  it('should delete an event', () => {
    service.deleteEvent(eventId).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.deleteEvent(eventId.toString())
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
      status: Status.INVITED,
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
      environment.api.endpoints.event.host.inviteParticipant(eventId.toString())
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
        eventId.toString(),
        participantEmail
      )
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(mockParticipants);
  });

  it('should get participants', () => {
    service.getParticipants(eventId).subscribe((response) => {
      expect(response).toEqual(mockParticipants);
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.getParticipants(eventId.toString())
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockParticipants);
  });
});
