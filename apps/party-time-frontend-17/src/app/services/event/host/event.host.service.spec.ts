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

  it('should handle errors when getting organized events', () => {
    const mockError = {
      status: 500,
      statusText: 'Server Error',
      error: { message: 'Internal server error' },
    };

    service.getOrganizedEvents().subscribe((response) => {
      expect(response).toEqual(mockError.error); // Ensure the error is handled and transformed correctly
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.getOrganizedEvents()
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockError.error, {
      status: mockError.status,
      statusText: mockError.statusText,
    });
  });

  it('should handle errors when fetching a specific event', () => {
    const mockError = {
      status: 404,
      statusText: 'Not Found',
      error: { message: 'Event not found' },
    };

    service.getEvent(eventId).subscribe((response) => {
      expect(response).toEqual(mockError.error); // Ensure the error is handled and transformed correctly
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.getEvent(eventId.toString())
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockError.error, {
      status: mockError.status,
      statusText: mockError.statusText,
    });
  });

  it('should handle errors when deleting an event', () => {
    const mockError = {
      status: 403,
      statusText: 'Forbidden',
      error: { message: 'Not authorized to delete event' },
    };

    service.deleteEvent(eventId).subscribe((response) => {
      expect(response).toEqual(mockError.error); // Ensure the error is handled and transformed correctly
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.deleteEvent(eventId.toString())
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(mockError.error, {
      status: mockError.status,
      statusText: mockError.statusText,
    });
  });

  it('should handle errors when updating an event', () => {
    const mockError = {
      status: 400,
      statusText: 'Bad Request',
      error: { message: 'Invalid event data' },
    };

    service.updateEvent(mockEvent).subscribe((response) => {
      expect(response).toEqual(mockError.error); // Ensure the error is handled and transformed correctly
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.updateEvent()
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockError.error, {
      status: mockError.status,
      statusText: mockError.statusText,
    });
  });

  it('should handle errors when creating an event', () => {
    const mockError = {
      status: 400,
      statusText: 'Bad Request',
      error: { message: 'Invalid event data' },
    };
    const newEvent = {
      name: 'New Year Party',
      dateTime: new Date(),
      address: {
        addressLine: '123 Party St',
        city: 'Funville',
        zip: '12345',
        country: 'Wonderland',
      },
    };

    service.createEvent(newEvent).subscribe((response) => {
      expect(response).toEqual(mockError.error); // Check if error.error is returned as expected
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.createEvent()
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEvent);
    req.flush(mockError.error, {
      status: mockError.status,
      statusText: mockError.statusText,
    });
  });

  it('should handle errors when inviting a participant', () => {
    const mockError = {
      status: 404,
      statusText: 'Not Found',
      error: { message: 'Event not found' },
    };
    const participantEmail = 'guest@example.com';

    service
      .inviteParticipant(eventId, participantEmail)
      .subscribe((response) => {
        expect(response).toEqual(mockError.error); // Ensure the error is handled and transformed correctly
      });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.inviteParticipant(eventId.toString())
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ participantEmail });
    req.flush(mockError.error, {
      status: mockError.status,
      statusText: mockError.statusText,
    });
  });

  it('should handle errors when removing a participant', () => {
    const mockError = {
      status: 403,
      statusText: 'Forbidden',
      error: { message: 'Not authorized to remove participant' },
    };

    service
      .removeParticipant(eventId, participantEmail)
      .subscribe((response) => {
        expect(response).toEqual(mockError.error); // Check if error.error is returned as expected
      });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.removeParticipant(
        eventId.toString(),
        participantEmail
      )
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(mockError.error, {
      status: mockError.status,
      statusText: mockError.statusText,
    });
  });

  it('should handle errors when fetching participants for an event', () => {
    const mockError = {
      status: 500,
      statusText: 'Server Error',
      error: { message: 'Internal Server Error' },
    };

    service.getParticipants(eventId).subscribe((response) => {
      expect(response).toEqual(mockError.error); // Ensure the error is handled and transformed correctly
    });

    const req = httpTestingController.expectOne(
      environment.api.endpoints.event.host.getParticipants(eventId.toString())
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockError.error, {
      status: mockError.status,
      statusText: mockError.statusText,
    });
  });
});
