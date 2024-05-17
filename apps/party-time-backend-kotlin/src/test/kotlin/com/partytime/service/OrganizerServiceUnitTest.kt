package com.partytime.service

import com.partytime.ADDRESS_LINE
import com.partytime.ADDRESS_LINE_ADDITION
import com.partytime.CITY
import com.partytime.COUNTRY
import com.partytime.EMAIL
import com.partytime.EVENT_NAME
import com.partytime.NAME
import com.partytime.ORGANIZER_EMAIL
import com.partytime.ORGANIZER_NAME
import com.partytime.ORGANIZER_PASSWORD
import com.partytime.PASSWORD
import com.partytime.URL
import com.partytime.ZIP
import com.partytime.api.dto.address.AddressDTO
import com.partytime.api.dto.event.EventCreateDTO
import com.partytime.api.dto.event.EventDetailsDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.ApiErrorException
import com.partytime.api.error.asException
import com.partytime.assertApiErrorExceptionEquals
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
import com.partytime.mail.model.EventChangeData
import com.partytime.mail.model.MailEvent
import com.partytime.testAbstraction.UnitTest
import io.mockk.every
import io.mockk.justRun
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.fail
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.context.ApplicationEventPublisher
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
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

    private val passwordEncoder = BCryptPasswordEncoder()
    private val encodedOrganizerPassword = passwordEncoder.encode(ORGANIZER_PASSWORD)
    private val encodedOtherPassword = passwordEncoder.encode(PASSWORD)

    private val organizerAccount = Account(
        ORGANIZER_EMAIL,
        true,
        ORGANIZER_NAME,
        encodedOrganizerPassword
    )

    private val otherAccount = Account(
        EMAIL,
        true,
        NAME,
        encodedOtherPassword
    )

    private val address = Address(
        ADDRESS_LINE,
        ADDRESS_LINE_ADDITION,
        ZIP,
        CITY,
        COUNTRY
    )

    private val eventZonedDateTime = ZonedDateTime.now().plusDays(5)
    private val eventID = 0L


    private val savedEvent = Event(
        organizerAccount,
        EVENT_NAME,
        eventZonedDateTime,
        address
    ).apply {
        id = eventID

        invitations.add(
            Invitation(
                otherAccount,
                this,
                Status.PARTICIPATING
            )
        )
    }

    private val savedDifferentEvent = Event(
        otherAccount,
        EVENT_NAME,
        eventZonedDateTime,
        address
    ).apply { id = eventID }

    private val addressDTO = AddressDTO(
        ADDRESS_LINE,
        ADDRESS_LINE_ADDITION,
        ZIP,
        CITY,
        COUNTRY
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
    inner class CreateEventTest {
        private val eventCreateDTO = EventCreateDTO(
            EVENT_NAME,
            eventZonedDateTime,
            addressDTO
        )

        @Test
        fun createEventSuccess() {
            //setup - mock
            every { accountService.optAccountByMail(ORGANIZER_EMAIL) } returns Optional.of(organizerAccount)
            every { addressService.saveAddress(addressDTO) } returns address
            every { eventRepository.save(any()) } answers {
                firstArg<Event>().also { it.id = it.id ?: 0 }
            }

            //execute
            val createdEvent = organizerService.createEvent(eventCreateDTO, ORGANIZER_EMAIL)
            assertEquals(0, createdEvent.id)
            assertEquals(organizerAccount, createdEvent.organizer)
            assertEquals(eventZonedDateTime, createdEvent.dateTime)
            assertEquals(address, createdEvent.address)

            //verify
            verify(exactly = 1) { accountService.optAccountByMail(ORGANIZER_EMAIL) }
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
            every { accountService.optAccountByMail(ORGANIZER_EMAIL) } returns Optional.empty()

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                organizerService.createEvent(eventCreateDTO, ORGANIZER_EMAIL)
            }
            val expectedException = ApiError.badRequest(
                "Ein Account mit dieser Mail existiert nicht"
            ).asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { accountService.optAccountByMail(ORGANIZER_EMAIL) }
        }
    }


    @Nested
    inner class GetEvent {
        @Test
        fun getEventSuccess() {
            //setup - mock
            every { eventRepository.findById(eventID) } returns Optional.of(savedEvent)

            //execute
            val gotEvent = organizerService.getEvent(ORGANIZER_EMAIL, eventID)
            assertEquals(savedEvent, gotEvent)

            //verify
            verify(exactly = 1) { eventRepository.findById(eventID) }
        }

        @Test
        fun getEventNotFound() = templateFetchOwnEventNotFound {
            organizerService.getEvent(ORGANIZER_EMAIL, eventID)
        }

        @Test
        fun getEventForbidden() = templateFetchOwnEventForbidden {
            organizerService.getEvent(ORGANIZER_EMAIL, eventID)
        }
    }

    @Nested
    inner class UpdateEvent {
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
            val updatedEvent = organizerService.updateEvent(eventDetailsDTO, ORGANIZER_EMAIL)
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
            verify(exactly = 1) {
                applicationEventPublisher.publishEvent(withArg<MailEvent> {
                    assertEquals(it.recipientEmail, EMAIL)
                    assertEquals(it.subject, "Änderungen am Event $EVENT_NAME")
                    when (val mustacheData = it.data) {
                        is EventChangeData -> {
                            assertEquals(NAME, mustacheData.recipientName)
                            assertEquals(ORGANIZER_NAME, mustacheData.event.organizerName)
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
            organizerService.updateEvent(eventDetailsDTO, ORGANIZER_EMAIL)
        }

        @Test
        fun updateEventForbidden() = templateFetchOwnEventForbidden {
            organizerService.updateEvent(eventDetailsDTO, ORGANIZER_EMAIL)
        }
    }


    @Disabled
    @Test
    fun deleteEventById() {
        TODO()
    }

    @Disabled
    @Test
    fun deleteMultipleEvents() {
        TODO()
    }

    @Disabled
    @Test
    fun uninviteParticipant() {
        TODO()
    }

    @Disabled
    @Test
    fun inviteParticipant() {
        TODO()
    }

    @Disabled
    @Test
    fun getEvents() {
        TODO()
    }

    @Disabled
    @Test
    fun getParticipants() {
        TODO()
    }
}
