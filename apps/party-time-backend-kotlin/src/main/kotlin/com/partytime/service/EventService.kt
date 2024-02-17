package com.partytime.service

import com.partytime.api.dto.event.EventCreateDTO
import com.partytime.api.dto.event.EventDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.configuration.JacksonConfiguration
import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.jpa.entity.Account
import com.partytime.jpa.entity.Address
import com.partytime.jpa.entity.Event
import com.partytime.jpa.entity.EventParticipant
import com.partytime.jpa.entity.Status
import com.partytime.jpa.mapper.prettyPrint
import com.partytime.jpa.repository.EventParticipantRepository
import com.partytime.jpa.repository.EventRepository
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
import java.util.Optional

private val eventLogger = KotlinLogging.logger {}

@Service
class EventService (
    private val eventRepository: EventRepository,
    private val eventParticipantRepository: EventParticipantRepository,
    private val accountService: AccountService,
    private val addressService: AddressService,
    private val configurationProperties: PartyTimeConfigurationProperties,
    private val applicationEventPublisher: ApplicationEventPublisher
) {

    /**
     * Implements F001
     */
    @Transactional
    fun createEvent(body: EventCreateDTO, email: String): Event {
        val account = accountService.optAccount(email)
            .orElseThrow {
                ApiError.badRequest(
                    "Ein Account mit dieser Mail existiert nicht"
                ).asException()
            }

        val address: Address = addressService.saveAddress(body.address)

        Event(
            organizer = account,
            name = body.name,
            dateTime = body.dateTime,
            address = address
        )
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
     */
    fun getEvent(email: String, eventId: Long): Event = fetchOwnEvent(eventId, email)

    /**
     * Implements F002
     */
    @Transactional
    fun updateEvent(body: EventDTO, email: String): Event {
        val originalEvent: Event = fetchOwnEvent(body.id, email)

        originalEvent.address = addressService.saveAddress(body.address)
        originalEvent.name = body.name
        originalEvent.dateTime = body.dateTime

        val event = eventRepository.save(originalEvent)

        for (eventParticipant in event.eventParticipants) {
            val participant: Account = eventParticipant.account
            val mailEvent = MailEvent(
                this,
                participant.email,
                "Änderungen am Event ${event.name}",
                EventChangeData(
                    participant.name,
                    EventData(
                        event.organizer.name,
                        event.name,
                        event.address.prettyPrint(),
                        JacksonConfiguration.dateTimeFormatter.format(event.dateTime)
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
     */
    @Transactional
    fun deleteEventById(eventId: Long, email: String) {
        val event: Event = fetchOwnEvent(eventId, email)

        val eventParticipants = event.eventParticipants

        eventRepository.delete(event)

        for (eventParticipant in eventParticipants) {
            val account: Account = eventParticipant.account
            val mailEvent = MailEvent(
                this,
                account.email,
                "Absage des Events " + event.name,
                CancellationData(
                    EventData(
                        event.organizer.name,
                        event.name,
                        event.address.prettyPrint(),
                        JacksonConfiguration.dateTimeFormatter.format(event.dateTime)
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
     */
    @Transactional
    fun deleteMultipleEvents(events: List<Event?>) {
        eventRepository.deleteAll(events)
    }

    /**
     * Implements F005
     */
    @Transactional
    fun uninviteParticipant(eventId: Long, targetEmail: String, authenticatedUser: String) {
        val event: Event = fetchOwnEvent(eventId, authenticatedUser)

        val invitedAccount = accountService.getAccount(targetEmail)

        val eventParticipant = eventParticipantRepository
            .findByEvent_IdAndAccount_Id(eventId, invitedAccount.id!!)
            .orElseThrow {
                ApiError
                    .badRequest("Der Account mit der Email $targetEmail wurde nicht eingeladen")
                    .asException()
            }

        eventParticipantRepository.delete(eventParticipant)

        val mailEvent = MailEvent(
            this,
            targetEmail,
            "Du wurdest beim Event ${event.name} ausgeladen.",
            UninviteData(
                invitedAccount.name,
                EventData(
                    event.organizer.name,
                    event.name,
                    event.address.prettyPrint(),
                    JacksonConfiguration.dateTimeFormatter.format(event.dateTime)
                ),
                configurationProperties.url
            )
        )
        applicationEventPublisher.publishEvent(mailEvent)
    }

    /**
     * Implements F004
     * Implements F007
     */
    @Transactional
    fun inviteParticipant(eventId: Long, targetEmail: String, authenticatedUser: String) {
        val originalEvent: Event = fetchOwnEvent(eventId, authenticatedUser)
        val invitedAccount = accountService.getAccount(targetEmail)

        if (eventParticipantRepository.existsByEvent_IdAndAccount_Id(eventId, invitedAccount.id!!)) {
            throw ApiError.badRequest("Der Account mit der Email $targetEmail wurde bereits eingeladen")
                .asException()
        }

        val participant = EventParticipant(
            invitedAccount,
            originalEvent,
            Status.INVITED
        )

        eventParticipantRepository.save(participant)

        val baseLink: String = configurationProperties.url + eventId + "/invitation/"
        val acceptLink = "$baseLink/accept"
        val declineLink = "$baseLink/decline"

        val mailEvent = MailEvent(
            this,
            targetEmail,
            "Einladung zum Event " + originalEvent.name,
            InvitationData(
                invitedAccount.name,
                EventData(
                    originalEvent.organizer.name,
                    originalEvent.name,
                    originalEvent.address.prettyPrint(),
                    JacksonConfiguration.dateTimeFormatter.format(originalEvent.dateTime),
                ),
                acceptLink,
                declineLink,
                configurationProperties.url
            ),
            originalEvent
        )
        applicationEventPublisher.publishEvent(mailEvent)

        eventLogger.info { "Accept Link: $acceptLink" }
        eventLogger.info { "Decline Link: $declineLink" }
    }

    /**
     * Implements F016
     */
    fun getEvents(email: String): List<Event> = eventRepository.findByOrganizer_Email(email)

    /**
     * Implements F007
     */
    @Transactional(readOnly = true)
    fun getParticipatingEvents(email: String): List<EventParticipant> =
        eventParticipantRepository.findAllByAccount_Email(email)

    /**
     * Implements F007
     */
    fun getParticipatingEvent(event: Long, email: String): EventParticipant {
        return Optional.of(getEventParticipant(event, email))
            .orElseThrow {
                ApiError.notFound("Das Event konnte nicht gefunden werden").asException()
            }
    }

    private fun getEventParticipant(event: Long, email: String): EventParticipant =
        eventParticipantRepository.findByEvent_IdAndAccount_Email(event, email)
            .orElseThrow {
                ApiError.notFound("Das Event konnte nicht gefunden werden").asException()
            }

    /**
     * Implements F006
     */
    fun getParticipants(eventId: Long, email: String): List<EventParticipant> {
        return fetchOwnEvent(eventId, email).eventParticipants.sortedBy { it.account.name }
    }

    /**
     * Implements F008
     */
    fun acceptInvitation(eventId: Long, currentUserMail: String) {
        val eventParticipant = getEventParticipant(eventId, currentUserMail)
        eventParticipant.status = Status.PARTICIPATING
        eventParticipantRepository.save(eventParticipant)
    }

    /**
     * Implements F009
     */
    fun declineInvitation(eventId: Long, currentUserMail: String) {
        val eventParticipant = getEventParticipant(eventId, currentUserMail)
        eventParticipant.status = Status.REJECTED
        eventParticipantRepository.save(eventParticipant)
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
