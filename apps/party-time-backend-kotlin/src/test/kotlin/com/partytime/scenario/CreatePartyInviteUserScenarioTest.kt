package com.partytime.scenario

import com.partytime.EVENT_NAME
import com.partytime.OTHER_VERIFIED_EMAIL
import com.partytime.VERIFIED_EMAIL
import com.partytime.api.dto.event.EventCreateDTO
import com.partytime.api.dto.event.InvitationCreateDTO
import com.partytime.api.dto.event.OrganizerEventDTO
import com.partytime.api.dto.event.ParticipantEventDTO
import com.partytime.jpa.mapper.toAddressDTO
import com.partytime.testAbstraction.PartyTimeWebTestClients
import com.partytime.testAbstraction.ScenarioTest
import com.partytime.testUtility.generateAddress
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.reactive.server.returnResult
import java.time.ZonedDateTime

class CreatePartyInviteUserScenarioTest @Autowired constructor(
    private val wtc: PartyTimeWebTestClients
) : ScenarioTest() {

    @Test
    fun testLoginCreatePartyInviteUser() {

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

        val invitationCreateDTO = InvitationCreateDTO(OTHER_VERIFIED_EMAIL)

        organizerWebTestClient
            .post()
            .uri("/api/host/event/$eventId/participants")
            .bodyValue(invitationCreateDTO)
            .exchange()
            .expectStatus().isOk

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
    }
}
