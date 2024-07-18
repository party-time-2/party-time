package com.partytime.testAbstraction

import com.partytime.service.AccountService
import com.partytime.service.JwtService
import org.springframework.boot.test.context.TestComponent
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.test.web.servlet.client.MockMvcWebTestClient
import org.springframework.web.context.WebApplicationContext

@TestComponent
class PartyTimeWebTestClients(
    wac: WebApplicationContext,
    private val accountService: AccountService,
    private val jwtService: JwtService
) {
    val unauthenticatedClient = MockMvcWebTestClient
        .bindToApplicationContext(wac)
        .apply(SecurityMockMvcConfigurers.springSecurity())
        .build()

    fun authenticatedClientByEmail(email: String): WebTestClient =
        unauthenticatedClient.mutateWith { builder, _, _ ->
            builder.defaultHeaders {
                val token = jwtService.createAccessToken(accountService.getAccountByMail(email))
                it.set("Authorization", token)
            }
        }
}
