import { Injectable, inject } from '@angular/core';
import { IEventHostService } from '../../../models/event.host.interface';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';
import {
  OrganizerEventDTO,
  EventDetailsDTO,
  EventCreateDTO,
  AccountInvitationDetailsDTO,
  InvitationCreateDTO,
} from '../../../models/dto/event-dto.interface';
import { ApiError } from '../../../models/error.interface';

@Injectable({
  providedIn: 'root',
})
export class EventHostService implements IEventHostService {
  private http: HttpClient = inject(HttpClient);

  getOrganizedEvents(): Observable<EventDetailsDTO[]> {
    return this.http
      .get<EventDetailsDTO[]>(
        environment.api.endpoints.event.host.getOrganizedEvents()
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error.error as ApiError);
        })
      );
  }

  getEvent(eventId: number): Observable<OrganizerEventDTO> {
    return this.http
      .get<OrganizerEventDTO>(
        environment.api.endpoints.event.host.getEvent(eventId.toString())
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error.error as ApiError);
        })
      );
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.http
      .delete<void>(
        environment.api.endpoints.event.host.deleteEvent(eventId.toString())
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error.error as ApiError);
        })
      );
  }

  updateEvent(event: EventDetailsDTO): Observable<OrganizerEventDTO> {
    return this.http
      .patch<OrganizerEventDTO>(
        environment.api.endpoints.event.host.updateEvent(),
        event
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error.error as ApiError);
        })
      );
  }

  createEvent(event: EventCreateDTO): Observable<OrganizerEventDTO> {
    return this.http
      .post<OrganizerEventDTO>(
        environment.api.endpoints.event.host.createEvent(),
        event
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error.error as ApiError);
        })
      );
  }

  inviteParticipant(
    eventId: number,
    participantEmail: string
  ): Observable<InvitationCreateDTO[]> {
    return this.http
      .post<InvitationCreateDTO[]>(
        environment.api.endpoints.event.host.inviteParticipant(
          eventId.toString()
        ),
        { participantEmail }
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error.error as ApiError);
        })
      );
  }

  removeParticipant(
    eventId: number,
    participantEmail: string
  ): Observable<AccountInvitationDetailsDTO[]> {
    return this.http
      .delete<AccountInvitationDetailsDTO[]>(
        environment.api.endpoints.event.host.removeParticipant(
          eventId.toString(),
          participantEmail
        )
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error.error as ApiError);
        })
      );
  }

  getParticipants(eventId: number): Observable<AccountInvitationDetailsDTO[]> {
    return this.http
      .get<AccountInvitationDetailsDTO[]>(
        environment.api.endpoints.event.host.getParticipants(eventId.toString())
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error.error as ApiError);
        })
      );
  }
}
