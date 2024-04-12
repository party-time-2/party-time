import { Injectable, inject } from '@angular/core';
import { IEventParticipantService } from '../../../models/event.participant.interface';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';
import { ParticipantEventDTO } from '../../../models/dto/event-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class EventParticipantsService implements IEventParticipantService {
  private http: HttpClient = inject(HttpClient);

  declineEvent(eventId: string): Observable<void> {
    return this.http
      .post<void>(
        environment.api.endpoints.event.participant.declineEvent(eventId),
        {}
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }
  acceptEvent(eventId: string): Observable<void> {
    return this.http
      .post<void>(
        environment.api.endpoints.event.participant.acceptEvent(eventId),
        {}
      )
      .pipe(
        catchError((error) => {
          return of(error);
        })
      );
  }
  getParticipaintingEvents(): Observable<ParticipantEventDTO[]> {
    return this.http
      .get<ParticipantEventDTO[]>(
        environment.api.endpoints.event.participant.getParticipatingEvents()
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }
  getParticipaintingEvent(eventId: string): Observable<ParticipantEventDTO> {
    return this.http
      .get<ParticipantEventDTO>(
        environment.api.endpoints.event.participant.getParticipatingEvent(
          eventId
        )
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }
}
