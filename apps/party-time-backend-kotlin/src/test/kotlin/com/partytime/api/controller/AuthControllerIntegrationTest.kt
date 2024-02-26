package com.partytime.api.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.ninjasquad.springmockk.MockkBean
import com.partytime.api.dto.account.AccountRegisterDTO
import com.partytime.configuration.security.AuthEntryPointJwt
import com.partytime.configuration.security.SecurityConfiguration
import com.partytime.jpa.entity.Account
import com.partytime.jpa.repository.AccountRepository
import com.partytime.service.AccountService
import com.partytime.service.AuthService
import com.partytime.service.JwtService
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.h2.H2ConsoleProperties
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.context.annotation.Import
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.setup.DefaultMockMvcBuilder
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

@ExtendWith(SpringExtension::class)
//@AutoConfigureJsonTesters
@WebMvcTest(AuthController::class)
@TestPropertySource(properties = ["spring.config.additional-location=classpath:application-integration-test.yml"])
@Import(AuthEntryPointJwt::class, SecurityConfiguration::class, AccountService::class, H2ConsoleProperties::class, AuthService::class)
class AuthControllerIntegrationTest @Autowired constructor(
    //private val jsonAccountDTO: JacksonTester<AccountDTO>
    private val context: WebApplicationContext,
) {

    @MockkBean
    private lateinit var accountRepository: AccountRepository

    @MockkBean
    private lateinit var authenticationProvider: AuthenticationProvider

    @MockkBean
    private lateinit var jwtService: JwtService

    private val objectMapper = ObjectMapper()

    private lateinit var mvc: MockMvc

    @BeforeEach
    fun setUp() {
        mvc = MockMvcBuilders.webAppContextSetup(context)
            .apply<DefaultMockMvcBuilder>(springSecurity())
            .build()
    }

    @Test
    fun register() {
        val accountRegisterDTO = AccountRegisterDTO(
            "Example Example",
            "example@example.com",
            "ab1cdef?gh"
        )

        val mockOutputAccount = mockk<Account>()
        every { mockOutputAccount.id } returns 0L
        every { mockOutputAccount.name } returns accountRegisterDTO.name
        every { mockOutputAccount.email } returns accountRegisterDTO.email
        every { mockOutputAccount.emailVerified } returns false

        every { accountRepository.save(
            any()
        ) } returns mockOutputAccount

        every { accountRepository.existsByEmail(any()) } returns false

        val response = mvc.perform(
            post("/api/auth/register")
                .content(objectMapper.writeValueAsString(accountRegisterDTO))
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .with(csrf())
        ).andReturn().response

        assertEquals(HttpStatus.OK.value(), response.status)
        val responseAccount = objectMapper.readValue(response.contentAsString, Account::class.java)
        assertEquals(0L, responseAccount.id)
        assertEquals(accountRegisterDTO.name, responseAccount.name)
        assertEquals(accountRegisterDTO.email, responseAccount.email)
    }
}
