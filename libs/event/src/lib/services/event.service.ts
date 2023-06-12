//implements F001
//implements F016
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventCreateDTO, EventDTO } from '@party-time/models';
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
}
