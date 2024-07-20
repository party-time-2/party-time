package com.partytime.scenario

import com.partytime.ALT_EVENT_NAME
import com.partytime.EVENT_NAME
import com.partytime.OTHER_VERIFIED_EMAIL
import com.partytime.VERIFIED_EMAIL
import com.partytime.api.dto.event.AccountInvitationDetailsDTO
import com.partytime.api.dto.event.EventCreateDTO
import com.partytime.api.dto.event.EventDetailsDTO
import com.partytime.api.dto.event.InvitationCreateDTO
import com.partytime.api.dto.event.OrganizerEventDTO
import com.partytime.api.dto.event.ParticipantEventDTO
import com.partytime.jpa.mapper.toAddressDTO
import com.partytime.testAbstraction.PartyTimeWebTestClients
import com.partytime.testAbstraction.ScenarioTest
import com.partytime.testUtility.generateAddress
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.reactive.server.returnResult
import java.time.ZonedDateTime

class OrganizerAndParticipantScenarioTest @Autowired constructor(
    private val wtc: PartyTimeWebTestClients
) : ScenarioTest() {

    @Test
    fun testOrganizerAndParticipant() {

        val eventCreateDTO = EventCreateDTO(
            EVENT_NAME,
            ZonedDateTime.now().plusMonths(2),
            generateAddress(true).toAddressDTO()
        )

        val organizerWebTestClient = wtc.authenticatedClientByEmail(VERIFIED_EMAIL)

        val organizerEventDTO = organizerWebTestClient
            .post()
            .uri("/api/host/event")
            .bodyValue(eventCreateDTO)
            .exchange()
            .expectStatus().isOk
            .returnResult<OrganizerEventDTO>()
            .responseBody
            .single()
            .block() ?: throw IllegalStateException("OrganizerEventDTO not retrieved")

        val eventDetailsDTOChangedTitle = organizerEventDTO.eventDetailsDTO.copy(name = ALT_EVENT_NAME)

        organizerWebTestClient
            .patch()
            .uri("/api/host/event")
            .bodyValue(eventDetailsDTOChangedTitle)
            .exchange()
            .expectStatus().isOk
            .expectBody(OrganizerEventDTO::class.java)
            .value {
                assertEquals(ALT_EVENT_NAME, it.eventDetailsDTO.name)
            }

        val eventId = organizerEventDTO.eventDetailsDTO.id

        //check if event in organized events
        organizerWebTestClient
            .get()
            .uri("/api/host/events")
            .exchange()
            .expectBody(Array<EventDetailsDTO>::class.java)
            .value { events ->
                assertNotNull(events.firstOrNull {
                    it.id == eventId
                })
            }

        //get event directly
        organizerWebTestClient
            .get()
            .uri("/api/host/event/$eventId")
            .exchange()
            .expectBody(OrganizerEventDTO::class.java)
            .value { responseOrganizerEventDTO ->
                assertEquals(eventId, responseOrganizerEventDTO.eventDetailsDTO.id)
            }

        //invite participant
        val invitationCreateDTO = InvitationCreateDTO(OTHER_VERIFIED_EMAIL)

        organizerWebTestClient
            .post()
            .uri("/api/host/event/$eventId/participants")
            .bodyValue(invitationCreateDTO)
            .exchange()
            .expectStatus().isOk
            .expectBody(Array<AccountInvitationDetailsDTO>::class.java)
            .value { invitations ->
                assertNotNull(invitations.firstOrNull {
                    it.invitee.email == OTHER_VERIFIED_EMAIL
                })
            }

        //check invitees with organizer

        organizerWebTestClient
            .get()
            .uri("/api/host/event/$eventId/participants")
            .exchange()
            .expectStatus().isOk
            .expectBody(Array<AccountInvitationDetailsDTO>::class.java)
            .value { invitations ->
                assertNotNull(invitations.firstOrNull {
                    it.invitee.email == OTHER_VERIFIED_EMAIL
                })
            }

        //check all events of invitee
        val inviteeClient = wtc.authenticatedClientByEmail(OTHER_VERIFIED_EMAIL)

        inviteeClient
            .get()
            .uri("/api/participant/events")
            .exchange()
            .expectStatus().isOk
            .expectBody(Array<ParticipantEventDTO>::class.java)
            .value { events ->
                assertNotNull(events.firstOrNull {
                    it.organizedEventDetailsDTO.id == eventId
                })
            }

        //check invite with invitee

        val invitation = inviteeClient
            .get()
            .uri("/api/participant/event/$eventId")
            .exchange()
            .expectAll(
                { spec -> spec.expectStatus().isOk },
                { spec ->
                    spec.expectBody(ParticipantEventDTO::class.java)
                        .value { participantEventDTO ->
                            assertEquals(eventId, participantEventDTO.organizedEventDetailsDTO.id)
                        }
                }
            ).returnResult<ParticipantEventDTO>()
            .responseBody
            .single()
            .block()!!

        //invitee accepts invite

        inviteeClient
            .post()
            .uri("/api/participant/event/$eventId/invitation/accept")
            .bodyValue(Unit)
            .exchange()
            .expectStatus().isOk

        //invitee declines invite

        inviteeClient
            .post()
            .uri("/api/participant/event/$eventId/invitation/decline")
            .bodyValue(Unit)
            .exchange()
            .expectStatus().isOk

        //organizer uninvites participant
        organizerWebTestClient
            .delete()
            .uri("/api/host/event/$eventId/participants/${invitation.invitationDetailsDTO.id}")
            .exchange()
            .expectStatus().isOk

        //organizer deletes event
        organizerWebTestClient
            .delete()
            .uri("/api/host/event/$eventId")
            .exchange()
            .expectStatus().isOk
    }
}
