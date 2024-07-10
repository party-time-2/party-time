package com.partytime.scenario

import com.partytime.EVENT_NAME
import com.partytime.api.dto.event.EventCreateDTO
import com.partytime.jpa.mapper.toAddressDTO
import com.partytime.testAbstraction.ScenarioTest
import com.partytime.testUtility.generateAddress
import org.junit.jupiter.api.Test
import org.springframework.web.context.WebApplicationContext
import java.time.ZonedDateTime

class CreatePartyInviteUser(
    wac: WebApplicationContext
) : ScenarioTest(wac) {

    @Test
    fun testLoginCreatePartyInviteUser() {

        val eventCreateDTO = EventCreateDTO(
            EVENT_NAME,
            ZonedDateTime.now().plusMonths(2),
            generateAddress(true).toAddressDTO()
        )

        authenticatedClient
            .post()
            .uri("/api/host/event")
            .bodyValue(eventCreateDTO)
            .exchange()
            .expectStatus().isOk
    }
}
