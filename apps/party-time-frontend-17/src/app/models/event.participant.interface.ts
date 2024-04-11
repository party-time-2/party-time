import { Observable } from 'rxjs';
import { ApiError } from './error.interface';
import { ParticipantEventDTO } from './dto/event-dto.interface';

/**
 * Represents a service for managing event participants.
 */
export interface IEventParticipantService {
  /**
   * Declines an event invitation.
   * @param eventId - The ID of the event.
   * @returns An Observable that emits void or an ApiError.
   */
  declineEvent(eventId: string): Observable<void>;

  /**
   * Accepts an event invitation.
   * @param eventId - The ID of the event.
   * @returns An Observable that emits void or an ApiError.
   */
  acceptEvent(eventId: string): Observable<void>;

  /**
   * Retrieves a list of events in which the user is participating.
   * @returns An Observable that emits an array of ParticipantEventDTO or an ApiError.
   */
  getParticipaintingEvents(): Observable<ParticipantEventDTO[]>;

  /**
   * Retrieves a specific event in which the user is participating.
   * @param eventId - The ID of the event.
   * @returns An Observable that emits a ParticipantEventDTO or an ApiError.
   */
  getParticipaintingEvent(eventId: string): Observable<ParticipantEventDTO>;
}
