package com.partytime.service

import com.partytime.EVENT_NAME
import com.partytime.URL
import com.partytime.api.dto.address.AddressDTO
import com.partytime.api.dto.event.EventCreateDTO
import com.partytime.api.dto.event.EventDetailsDTO
import com.partytime.api.dto.event.InvitationCreateDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.ApiErrorException
import com.partytime.api.error.asException
import com.partytime.assertApiErrorExceptionEquals
import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.jpa.entity.Event
import com.partytime.jpa.entity.Invitation
import com.partytime.jpa.entity.Status
import com.partytime.jpa.mapper.toEmailFormat
import com.partytime.jpa.mapper.toMultiLineString
import com.partytime.jpa.repository.EventRepository
import com.partytime.jpa.repository.InvitationRepository
import com.partytime.mail.model.CancellationData
import com.partytime.mail.model.EventChangeData
import com.partytime.mail.model.InvitationData
import com.partytime.mail.model.MailEvent
import com.partytime.mail.model.UninviteData
import com.partytime.testAbstraction.UnitTest
import com.partytime.testUtility.generateAddress
import com.partytime.testUtility.generateOrganizerAccount
import com.partytime.testUtility.generateParticipantAccount
import io.mockk.every
import io.mockk.justRun
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertIterableEquals
import org.junit.jupiter.api.Assertions.fail
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import org.junit.jupiter.api.assertThrows
import org.springframework.context.ApplicationEventPublisher
import java.time.ZonedDateTime
import java.util.Optional

class OrganizerServiceUnitTest : UnitTest() {

    private val eventRepository = mockk<EventRepository>()
    private val invitationRepository = mockk<InvitationRepository>()
    private val accountService = mockk<AccountService>()
    private val addressService = mockk<AddressService>()
    private val configurationProperties = mockk<PartyTimeConfigurationProperties>()
    private val applicationEventPublisher = mockk<ApplicationEventPublisher>()

    private val organizerService = OrganizerService(
        eventRepository,
        invitationRepository,
        accountService,
        addressService,
        configurationProperties,
        applicationEventPublisher,
    )

    private val organizerAccount = generateOrganizerAccount().account

    private val firstParticipantAccount = generateParticipantAccount(
        verified = true,
        withVerificationCode = false
    ).account
    private val secondParticipantAccount = generateParticipantAccount(
        verified = true,
        withVerificationCode = false
    ).account

    private val address = generateAddress(true)

    private val eventZonedDateTime = ZonedDateTime.now().plusDays(5)
    private val eventID = 0L
    private val invitationID = 0L
    private val otherInvitationID = 1L

    private val savedEvent = Event(
        organizerAccount,
        EVENT_NAME,
        eventZonedDateTime,
        address
    ).apply {
        id = eventID
    }

    private val firstInvitation = Invitation(
        firstParticipantAccount,
        savedEvent,
        Status.PARTICIPATING
    ).apply {
        id = invitationID
    }

    private val secondInvitation = Invitation(
        secondParticipantAccount,
        savedEvent,
        Status.INVITED
    ).apply { id = otherInvitationID }

    init {
        savedEvent.invitations.add(firstInvitation)
        savedEvent.invitations.add(secondInvitation)
    }

    private val savedDifferentEvent = Event(
        firstParticipantAccount, //event organized by a different account than organizerAccount
        EVENT_NAME,
        eventZonedDateTime,
        address
    ).apply { id = eventID }

    private val addressDTO = AddressDTO(
        address.addressLine,
        address.addressLineAddition,
        address.zip,
        address.city,
        address.country
    )

    private fun templateFetchOwnEventNotFound(call: () -> Any) {
        //setup - mock
        every { eventRepository.findById(eventID) } returns Optional.empty()

        //execute
        val thrownException = assertThrows<ApiErrorException> {
            call()
        }
        val expectedException = ApiError
            .notFound("Ein Event mit der ID $eventID konnte nicht gefunden werden.").asException()
        assertApiErrorExceptionEquals(expectedException, thrownException)

        //verify
        verify(exactly = 1) { eventRepository.findById(eventID) }
    }

    private fun templateFetchOwnEventForbidden(call: () -> Any) {
        //setup - mock
        every { eventRepository.findById(eventID) } returns Optional.of(savedDifferentEvent)

        //execute
        val thrownException = assertThrows<ApiErrorException> {
            call()
        }
        val expectedException = ApiError.forbidden().asException()
        assertApiErrorExceptionEquals(expectedException, thrownException)

        //verify
        verify(exactly = 1) { eventRepository.findById(eventID) }
    }


    @Nested
    inner class CreateEventTest : UnitTest() {
        private val eventCreateDTO = EventCreateDTO(
            EVENT_NAME,
            eventZonedDateTime,
            addressDTO
        )

        @Test
        fun createEventSuccess() {
            //setup - mock
            every { accountService.optAccountByMail(organizerAccount.email) } returns Optional.of(organizerAccount)
            every { addressService.saveAddress(addressDTO) } returns address
            every { eventRepository.save(any()) } answers {
                firstArg<Event>().also { it.id = it.id ?: 0 }
            }

            //execute
            val createdEvent = organizerService.createEvent(eventCreateDTO, organizerAccount.email)
            assertEquals(0, createdEvent.id)
            assertEquals(organizerAccount, createdEvent.organizer)
            assertEquals(eventZonedDateTime, createdEvent.dateTime)
            assertEquals(address, createdEvent.address)

            //verify
            verify(exactly = 1) { accountService.optAccountByMail(organizerAccount.email) }
            verify(exactly = 1) { addressService.saveAddress(addressDTO) }
            verify(exactly = 1) { addressService.saveAddress(addressDTO) }
            verify(exactly = 1) {
                eventRepository.save(withArg {
                    assertEquals(organizerAccount, it.organizer)
                    assertEquals(EVENT_NAME, it.name)
                    assertEquals(eventZonedDateTime, it.dateTime)
                    assertEquals(address, it.address)
                })
            }
        }

        @Test
        fun createEventBadRequest() {
            //setup - mock
            every { accountService.optAccountByMail(organizerAccount.email) } returns Optional.empty()

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                organizerService.createEvent(eventCreateDTO, organizerAccount.email)
            }
            val expectedException = ApiError.badRequest(
                "Ein Account mit dieser Mail existiert nicht"
            ).asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { accountService.optAccountByMail(organizerAccount.email) }
        }
    }


    @Nested
    inner class GetEvent : UnitTest() {
        @Test
        fun getEventSuccess() {
            //setup - mock
            every { eventRepository.findById(eventID) } returns Optional.of(savedEvent)

            //execute
            val gotEvent = organizerService.getEvent(organizerAccount.email, eventID)
            assertEquals(savedEvent, gotEvent)

            //verify
            verify(exactly = 1) { eventRepository.findById(eventID) }
        }

        @Test
        fun getEventNotFound() = templateFetchOwnEventNotFound {
            organizerService.getEvent(organizerAccount.email, eventID)
        }

        @Test
        fun getEventForbidden() = templateFetchOwnEventForbidden {
            organizerService.getEvent(organizerAccount.email, eventID)
        }
    }

    @Nested
    inner class UpdateEvent : UnitTest() {
        private val eventDetailsDTO = EventDetailsDTO(
            eventID,
            EVENT_NAME,
            eventZonedDateTime,
            addressDTO
        )

        @Test
        fun updateEventSuccess() {
            //setup - mock
            every { eventRepository.findById(eventID) } returns Optional.of(savedEvent)
            every { addressService.saveAddress(addressDTO) } returns address
            every { eventRepository.save(any()) } answers {
                firstArg<Event>().also { it.id = it.id ?: 0 }
            }
            every { configurationProperties.url } returns URL
            justRun { applicationEventPublisher.publishEvent(any<MailEvent>()) }

            //execute
            val updatedEvent = organizerService.updateEvent(eventDetailsDTO, organizerAccount.email)
            assertEquals(address, updatedEvent.address)
            assertEquals(EVENT_NAME, updatedEvent.name)
            assertEquals(eventZonedDateTime, updatedEvent.dateTime)

            //verify
            verify(exactly = 1) { eventRepository.findById(eventID) }
            verify(exactly = 1) { addressService.saveAddress(addressDTO) }
            verify(exactly = 1) {
                eventRepository.save(withArg {
                    assertEquals(organizerAccount, it.organizer)
                    assertEquals(EVENT_NAME, it.name)
                    assertEquals(eventZonedDateTime, it.dateTime)
                    assertEquals(address, it.address)
                })
            }
            verify(exactly = 2) { configurationProperties.url }
            verify(exactly = 2) {
                applicationEventPublisher.publishEvent(withArg<MailEvent> {
                    val invitationAccount = savedEvent.invitations
                        .find { invitation ->
                            invitation.account.email == it.recipientEmail
                        }!!.account

                    assertEquals(invitationAccount.email, it.recipientEmail)
                    assertEquals("Änderungen am Event $EVENT_NAME", it.subject)
                    when (val mustacheData = it.data) {
                        is EventChangeData -> {
                            assertEquals(invitationAccount.name, mustacheData.recipientName)
                            assertEquals(organizerAccount.name, mustacheData.event.organizerName)
                            assertEquals(EVENT_NAME, mustacheData.event.eventName)
                            assertEquals(address.toMultiLineString(), mustacheData.event.location)
                            assertEquals(eventZonedDateTime.toEmailFormat(), mustacheData.event.startTime)

                        }

                        else -> fail("E-Mail data is not of type `EventChangeData`")
                    }
                })
            }
        }

        @Test
        fun updateEventNotFound() = templateFetchOwnEventNotFound {
            organizerService.updateEvent(eventDetailsDTO, organizerAccount.email)
        }

        @Test
        fun updateEventForbidden() = templateFetchOwnEventForbidden {
            organizerService.updateEvent(eventDetailsDTO, organizerAccount.email)
        }
    }


    @Nested
    inner class DeleteEventById : UnitTest() {
        @Test
        fun deleteEventByIdSuccess() {
            //setup - mock
            every { eventRepository.findById(eventID) } returns Optional.of(savedEvent)
            justRun { eventRepository.delete(savedEvent) }
            every { configurationProperties.url } returns URL
            justRun { applicationEventPublisher.publishEvent(any<MailEvent>()) }

            //execute
            assertDoesNotThrow {
                organizerService.deleteEventById(eventID, organizerAccount.email)
            }

            //verify
            verify(exactly = 1) { eventRepository.findById(eventID) }
            verify(exactly = 1) { eventRepository.delete(savedEvent) }
            verify(exactly = 2) { configurationProperties.url }
            verify(exactly = 2) {
                applicationEventPublisher.publishEvent(withArg<MailEvent> {
                    val invitationAccount = savedEvent.invitations
                        .find { invitation ->
                            invitation.account.email == it.recipientEmail
                        }!!.account

                    assertEquals(invitationAccount.email, it.recipientEmail)
                    assertEquals("Absage des Events $EVENT_NAME", it.subject)
                    when (val mustacheData = it.data) {
                        is CancellationData -> {
                            assertEquals(invitationAccount.name, mustacheData.recipientName)
                            assertEquals(organizerAccount.name, mustacheData.event.organizerName)
                            assertEquals(EVENT_NAME, mustacheData.event.eventName)
                            assertEquals(address.toMultiLineString(), mustacheData.event.location)
                            assertEquals(eventZonedDateTime.toEmailFormat(), mustacheData.event.startTime)
                            assertEquals(URL, mustacheData.homepage)
                        }

                        else -> fail("E-Mail data is not of type `CancellationData`")
                    }
                })
            }
        }

        @Test
        fun deleteEventByIdNotFound() = templateFetchOwnEventForbidden {
            organizerService.deleteEventById(eventID, organizerAccount.email)
        }

        @Test
        fun deleteEventByIdForbidden() = templateFetchOwnEventForbidden {
            organizerService.deleteEventById(eventID, organizerAccount.email)
        }
    }

    @Nested
    inner class DeleteMultipleEvents : UnitTest() {
        private val events = listOf(savedEvent)

        @Test
        fun deleteMultipleEventsSuccess() {
            //setup - mock
            every { eventRepository.findById(eventID) } returns Optional.of(savedEvent)
            justRun { eventRepository.delete(savedEvent) }
            every { configurationProperties.url } returns URL
            justRun { applicationEventPublisher.publishEvent(any<MailEvent>()) }

            //execute
            assertDoesNotThrow {
                organizerService.deleteMultipleEvents(events, organizerAccount.email)
            }

            //verify
            verify(exactly = 1) { eventRepository.findById(eventID) }
            verify(exactly = 1) { eventRepository.delete(savedEvent) }
            verify(exactly = 2) { configurationProperties.url }
            verify(exactly = 2) {
                applicationEventPublisher.publishEvent(withArg<MailEvent> {
                    val invitationAccount = savedEvent.invitations
                        .find { invitation ->
                            invitation.account.email == it.recipientEmail
                        }!!.account

                    assertEquals(invitationAccount.email, it.recipientEmail)
                    assertEquals("Absage des Events $EVENT_NAME", it.subject)
                    when (val mustacheData = it.data) {
                        is CancellationData -> {
                            assertEquals(invitationAccount.name, mustacheData.recipientName)
                            assertEquals(organizerAccount.name, mustacheData.event.organizerName)
                            assertEquals(EVENT_NAME, mustacheData.event.eventName)
                            assertEquals(address.toMultiLineString(), mustacheData.event.location)
                            assertEquals(eventZonedDateTime.toEmailFormat(), mustacheData.event.startTime)
                            assertEquals(URL, mustacheData.homepage)

                        }

                        else -> fail("E-Mail data is not of type `CancellationData`")
                    }
                })
            }
        }

        @Test
        fun deleteMultipleEventsNotFound() = templateFetchOwnEventForbidden {
            organizerService.deleteMultipleEvents(events, organizerAccount.email)
        }

        @Test
        fun deleteMultipleEventsForbidden() = templateFetchOwnEventForbidden {
            organizerService.deleteMultipleEvents(events, organizerAccount.email)
        }
    }

    @Nested
    inner class UninviteParticipant: UnitTest() {
        @Test
        fun uninviteParticipantSuccess() {
            //setup - mock
            every { eventRepository.findById(eventID) } returns Optional.of(savedEvent)
            every { invitationRepository.findByEvent_IdAndId(eventID, invitationID) } returns Optional.of(firstInvitation)
            justRun { invitationRepository.delete(firstInvitation) }
            every { configurationProperties.url } returns URL
            justRun { applicationEventPublisher.publishEvent(any<MailEvent>()) }

            //execute
            assertDoesNotThrow {
                organizerService.uninviteParticipant(eventID, invitationID, organizerAccount.email)
            }

            //verify
            verify(exactly = 1) { eventRepository.findById(eventID) }
            verify(exactly = 1) { invitationRepository.findByEvent_IdAndId(eventID, invitationID) }
            verify(exactly = 1) { invitationRepository.delete(firstInvitation) }
            verify(exactly = 1) { configurationProperties.url }
            verify(exactly = 1) {
                applicationEventPublisher.publishEvent(withArg<MailEvent> {
                    assertEquals(firstParticipantAccount.email, it.recipientEmail)
                    assertEquals("Du wurdest beim Event $EVENT_NAME ausgeladen.", it.subject)
                    when (val mustacheData = it.data) {
                        is UninviteData -> {
                            assertEquals(firstParticipantAccount.name, mustacheData.name)
                            assertEquals(organizerAccount.name, mustacheData.event.organizerName)
                            assertEquals(EVENT_NAME, mustacheData.event.eventName)
                            assertEquals(address.toMultiLineString(), mustacheData.event.location)
                            assertEquals(eventZonedDateTime.toEmailFormat(), mustacheData.event.startTime)
                            assertEquals(URL, mustacheData.homepage)

                        }

                        else -> fail("E-Mail data is not of type `UninviteData`")
                    }
                })
            }
        }

        @Test
        fun deleteMultipleEventsBadRequest() {
            //setup - mock
            every { eventRepository.findById(eventID) } returns Optional.of(savedEvent)
            every { invitationRepository.findByEvent_IdAndId(eventID, invitationID) } returns Optional.empty()

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                organizerService.uninviteParticipant(eventID, invitationID, organizerAccount.email)
            }
            val expectedException = ApiError
                .badRequest("Eine Einladung mit der id $invitationID existiert nicht für das Event mit der id $eventID")
                .asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { eventRepository.findById(eventID) }
            verify(exactly = 1) { invitationRepository.findByEvent_IdAndId(eventID, invitationID) }
        }


        @Test
        fun deleteMultipleEventsNotFound() = templateFetchOwnEventForbidden {
            organizerService.uninviteParticipant(eventID, invitationID, organizerAccount.email)
        }

        @Test
        fun deleteMultipleEventsForbidden() = templateFetchOwnEventForbidden {
            organizerService.uninviteParticipant(eventID, invitationID, organizerAccount.email)
        }
    }


    @Nested
    inner class InviteParticipant: UnitTest() {
        private val invitationCreateDTO = InvitationCreateDTO(
            firstParticipantAccount.email
        )

        @Test
        fun inviteParticipantSuccess() {
            //setup - mock
            every { eventRepository.findById(eventID) } returns Optional.of(savedEvent)
            every { accountService.getAccountByMail(firstParticipantAccount.email) } returns firstParticipantAccount
            every { invitationRepository.existsByEvent_IdAndAccount_Id(eventID, firstParticipantAccount.id!!) } returns false
            every { invitationRepository.save(any<Invitation>()) } answers {
                firstArg<Invitation>().also { it.id = invitationID }
            }
            every { configurationProperties.url } returns URL
            justRun { applicationEventPublisher.publishEvent(any<MailEvent>()) }

            //execute
            assertDoesNotThrow {
                organizerService.inviteParticipant(eventID, invitationCreateDTO, organizerAccount.email)
            }

            //verify
            verify(exactly = 1) { eventRepository.findById(eventID) }
            verify(exactly = 1) { accountService.getAccountByMail(firstParticipantAccount.email) }
            verify(exactly = 1) { invitationRepository.existsByEvent_IdAndAccount_Id(eventID, firstParticipantAccount.id!!) }
            verify(exactly = 1) {  invitationRepository.save(withArg<Invitation> {
                assertEquals(firstParticipantAccount, it.account)
                assertEquals(savedEvent, it.event)
                assertEquals(Status.INVITED, it.status)
            }) }
            verify(exactly = 2) { configurationProperties.url }
            verify(exactly = 1) {
                applicationEventPublisher.publishEvent(withArg<MailEvent> {
                    assertEquals(firstParticipantAccount.email, it.recipientEmail)
                    assertEquals("Einladung zum Event $EVENT_NAME", it.subject)
                    when (val mustacheData = it.data) {
                        is InvitationData -> {
                            assertEquals(firstParticipantAccount.name, mustacheData.recipientName)
                            assertEquals(organizerAccount.name, mustacheData.event.organizerName)
                            assertEquals(EVENT_NAME, mustacheData.event.eventName)
                            assertEquals(address.toMultiLineString(), mustacheData.event.location)
                            assertEquals(eventZonedDateTime.toEmailFormat(), mustacheData.event.startTime)
                            val baseLink = "$URL$eventID/invitation/"
                            assertEquals("$baseLink/accept", mustacheData.acceptLink)
                            assertEquals("$baseLink/decline", mustacheData.declineLink)
                            assertEquals(URL, mustacheData.homepage)
                        }

                        else -> fail("E-Mail data is not of type `InvitationData`")
                    }
                })
            }
        }

        @Test
        fun inviteParticipantBadRequest() {
            //setup - mock
            every { eventRepository.findById(eventID) } returns Optional.of(savedEvent)
            every { accountService.getAccountByMail(firstParticipantAccount.email) } returns firstParticipantAccount
            every { invitationRepository.existsByEvent_IdAndAccount_Id(eventID, firstParticipantAccount.id!!) } returns true

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                organizerService.inviteParticipant(eventID, invitationCreateDTO, organizerAccount.email)
            }
            val expectedException = ApiError.badRequest(
                "Der Account mit der Email ${firstParticipantAccount.email} wurde bereits eingeladen"
            ).asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { eventRepository.findById(eventID) }
            verify(exactly = 1) { accountService.getAccountByMail(firstParticipantAccount.email) }
            verify(exactly = 1) { invitationRepository.existsByEvent_IdAndAccount_Id(eventID, firstParticipantAccount.id!!) }
        }

        @Test
        fun inviteParticipantNotFound() = templateFetchOwnEventForbidden {
            organizerService.inviteParticipant(eventID, invitationCreateDTO, organizerAccount.email)
        }

        @Test
        fun inviteParticipantForbidden() = templateFetchOwnEventForbidden {
            organizerService.inviteParticipant(eventID, invitationCreateDTO, organizerAccount.email)
        }
    }

    @Test
    fun getEvents() {
        //setup - mock
        every { eventRepository.findByOrganizer_Email(organizerAccount.email) } returns listOf(savedEvent)
        //execute
        val events = organizerService.getEvents(organizerAccount.email)
        assertIterableEquals(listOf(savedEvent), events)

        //verify
        verify(exactly = 1) { eventRepository.findByOrganizer_Email(organizerAccount.email) }
    }

    @Nested
    inner class GetParticipants: UnitTest() {
        @Test
        fun getParticipantsSuccess() {
            //setup - mock
            every { eventRepository.findById(eventID) } returns Optional.of(savedEvent)

            //execute
            val invitations = organizerService.getParticipants(eventID, organizerAccount.email)
            assertIterableEquals(listOf(firstInvitation, secondInvitation), invitations)

            //verify
            verify(exactly = 1) { eventRepository.findById(eventID) }
        }

        @Test
        fun getParticipantsNotFound() = templateFetchOwnEventForbidden {
            organizerService.getParticipants(eventID, organizerAccount.email)
        }

        @Test
        fun getParticipantsForbidden() = templateFetchOwnEventForbidden {
            organizerService.getParticipants(eventID, organizerAccount.email)
        }
    }
}
