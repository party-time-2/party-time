package com.partytime.testAbstraction

import com.partytime.VERIFIED_EMAIL
import com.partytime.api.dto.login.LoginRequestDTO
import com.partytime.api.dto.login.LoginResponseDTO
import com.partytime.util.TestDataGenerator
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers
import org.springframework.test.context.event.RecordApplicationEvents
import org.springframework.test.web.reactive.server.returnResult
import org.springframework.test.web.servlet.client.MockMvcWebTestClient
import org.springframework.web.context.WebApplicationContext

@SpringBootTest
@RecordApplicationEvents
abstract class ScenarioTest(
    wac: WebApplicationContext
) {
    val unauthenticatedClient = MockMvcWebTestClient
        .bindToApplicationContext(wac)
        .apply(SecurityMockMvcConfigurers.springSecurity())
        .build()

    val authenticatedClient by lazy {
        //login
        val loginRequestDTO = LoginRequestDTO(
            VERIFIED_EMAIL,
            TestDataGenerator.DEBUG_PASSWORD,
        )

        val loginResponse = unauthenticatedClient.post().uri("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(loginRequestDTO)
            .exchange()
            .expectAll(
                { spec -> spec.expectStatus().isOk },
                { spec -> spec.expectBody(LoginResponseDTO::class.java) }
            ).returnResult<LoginResponseDTO>()
            .responseBody
            .single()
            .block() ?: throw IllegalStateException("JWT Token not retrieved")

        unauthenticatedClient.mutateWith { builder, _, _ ->
            builder.defaultHeaders {
                it.set("Authorization", loginResponse.token)
            }
        }
    }
}
