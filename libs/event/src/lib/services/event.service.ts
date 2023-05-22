//implements F013
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventCreateDTO, EventDTO } from '@party-time/models';
import { Observable } from 'rxjs';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}

  createPath = '/api/event';

  // Creates a new event
  createEvent(event: EventCreateDTO): Observable<EventDTO> {
    return this.http.post<EventDTO>(this.createPath, event);
  }
}
