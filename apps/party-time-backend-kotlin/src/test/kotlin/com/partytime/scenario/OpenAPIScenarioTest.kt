package com.partytime.scenario

import com.partytime.configuration.OpenApiConfiguration
import com.partytime.testAbstraction.PartyTimeWebTestClients
import com.partytime.testAbstraction.ScenarioTest
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Import

@Import(value = [OpenApiConfiguration::class])
class OpenAPIScenarioTest  @Autowired constructor(
    private val wtc: PartyTimeWebTestClients
) : ScenarioTest() {

    @Test
    fun testOpenAPI() {
        wtc.unauthenticatedClient
            .get()
            .uri("/v3/api-docs")
            .exchange()
            .expectStatus().isOk

        wtc.unauthenticatedClient
            .get()
            .uri("/swagger-ui/index.html")
            .exchange()
            .expectStatus().isOk
    }
}
