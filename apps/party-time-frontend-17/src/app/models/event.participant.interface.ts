import { Observable } from 'rxjs';
import { ParticipantEventDTO } from './dto/event-dto.interface';

/**
 * Represents a service for managing event participants.
 */
export interface IEventParticipantService {
  /**
   * Implements F009
   *
   * Handles declining an event invitation.
   *
   * @param eventId id of the event for which to decline an invitation
   * @param emptyBody An empty message body, as required by the HTTP POST method
   * @param authentication Authentication details of the user declining an event invitation
   */
  declineEvent(eventId: string): Observable<void>;

  /**
   * Implements F008
   *
   * Handles accepting an event invitation.
   *
   * @param eventId id of the event for which to accept an invitation
   * @param emptyBody An empty message body, as required by the HTTP POST method
   * @param authentication Authentication details of the user accepting an event invitation
   */
  acceptEvent(eventId: string): Observable<void>;

  /**
   * Retrieves a list of events in which the user is participating.
   * @returns An Observable that emits an array of ParticipantEventDTO or an ApiError.
   */
  getParticipatingEvents(): Observable<ParticipantEventDTO[]>;

  /**
   * Retrieves a specific event in which the user is participating.
   * @param eventId - The ID of the event.
   * @returns An Observable that emits a ParticipantEventDTO or an ApiError.
   */
  getParticipatingEvent(eventId: string): Observable<ParticipantEventDTO>;
}
