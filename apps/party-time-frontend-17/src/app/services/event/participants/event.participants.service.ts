import { Injectable, inject } from '@angular/core';
import { IEventParticipantService } from '../../../models/event.participant.interface';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/party-time-frontend-17/src/environments/environment';
import { ParticipantEventDTO } from '../../../models/dto/event-dto.interface';
import { ApiError } from '../../../models/error.interface';

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
          return throwError(() => error.error as ApiError);
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
  getParticipatingEvents(): Observable<ParticipantEventDTO[]> {
    return this.http
      .get<ParticipantEventDTO[]>(
        environment.api.endpoints.event.participant.getParticipatingEvents()
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error.error as ApiError);
        })
      );
  }
  getParticipatingEvent(eventId: string): Observable<ParticipantEventDTO> {
    return this.http
      .get<ParticipantEventDTO>(
        environment.api.endpoints.event.participant.getParticipatingEvent(
          eventId
        )
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error.error as ApiError);
        })
      );
  }
}
