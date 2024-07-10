package com.partytime.scenario

import com.partytime.api.dto.login.LoginRequestDTO
import com.partytime.api.error.ApiError
import com.partytime.testAbstraction.ScenarioTest
import com.partytime.util.TestDataGenerator
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.http.MediaType
import org.springframework.web.context.WebApplicationContext

class APIError(
    wac: WebApplicationContext,
): ScenarioTest(wac) {

    @Test
    fun testAPIErrorMethodArgumentNotValid() {
        val loginRequestDTO = LoginRequestDTO(
            "notAnEmail",
            TestDataGenerator.DEBUG_PASSWORD
        )

        unauthenticatedClient.post()
            .uri("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(loginRequestDTO)
            .exchange()
            .expectStatus().isEqualTo(409)
            .expectBody(ApiError::class.java)
            .value {
                assertEquals("Validation failed for Parameter 'body'", it.message)
            }
    }
}
