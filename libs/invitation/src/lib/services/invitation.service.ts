// implements F008
// implements F009
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiError } from '@party-time/models';
import { Observable } from 'rxjs';

@Injectable()
export class InvitationService {
  constructor(private http: HttpClient) {}

  eventBasePath = '/api/event';

  acceptInvitation(eventId: string): Observable<HttpErrorResponse> {
    return this.http.post<HttpErrorResponse>(
      `${this.eventBasePath}/${eventId}/participants/invitation/accept`,
      { observe: 'response'}
    )
  }

  declineInvitation(eventId: string): Observable<HttpResponse<unknown> | ApiError> {
    return this.http.post<HttpResponse<unknown> | ApiError>(
      `${this.eventBasePath}/${eventId}/participants/invitation/decline`,
      {}
    );
  }
}
