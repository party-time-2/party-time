import { Injectable, inject } from '@angular/core';
import { IEventParticipantService } from '../../../models/event.participant.interface';
import { ApiError, ParticipantEventDTO } from '@party-time/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { env } from 'process';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventParticipantsService implements IEventParticipantService {
  private http: HttpClient = inject(HttpClient);

  declineEvent(eventId: string): Observable<void | ApiError> {
    return this.http.post<void | ApiError>(
      environment.api.endpoints.event.participant.declineEvent(eventId),
      {}
    );
  }
  acceptEvent(eventId: string): Observable<void | ApiError> {
    return this.http.post<void | ApiError>(
      environment.api.endpoints.event.participant.acceptEvent(eventId),
      {}
    );
  }
  getParticipaintingEvents(): Observable<ApiError | ParticipantEventDTO[]> {
    return this.http.get<ApiError | ParticipantEventDTO[]>(
      environment.api.endpoints.event.participant.getParticipatingEvents()
    );
  }
  getParticipaintingEvent(
    eventId: string
  ): Observable<ApiError | ParticipantEventDTO> {
    return this.http.get<ApiError | ParticipantEventDTO>(
      environment.api.endpoints.event.participant.getParticipatingEvent(eventId)
    );
  }
}
