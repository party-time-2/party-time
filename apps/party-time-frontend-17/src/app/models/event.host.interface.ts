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
   * Implements F016
   *
   * Fetches event information of events organized by the user.
   *
   * @param authentication Authentication information of the event organizer
   * @return List of Event information (missing Organizer name, since that's the authenticated user)
   */
  getOrganizedEvents(): Observable<EventDetailsDTO[]>;

  /**
   * Implements F016
   *
   * Fetches event information of event organized by the user.
   *
   * @param eventId id of the event organized by the user
   * @param authentication Authentication information of the event organizer
   * @return Details of a single Event (missing Organizer info, since that's the authenticated user)
   */
  getEvent(eventId: number): Observable<OrganizerEventDTO>;

  /**
   * Implements F003
   *
   * Deletes an event organized by the user.
   *
   * @param eventId id of the to-be-canceled event organized by the user
   * @param authentication Authentication information of the event organizer
   */
  deleteEvent(eventId: number): Observable<void>;

  /**
   * Implements F002
   *
   * Updates event information for an event organized by the user.
   *
   * @param body Information about the event to be updated. Must contain the eventId of a saved event.
   * @param authentication Authentication information of the event organizer
   * @return Details about the updated event (missing Organizer info, since that's the authenticated user)
   */
  updateEvent(event: EventDetailsDTO): Observable<OrganizerEventDTO>;

  /**
   * Implements F001
   *
   * Creates an event organized by the user.
   *
   * @param body Information about the event to be created
   * @param authentication Authentication information of the event organizer
   * @return Details about the newly created event (missing Organizer info, since that's the authenticated user)
   */
  createEvent(event: EventCreateDTO): Observable<OrganizerEventDTO>;

  /**
   * Implements F004
   * Implements F007
   *
   * Invites an account to an event organized by the user.
   *
   * @param eventId id of the event organized by the user
   * @param body E-mail address container with e-mail of the invitee account
   * @param authentication Authentication information of the event organizer
   * @return List of all event invitees after the new invitee has been invited
   */
  inviteParticipant(
    eventId: number,
    participantEmail: string
  ): Observable<AccountInvitationDetailsDTO[]>;

  /**
   * Implements F005
   *
   * Uninvites an account from an event organized by the user.
   *
   * @param eventId id of the event organized by the user
   * @param inviteId id of the invitation whose account should be uninvited
   * @param authentication Authentication information of the event organizer
   * @return List of all event invitees after the previous invitee has been uninvited
   */
  removeParticipant(
    eventId: number,
    invitationId: string
  ): Observable<AccountInvitationDetailsDTO[]>;

  /**
   * Implements F006
   *
   * Fetches an invitation list of an event organized by the user.
   *
   * @param eventId id of the event organized by the user
   * @param authentication Authentication information of the event organizer
   * @return List of invites of a specific event
   */
  getParticipants(eventId: number): Observable<AccountInvitationDetailsDTO[]>;
}
