//implements F001
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
}
