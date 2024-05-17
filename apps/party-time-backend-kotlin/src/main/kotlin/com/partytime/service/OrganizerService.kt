package com.partytime.service

import com.partytime.api.dto.event.EventCreateDTO
import com.partytime.api.dto.event.EventDetailsDTO
import com.partytime.api.dto.event.InvitationCreateDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.jpa.entity.Account
import com.partytime.jpa.entity.Address
import com.partytime.jpa.entity.Event
import com.partytime.jpa.entity.Invitation
import com.partytime.jpa.entity.Status
import com.partytime.jpa.mapper.toEmailFormat
import com.partytime.jpa.mapper.toMultiLineString
import com.partytime.jpa.repository.EventRepository
import com.partytime.jpa.repository.InvitationRepository
import com.partytime.mail.model.CancellationData
import com.partytime.mail.model.EventChangeData
import com.partytime.mail.model.EventData
import com.partytime.mail.model.InvitationData
import com.partytime.mail.model.MailEvent
import com.partytime.mail.model.UninviteData
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.context.ApplicationEventPublisher
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

private val organizerServiceLogger = KotlinLogging.logger {}
/**
 * A [Service] class for hosting events related functionality.
 *
 * @param eventRepository Repository where event related information can be stored
 * @param invitationRepository Repository where event-participation related information can be stored.
 * @param accountService Service used fetch accounts (for e-mail recipient information and event organizer ownership checks)
 * @param addressService Service used to store, retrieve and update the location of events
 * @param configurationProperties Properties used to retrieve the url of the server for e-mail content
 * @param applicationEventPublisher Used to send [MailEvent] for event invite/uninvite/changed/canceled information
 * @constructor Constructs a new [OrganizerService]
 */
@Service
class OrganizerService (
    private val eventRepository: EventRepository,
    private val invitationRepository: InvitationRepository,
    private val accountService: AccountService,
    private val addressService: AddressService,
    private val configurationProperties: PartyTimeConfigurationProperties,
    private val applicationEventPublisher: ApplicationEventPublisher
) {
    /**
     * Implements F001
     *
     * Creates a new [Event].
     *
     * @param body contains information about the to be created event
     * @param organizerEmail E-mail-address of the event organizer
     * @return newly created and saved [Event]
     */
    @Transactional
    fun createEvent(body: EventCreateDTO, organizerEmail: String): Event {
        val account = accountService.optAccountByMail(organizerEmail)
            .orElseThrow {
                ApiError.badRequest(
                    "Ein Account mit dieser Mail existiert nicht"
                ).asException()
            }

        val address: Address = addressService.saveAddress(body.address)

        val event = Event(
            organizer = account,
            name = body.name,
            dateTime = body.dateTime,
            address = address
        )

        return eventRepository.save(event)
    }

    /**
     * Implements F016
     *
     * Retrieves an organized event by [eventId].
     *
     * @param email E-Mail of the event organizer
     * @param eventId id of the Event whose details should be fetched
     * @return The organized event
     */
    fun getEvent(email: String, eventId: Long): Event = fetchOwnEvent(eventId, email)

    /**
     * Implements F002
     *
     * Updates the details of an existing organized event.
     *
     * @param body New event details
     * @param organizerEmail E-Mail of the event organizer
     * @return The [Event] with the changed event details
     */
    @Transactional
    fun updateEvent(body: EventDetailsDTO, organizerEmail: String): Event {
        val ownEvent: Event = fetchOwnEvent(body.id, organizerEmail)

        ownEvent.address = addressService.saveAddress(body.address)
        ownEvent.name = body.name
        ownEvent.dateTime = body.dateTime

        val event = eventRepository.save(ownEvent)

        //inform participants about the updated event details
        for (invitation in event.invitations) {
            val participant: Account = invitation.account
            val mailEvent = MailEvent(
                this,
                participant.email,
                "Änderungen am Event ${event.name}",
                EventChangeData(
                    participant.name,
                    EventData(
                        event.organizer.name,
                        event.name,
                        event.address.toMultiLineString(),
                        event.dateTime.toEmailFormat()
                    ),
                    configurationProperties.url
                ),
                event
            )
            applicationEventPublisher.publishEvent(mailEvent)
        }

        return event
    }

    /**
     * Implements F003
     *
     * Deletes an organized [Event]. Informs participants about the event cancellation.
     *
     * @param eventId id of the event to be deleted
     * @param organizerEmail e-mail address of the event organizer
     */
    @Transactional
    fun deleteEventById(eventId: Long, organizerEmail: String) {
        val event: Event = fetchOwnEvent(eventId, organizerEmail)

        val eventParticipants = event.invitations

        eventRepository.delete(event)

        //inform participants about event cancellation
        for (eventParticipant in eventParticipants) {
            val account: Account = eventParticipant.account
            val mailEvent = MailEvent(
                this,
                account.email,
                "Absage des Events ${event.name}",
                CancellationData(
                    EventData(
                        event.organizer.name,
                        event.name,
                        event.address.toMultiLineString(),
                        event.dateTime.toEmailFormat()
                    ),
                    account.name,
                    configurationProperties.url
                )
            )
            applicationEventPublisher.publishEvent(mailEvent)
        }
    }

    /**
     * Implements F003
     *
     * Deletes multiple events. Participants of the event will be informed about the cancellations.
     *
     * @param events List of events to be deleted
     * @param organizerEmail E-mail-address of the organizer of all [events]
     */
    @Transactional
    fun deleteMultipleEvents(events: List<Event>, organizerEmail: String) {
        events.forEach {
            deleteEventById(it.id!!, organizerEmail)
        }
    }

    /**
     * Implements F005
     *
     * Uninvites an invitee of an event and informs the invitee about the uninviting.
     *
     * @param eventId id of the event for which an invitee should be univited
     * @param inviteId id of the invitation whose account should be uninvited
     * @param organizerEmail E-mail-address of the event organizer
     */
    @Transactional
    fun uninviteParticipant(eventId: Long, inviteId: Long, organizerEmail: String) {
        val event: Event = fetchOwnEvent(eventId, organizerEmail)

        val invitation = invitationRepository
            .findByEvent_IdAndId(eventId, inviteId)
            .orElseThrow {
                ApiError
                    .badRequest("Eine Einladung mit der id $inviteId existiert nicht für das Event mit der id $eventId")
                    .asException()
            }

        invitationRepository.delete(invitation)

        //inform uninvited participant about the uninviting
        val mailEvent = MailEvent(
            this,
            invitation.account.email,
            "Du wurdest beim Event ${event.name} ausgeladen.",
            UninviteData(
                invitation.account.name,
                EventData(
                    event.organizer.name,
                    event.name,
                    event.address.toMultiLineString(),
                    event.dateTime.toEmailFormat()
                ),
                configurationProperties.url
            )
        )
        applicationEventPublisher.publishEvent(mailEvent)
    }

    /**
     * Implements F004
     * Implements F007
     *
     * Invites an account to an event and informs the invited participant about the invitation.
     *
     * @param eventId id of the event for which an account should be invited
     * @param invitationCreateDTO E-mail address container with e-mail of the invitee account
     * @param organizerEmail E-mail-address of the event organizer
     */
    @Transactional
    fun inviteParticipant(eventId: Long, invitationCreateDTO: InvitationCreateDTO, organizerEmail: String) {
        val ownEvent: Event = fetchOwnEvent(eventId, organizerEmail)
        val invitedAccount = accountService.getAccountByMail(invitationCreateDTO.email)

        if (invitationRepository.existsByEvent_IdAndAccount_Id(eventId, invitedAccount.id!!)) {
            throw ApiError.badRequest("Der Account mit der Email ${invitationCreateDTO.email} wurde bereits eingeladen")
                .asException()
        }

        val invitation = Invitation(
            invitedAccount,
            ownEvent,
            Status.INVITED
        )

        invitationRepository.save(invitation)

        //Inform invited user about invitation
        val baseLink: String = configurationProperties.url + eventId + "/invitation/"
        val acceptLink = "$baseLink/accept"
        val declineLink = "$baseLink/decline"

        val mailEvent = MailEvent(
            this,
            invitation.account.email,
            "Einladung zum Event " + ownEvent.name,
            InvitationData(
                invitedAccount.name,
                EventData(
                    ownEvent.organizer.name,
                    ownEvent.name,
                    ownEvent.address.toMultiLineString(),
                    ownEvent.dateTime.toEmailFormat()
                ),
                acceptLink,
                declineLink,
                configurationProperties.url
            ),
            ownEvent
        )
        applicationEventPublisher.publishEvent(mailEvent)

        organizerServiceLogger.info { "Accept Link: $acceptLink" }
        organizerServiceLogger.info { "Decline Link: $declineLink" }
    }

    /**
     * Implements F016
     *
     * Fetches the events organized by a user
     *
     * @param organizerEmail E-mail-address of the event organizer
     * @return List of [Event] organized by the organizer
     */
    @Transactional(readOnly = true)
    fun getEvents(organizerEmail: String): List<Event> = eventRepository.findByOrganizer_Email(organizerEmail)

    /**
     * Implements F006
     *
     * Fetches all participation information of an event.
     *
     * @param eventId id of the event for which a participation information should be fetched
     * @param organizerEmail E-mail-address of the event organizer
     * @return List of [Invitation] of the event with the provided id
     */
    fun getParticipants(eventId: Long, organizerEmail: String): List<Invitation> {
        return fetchOwnEvent(eventId, organizerEmail).invitations.sortedBy { it.account.name }
    }

    private fun fetchOwnEvent(eventId: Long, email: String): Event {
        val event = eventRepository.findById(eventId)
            .orElseThrow {
                ApiError
                    .notFound("Ein Event mit der ID $eventId konnte nicht gefunden werden.").asException()
            }

        if (email != event.organizer.email) {
            // Authenticated User is not Event Organizer
            throw ApiError.forbidden().asException()
        }

        // return event where id = id and organizer = email
        return event
    }

}
