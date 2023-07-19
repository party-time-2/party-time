import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InvitationService {
  constructor(private http: HttpClient) {}

  eventBasePath = '/api/event';

  acceptInvitation(eventId: string) {
    return this.http.post(
      `${this.eventBasePath}/${eventId}/participants/invitation/accept`,
      {}
    );
  }

  declineInvitation(eventId: string) {
    return this.http.post(
      `${this.eventBasePath}/${eventId}/participants/invitation/decline`,
      {}
    );
  }
}
