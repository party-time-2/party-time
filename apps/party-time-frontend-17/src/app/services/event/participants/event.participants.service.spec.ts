import { TestBed } from '@angular/core/testing';

import { EventParticipantsService } from './event.participants.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';
import {
  ParticipantEventDTO,
  Status,
} from '../../../models/dto/event-dto.interface';

describe('EventParticipantsService', () => {
  let service: EventParticipantsService;
  let httpTestingController: HttpTestingController;
  const eventId = '1';
  const mockEvent: ParticipantEventDTO = {
    invitationDetailsDTO: {
      id: 1,
      status: Status.PARTICIPATING,
    },
    organizedEventDetailsDTO: {
      id: 1,
      name: 'Test Event',
      dateTime: new Date(),
      organizer: {
        email: 'test@test.de',
        id: 1,
        name: 'Test',
      },
      address: {
        addressLine: 'Test Street 1',
        zip: '12345',
        city: 'Test City',
        country: 'Test Country',
      },
    },
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
    service.getParticipatingEvents().subscribe((response) => {
      expect(response).toEqual(mockEvents);
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.participant.getParticipatingEvents()
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents);
  });

  it('should get participating event', () => {
    service.getParticipatingEvent(eventId).subscribe((response) => {
      expect(response).toEqual(mockEvent);
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.participant.getParticipatingEvent(eventId)
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockEvent);
  });

  it('should handle errors on declining an event', () => {
    const mockError = {
      status: 404,
      statusText: 'Not Found',
      error: { message: 'Event not found' },
    };

    service.declineEvent(eventId).subscribe((response) => {
      expect(response).toEqual(mockError.error); // Check if error.error is returned as expected
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.participant.declineEvent(eventId)
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockError.error, {
      status: mockError.status,
      statusText: mockError.statusText,
    });
  });

  it('should handle errors on accepting an event', () => {
    const mockError = {
      status: 500,
      statusText: 'Server Error',
      error: { message: 'Internal Server Error' },
    };

    service.acceptEvent(eventId).subscribe((response) => {
      expect(response).toEqual(mockError.error); // Check if error.error is returned as expected
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.participant.acceptEvent(eventId)
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockError.error, {
      status: mockError.status,
      statusText: mockError.statusText,
    });
  });

  it('should handle errors on fetching participating events', () => {
    const mockError = {
      status: 400,
      statusText: 'Bad Request',
      error: { message: 'Invalid parameters' },
    };

    service.getParticipatingEvents().subscribe((response) => {
      expect(response).toEqual(mockError.error); // Check if error.error is returned as expected
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.participant.getParticipatingEvents()
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockError.error, {
      status: mockError.status,
      statusText: mockError.statusText,
    });
  });

  it('should handle errors on fetching a specific participating event', () => {
    const mockError = {
      status: 403,
      statusText: 'Forbidden',
      error: { message: 'Access denied' },
    };

    service.getParticipatingEvent(eventId).subscribe((response) => {
      expect(response).toEqual(mockError.error); // Check if error.error is returned as expected
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.participant.getParticipatingEvent(eventId)
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockError.error, {
      status: mockError.status,
      statusText: mockError.statusText,
    });
  });
});
