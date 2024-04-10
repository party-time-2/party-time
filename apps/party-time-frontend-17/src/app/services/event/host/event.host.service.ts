import { Injectable, inject } from '@angular/core';
import { IEventHostService } from '../../../models/event.host.interface';
import {
  AccountInvitationDetailsDTO,
  ApiError,
  EventCreateDTO,
  EventDTO,
  EventDetailsDTO,
  OrganizerEventDTO,
  ParticipantDTO,
} from '@party-time/models';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventHostService implements IEventHostService {
  private http: HttpClient = inject(HttpClient);

  getOrganizedEvents(): Observable<OrganizerEventDTO[]> {
    return this.http
      .get<ApiError | OrganizerEventDTO[]>(
        environment.api.endpoints.event.host.getOrganizedEvents()
      )
      .pipe(
        map((response: ApiError | OrganizerEventDTO[]) => {
          if (response instanceof Array) {
            return response;
          } else {
            throw response as ApiError;
          }
        })
      );
  }

  getEvent(eventId: string): Observable<OrganizerEventDTO> {
    return this.http
      .get<ApiError | OrganizerEventDTO>(
        environment.api.endpoints.event.host.getEvent(eventId)
      )
      .pipe(
        map((response: ApiError | OrganizerEventDTO) => {
          if (response instanceof Object) {
            return response as OrganizerEventDTO;
          } else {
            throw response as ApiError;
          }
        })
      );
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http
      .delete<void | ApiError>(
        environment.api.endpoints.event.host.deleteEvent(eventId)
      )
      .pipe(
        map((response: void | ApiError) => {
          if (response === null) {
            return;
          } else {
            throw response as ApiError;
          }
        })
      );
  }

  updateEvent(event: EventDetailsDTO): Observable<OrganizerEventDTO> {
    return this.http
      .put<ApiError | OrganizerEventDTO>(
        environment.api.endpoints.event.host.updateEvent(),
        event
      )
      .pipe(
        map((response: ApiError | OrganizerEventDTO) => {
          if (response instanceof Object) {
            return response as OrganizerEventDTO;
          } else {
            throw response as ApiError;
          }
        })
      );
  }

  createEvent(event: EventCreateDTO): Observable<OrganizerEventDTO> {
    return this.http
      .post<ApiError | OrganizerEventDTO>(
        environment.api.endpoints.event.host.createEvent(),
        event
      )
      .pipe(
        map((response: ApiError | OrganizerEventDTO) => {
          if (response instanceof Object) {
            return response as OrganizerEventDTO;
          } else {
            throw response as ApiError;
          }
        })
      );
  }

  inviteParticipant(
    eventId: string,
    participantEmail: string
  ): Observable<AccountInvitationDetailsDTO[]> {
    return this.http
      .post<ApiError | AccountInvitationDetailsDTO[]>(
        environment.api.endpoints.event.host.inviteParticipant(eventId),
        { participantEmail }
      )
      .pipe(
        map((response: ApiError | AccountInvitationDetailsDTO[]) => {
          if (response instanceof Array) {
            return response;
          } else {
            throw response as ApiError;
          }
        })
      );
  }

  removeParticipant(
    eventId: string,
    participantEmail: string
  ): Observable<AccountInvitationDetailsDTO[]> {
    return this.http
      .delete<ApiError | AccountInvitationDetailsDTO[]>(
        environment.api.endpoints.event.host.removeParticipant(
          eventId,
          participantEmail
        )
      )
      .pipe(
        map((response: ApiError | AccountInvitationDetailsDTO[]) => {
          if (response instanceof Array) {
            return response;
          } else {
            throw response as ApiError;
          }
        })
      );
  }

  getParticipants(eventId: string): Observable<ParticipantDTO[]> {
    return this.http
      .get<ApiError | ParticipantDTO[]>(
        environment.api.endpoints.event.host.getParticipants(eventId)
      )
      .pipe(
        map((response: ApiError | ParticipantDTO[]) => {
          if (response instanceof Array) {
            return response;
          } else {
            throw response as ApiError;
          }
        })
      );
  }
}
