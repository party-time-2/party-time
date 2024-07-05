package com.partytime.scenario

import com.partytime.api.dto.account.AccountRegisterDTO
import com.partytime.api.dto.login.LoginRequestDTO
import com.partytime.api.dto.login.LoginResponseDTO
import com.partytime.mail.model.MailEvent
import com.partytime.mail.model.VerifyAccountData
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.event.ApplicationEvents
import org.springframework.test.context.event.RecordApplicationEvents
import org.springframework.test.web.servlet.client.MockMvcWebTestClient
import org.springframework.web.context.WebApplicationContext

@SpringBootTest
@RecordApplicationEvents
class RegisterVerifyLogin (
    wac: WebApplicationContext,
) {
    val client = MockMvcWebTestClient.bindToApplicationContext(wac).build()

    @Test
    fun testRegisterAndVerify(applicationEvents: ApplicationEvents) {
        //register Account
        val accountRegisterDTO = AccountRegisterDTO(
            "Test Test",
            "test37@test.com",
            "Hallo123!party"
        )

        client.post().uri("/api/account")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(accountRegisterDTO)
            .exchange()
            .expectStatus().isOk

        //verify account

        val mailEvent: MailEvent =
            applicationEvents.stream()
                .filter { it is MailEvent && it.data is VerifyAccountData }
                .findFirst().orElseThrow() as MailEvent

        val verificationLink = (mailEvent.data as VerifyAccountData).verificationLink
        val token = verificationLink.substringAfter("token=")

        client.post().uri("/api/auth/verify?token=$token")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(object {})
            .exchange()
            .expectStatus().isOk

        //login
        val loginRequestDTO = LoginRequestDTO(
            accountRegisterDTO.email,
            accountRegisterDTO.password,
        )

        client.post().uri("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(loginRequestDTO)
            .exchange()
            .expectAll(
                { spec -> spec.expectStatus().isOk },
                { spec -> spec.expectBody(LoginResponseDTO::class.java) }
            )
    }
}
