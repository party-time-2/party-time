// implements F001
// implements F002
// implements F003
// implements F006
// implements F016
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventCreateDTO, EventDTO, ParticipantDTO } from '@party-time/models';
import { Observable } from 'rxjs';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}

  eventBasePath = '/api/event';

  // Creates a new event
  createEvent(event: EventCreateDTO): Observable<EventDTO> {
    return this.http.post<EventDTO>(this.eventBasePath, event);
  }

  // Gets all events
  getEvents(): Observable<EventDTO[]> {
    return this.http.get<EventDTO[]>(this.eventBasePath);
  }

  // Gets a single event
  getEvent(id: string): Observable<EventDTO> {
    return this.http.get<EventDTO>(`${this.eventBasePath}/${id}`);
  }

  // Updates an event
  updateEvent(event: EventDTO): Observable<EventDTO> {
    return this.http.put<EventDTO>(this.eventBasePath, event);
  }

  // Deletes an event
  deleteEvent(id: string) {
    return this.http.delete(`${this.eventBasePath}/${id}`);
  }

  // Gets all participants of an event
  getParticipants(id: string): Observable<ParticipantDTO[]> {
    return this.http.get<ParticipantDTO[]>(
      `${this.eventBasePath}/${id}/participants`
    );
  }

  // Removes a participant from an event
  removeParticipant(eventId: string, email: string): Observable<ParticipantDTO[]> {
    return this.http.delete<ParticipantDTO[]>(
      `${this.eventBasePath}/${eventId}/participants/${email}`
    );    
  }

  // Adds a participant to an event
  addParticipant(eventId: string, email: string): Observable<ParticipantDTO[]> {
    return this.http.post<ParticipantDTO[]>(
      `${this.eventBasePath}/${eventId}/participants/${email}`,
      {}
    );
  }
}
