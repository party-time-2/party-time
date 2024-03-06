import { Injectable, inject } from '@angular/core';
import { IEventHostService } from '../../../models/event.host.interface';
import {
  AccountInvitationDetailsDTO,
  ApiError,
  EventDTO,
  ParticipantDTO,
} from '@party-time/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventHostService implements IEventHostService {
  private http: HttpClient = inject(HttpClient);

  getOrganizedEvents(): Observable<ApiError | EventDTO[]> {
    return this.http.get<ApiError | EventDTO[]>(
      environment.api.endpoints.event.host.getOrganizedEvents()
    );
  }
  getEvent(eventId: string): Observable<ApiError | EventDTO> {
    return this.http.get<ApiError | EventDTO>(
      environment.api.endpoints.event.host.getEvent(eventId)
    );
  }
  deleteEvent(eventId: string): Observable<void | ApiError> {
    return this.http.delete<void | ApiError>(
      environment.api.endpoints.event.host.deleteEvent(eventId)
    );
  }
  updateEvent(event: EventDTO): Observable<ApiError | EventDTO> {
    return this.http.put<ApiError | EventDTO>(
      environment.api.endpoints.event.host.updateEvent(),
      event
    );
  }
  createEvent(event: EventDTO): Observable<ApiError | EventDTO> {
    return this.http.post<ApiError | EventDTO>(
      environment.api.endpoints.event.host.createEvent(),
      event
    );
  }
  inviteParticipant(
    eventId: string,
    participantEmail: string
  ): Observable<ApiError | AccountInvitationDetailsDTO[]> {
    return this.http.post<ApiError | AccountInvitationDetailsDTO[]>(
      environment.api.endpoints.event.host.inviteParticipant(eventId),
      { participantEmail }
    );
  }
  removeParticipant(
    eventId: string,
    participantEmail: string
  ): Observable<ApiError | AccountInvitationDetailsDTO[]> {
    return this.http.delete<ApiError | AccountInvitationDetailsDTO[]>(
      environment.api.endpoints.event.host.removeParticipant(
        eventId,
        participantEmail
      )
    );
  }
  getParticipants(eventId: string): Observable<ApiError | ParticipantDTO[]> {
    return this.http.get<ApiError | ParticipantDTO[]>(
      environment.api.endpoints.event.host.getParticipants(eventId)
    );
  }
}
