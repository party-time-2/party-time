import { ApiError, EventDTO, ParticipantDTO } from '@party-time/models';
import { Observable } from 'rxjs';

/**
 * Represents a service for managing event hosts.
 */
export interface IEventHostService {
  /**
   * Retrieves a list of organized events.
   * @returns An Observable that emits either an ApiError or an array of EventDTO objects.
   */
  getOrganizedEvents(): Observable<ApiError | EventDTO[]>;

  /**
   * Retrieves an event by its ID.
   * @param eventId - The ID of the event to retrieve.
   * @returns An Observable that emits either an ApiError or an EventDTO object.
   */
  getEvent(eventId: string): Observable<ApiError | EventDTO>;

  /**
   * Deletes an event by its ID.
   * @param eventId - The ID of the event to delete.
   * @returns An Observable that emits either an ApiError or void.
   */
  deleteEvent(eventId: string): Observable<ApiError | void>;

  /**
   * Updates an existing event.
   * @param event - The updated EventDTO object.
   * @returns An Observable that emits either an ApiError or the updated EventDTO object.
   */
  updateEvent(event: EventDTO): Observable<ApiError | EventDTO>;

  /**
   * Creates a new event.
   * @param event - The EventDTO object representing the new event.
   * @returns An Observable that emits either an ApiError or the created EventDTO object.
   */
  createEvent(event: EventDTO): Observable<ApiError | EventDTO>;

  /**
   * Invites a participant to an event.
   * @param eventId - The ID of the event to invite the participant to.
   * @param participantEmail - The email address of the participant to invite.
   * @returns An Observable that emits either an ApiError or an array of ParticipantDTO objects.
   */
  inviteParticipant(
    eventId: string,
    participantEmail: string
  ): Observable<ApiError | ParticipantDTO[]>;

  /**
   * Removes a participant from an event.
   * @param eventId - The ID of the event to remove the participant from.
   * @param participantEmail - The email address of the participant to remove.
   * @returns An Observable that emits either an ApiError or an array of ParticipantDTO objects.
   */
  removeParticipant(
    eventId: string,
    participantEmail: string
  ): Observable<ApiError | ParticipantDTO[]>;

  /**
   * Retrieves a list of participants for an event.
   * @param eventId - The ID of the event to retrieve participants for.
   * @returns An Observable that emits either an ApiError or an array of ParticipantDTO objects.
   */
  getParticipants(eventId: string): Observable<ApiError | ParticipantDTO[]>;
}