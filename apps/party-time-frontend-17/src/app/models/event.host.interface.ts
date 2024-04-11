import { Observable } from 'rxjs';
import {
  AccountInvitationDetailsDTO,
  EventCreateDTO,
  EventDetailsDTO,
  InvitationCreateDTO,
  OrganizerEventDTO,
} from './dto/event-dto.interface';

/**
 * Represents a service for managing event hosts.
 */
export interface IEventHostService {
  /**
   * Retrieves a list of organized events.
   * @returns An Observable that emits either an ApiError or an array of EventDTO objects.
   */
  getOrganizedEvents(): Observable<EventDetailsDTO[]>;

  /**
   * Retrieves an event by its ID.
   * @param eventId - The ID of the event to retrieve.
   * @returns An Observable that emits either an ApiError or an EventDTO object.
   */
  getEvent(eventId: number): Observable<OrganizerEventDTO>;

  /**
   * Deletes an event by its ID.
   * @param eventId - The ID of the event to delete.
   * @returns An Observable that emits either an ApiError or void.
   */
  deleteEvent(eventId: number): Observable<void>;

  /**
   * Updates an existing event.
   * @param event - The updated EventDTO object.
   * @returns An Observable that emits either an ApiError or the updated EventDTO object.
   */
  updateEvent(event: EventDetailsDTO): Observable<OrganizerEventDTO>;

  /**
   * Creates a new event.
   * @param event - The EventDTO object representing the new event.
   * @returns An Observable that emits either an ApiError or the created EventDTO object.
   */
  createEvent(event: EventCreateDTO): Observable<OrganizerEventDTO>;

  /**
   * Invites a participant to an event.
   * @param eventId - The ID of the event to invite the participant to.
   * @param participantEmail - The email address of the participant to invite.
   * @returns An Observable that emits either an ApiError or an array of ParticipantDTO objects.
   */
  inviteParticipant(
    eventId: number,
    participantEmail: string
  ): Observable<InvitationCreateDTO[]>;

  /**
   * Removes a participant from an event.
   * @param eventId - The ID of the event to remove the participant from.
   * @param participantEmail - The email address of the participant to remove.
   * @returns An Observable that emits either an ApiError or an array of ParticipantDTO objects.
   */
  removeParticipant(
    eventId: number,
    invitationId: string
  ): Observable<AccountInvitationDetailsDTO[]>;

  /**
   * Retrieves a list of participants for an event.
   * @param eventId - The ID of the event to retrieve participants for.
   * @returns An Observable that emits either an ApiError or an array of ParticipantDTO objects.
   */
  getParticipants(eventId: number): Observable<AccountInvitationDetailsDTO[]>;
}
