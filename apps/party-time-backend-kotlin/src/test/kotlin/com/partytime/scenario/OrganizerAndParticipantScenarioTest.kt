package com.partytime.scenario

import com.partytime.EVENT_NAME
import com.partytime.OTHER_VERIFIED_EMAIL
import com.partytime.VERIFIED_EMAIL
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

        val invitationCreateDTO = InvitationCreateDTO(OTHER_VERIFIED_EMAIL)

        organizerWebTestClient
            .post()
            .uri("/api/host/event/$eventId/participants")
            .bodyValue(invitationCreateDTO)
            .exchange()
            .expectStatus().isOk

        val inviteeClient = wtc.authenticatedClientByEmail(OTHER_VERIFIED_EMAIL)

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
