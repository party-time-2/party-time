package com.partytime.service

import com.partytime.api.dto.account.AccountRegisterDTO
import com.partytime.api.dto.changepassword.ChangePasswordDTO
import com.partytime.api.dto.login.LoginRequestDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.ApiErrorException
import com.partytime.api.error.asException
import com.partytime.assertApiErrorExceptionEquals
import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.configuration.security.PartyTimeUserDetails
import com.partytime.configuration.security.TokenAuthentication
import com.partytime.jpa.entity.Account
import com.partytime.jpa.repository.AccountRepository
import com.partytime.mail.model.MailEvent
import com.partytime.mail.model.VerifyAccountData
import com.partytime.testAbstraction.UnitTest
import io.mockk.every
import io.mockk.justRun
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.context.ApplicationEventPublisher
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.util.Optional
import java.util.UUID

class AuthServiceTest : UnitTest() {
    private val accountService = mockk<AccountService>()
    private val accountRepository = mockk<AccountRepository>()
    private val passwordEncoder = BCryptPasswordEncoder()
    private val jwtService = mockk<JwtService>()
    private val configurationProperties = mockk<PartyTimeConfigurationProperties>()
    private val applicationEventPublisher = mockk<ApplicationEventPublisher>()

    //AuthService
    private val authService = AuthService(
        accountService,
        accountRepository,
        passwordEncoder,
        jwtService,
        configurationProperties,
        applicationEventPublisher
    )

    private val eMail = "example@example.com"
    private val testPassword = "Abc!def5ghi"
    private val testAccount = Account(eMail, true, "Example Example", passwordEncoder.encode(testPassword))

    private val url = "http://localhost:8090"

    @Test
    fun registerAccountSuccess() {
        //setup - data
        val accountRegisterDTO = AccountRegisterDTO(
            "Example Example",
            "example@example.com",
            "Abc!def5ghi"
        )

        val account = Account(
            accountRegisterDTO.email,
            false,
            accountRegisterDTO.name,
            passwordEncoder.encode(accountRegisterDTO.password),
            emailVerificationCode = UUID.randomUUID().toString()
        )

        //setup - mock
        every { configurationProperties.url } returns url
        every { accountRepository.existsByEmail(accountRegisterDTO.email) } returns false
        every { accountRepository.save(account) } answers {
            account.also { it.id = 0 }
        }

        justRun { applicationEventPublisher.publishEvent(any()) }

        //execute
        val savedAccount = authService.registerAccount(accountRegisterDTO)
        assertEquals(account, savedAccount)

        //validate
        verify(exactly = 2) { configurationProperties.url } //accessed twice to construct VerifyAccountData
        verify(exactly = 1) { accountRepository.existsByEmail(accountRegisterDTO.email) }
        verify(exactly = 1) { accountRepository.save(account) }
        verify(exactly = 1) {
            applicationEventPublisher.publishEvent(withArg {
                val mailEvent = it as MailEvent
                assertEquals(savedAccount.email, mailEvent.recipientEmail)
                assertEquals("Verifiziere deinen Account!", mailEvent.subject)

                val verifyAccountData = mailEvent.data as VerifyAccountData
                assertEquals(url, verifyAccountData.homepage)
                assertEquals(savedAccount.name, verifyAccountData.name)
                assertEquals(
                    "$url/auth/verify/${savedAccount.emailVerificationCode}",
                    verifyAccountData.verificationLink
                )
            })
        }
    }

    @Test
    fun registerAccountAlreadyExists() {
        //setup - data
        val accountRegisterDTO = AccountRegisterDTO(
            "Example Example",
            "example@example.com",
            "Abc!def5ghi"
        )

        //setup - mock
        every { accountRepository.existsByEmail(accountRegisterDTO.email) } returns true

        //execute
        val thrownException = assertThrows<ApiErrorException> {
            authService.registerAccount(accountRegisterDTO)
        }

        val expectedException = ApiError.badRequest("Ein Account mit dieser E-Mail existiert bereits!").asException()
        assertApiErrorExceptionEquals(expectedException, thrownException)

        //verify
        verify(exactly = 1) { accountRepository.existsByEmail(accountRegisterDTO.email) }
    }

    @Test
    fun verifyAccountSuccess() {
        //setup - data
        val verificationCode = UUID.randomUUID().toString()

        val account = Account(
            "example@example.com",
            false,
            "Example Example",
            passwordEncoder.encode("Abc!def5ghi"),
            emailVerificationCode = verificationCode
        ).apply {
            id = 0
        }

        //setup - mock
        every { accountRepository.findByEmailVerificationCode(verificationCode) } returns Optional.of(account)
        every { accountRepository.save(account) } returns account

        //execute
        authService.verifyAccount(verificationCode)

        //verify
        verify(exactly = 1) { accountRepository.findByEmailVerificationCode(verificationCode) }
        verify(exactly = 1) { accountRepository.save(withArg { savedAccount ->
            assertEquals(account.email, savedAccount.email)
            assertTrue(savedAccount.emailVerified)
            assertEquals(account.name, savedAccount.name)
            assertEquals(account.pwHash, savedAccount.pwHash)
            assertNull(savedAccount.emailVerificationCode)
        }) }
    }

    @Test
    fun verifyAccountFailed() {
        //setup - data
        val verificationCode = UUID.randomUUID().toString()

        //setup - mock
        every { accountRepository.findByEmailVerificationCode(verificationCode) } returns Optional.empty()

        //execute
        val thrownException = assertThrows<ApiErrorException> {
            authService.verifyAccount(verificationCode)
        }

        val expectedException = ApiError.badRequest("E-Mail Verifizierung fehlgeschlagen").asException()
        assertApiErrorExceptionEquals(expectedException, thrownException)

        //verify
        verify(exactly = 1) { accountRepository.findByEmailVerificationCode(verificationCode) }
    }

    @Test
    fun loginUserSuccess() {
        //setup - data
        val loginRequestDTO = LoginRequestDTO(
            "example@example.com",
            "Abc!def5ghi"
        )

        val account = Account(
            loginRequestDTO.email,
            false,
            "Example Example",
            passwordEncoder.encode(loginRequestDTO.password)
        ).apply {
            id = 0
            emailVerified = true
        }

        //setup - mock
        val exampleToken = "exampleToken"

        every { accountService.getAccount(loginRequestDTO.email) } returns account
        every { jwtService.createAccessToken(account) } returns exampleToken

        //execute
        val loginResponseDTO = authService.loginUser(loginRequestDTO)
        assertEquals(exampleToken, loginResponseDTO.token)

        //verify
        verify(exactly = 1) { accountService.getAccount(loginRequestDTO.email) }
        verify(exactly = 1) { jwtService.createAccessToken(account) }
    }

    @Test
    fun loginUserForbidden() {
        //setup - data
        val loginRequestDTO = LoginRequestDTO(
            "example@example.com",
            "Abc!def5ghi"
        )

        val account = Account(
            loginRequestDTO.email,
            false,
            "Example Example",
            passwordEncoder.encode(loginRequestDTO.password)
        ).apply {
            id = 0
            emailVerified = false
        }

        //setup - mock
        every { accountService.getAccount(loginRequestDTO.email) } returns account

        //execute
        val thrownException = assertThrows<ApiErrorException> {
            authService.loginUser(loginRequestDTO)
        }
        val expectedException = ApiError.forbidden().asException()
        assertApiErrorExceptionEquals(expectedException, thrownException)

        //verify
        verify(exactly = 1) { accountService.getAccount(loginRequestDTO.email) }
    }

    @Test
    fun loginUserUnauthorized() {
        //setup - data
        val validPassword = "Abc!def5ghi"
        val invalidPassword = "wrong!Password5unauthorized"

        val loginRequestDTO = LoginRequestDTO(
            "example@example.com",
            invalidPassword
        )

        val account = Account(
            loginRequestDTO.email,
            false,
            "Example Example",
            passwordEncoder.encode(validPassword)
        ).apply {
            id = 0
            emailVerified = true
        }

        //setup - mock
        every { accountService.getAccount(loginRequestDTO.email) } returns account

        //execute
        val thrownException = assertThrows<ApiErrorException> {
            authService.loginUser(loginRequestDTO)
        }
        val expectedException = ApiError.unauthorized().asException()
        assertApiErrorExceptionEquals(expectedException, thrownException)

        //verify
        verify(exactly = 1) { accountService.getAccount(loginRequestDTO.email) }
    }

    @Test
    fun changePasswordSuccess() {
        val changePasswordDTO = ChangePasswordDTO(
            testPassword,
            "Jkl?mno2pqr"
        )

        val partyTimeUserDetails = PartyTimeUserDetails(testAccount)
        val authentication = TokenAuthentication(partyTimeUserDetails)

        every { accountService.getAccount(eMail) } returns testAccount

        val changedAccount = Account(
            testAccount.email,
            testAccount.emailVerified,
            testAccount.name,
            passwordEncoder.encode(changePasswordDTO.newPassword)
        )

        every { accountRepository.save(changedAccount) } returns changedAccount

        authService.changePassword(changePasswordDTO, authentication)

        verify(exactly = 1) { accountService.getAccount(eMail) }
        verify(exactly = 1) { accountRepository.save(changedAccount) }
    }

    @Test
    fun changePasswordUnauthorized() {
        val changePasswordDTO = ChangePasswordDTO(
            "wrong!Password5unauthorized",
            "Jkl?mno2pqr"
        )
        val partyTimeUserDetails = PartyTimeUserDetails(testAccount)
        val authentication = TokenAuthentication(partyTimeUserDetails)

        every { accountService.getAccount(eMail) } returns testAccount

        val thrownException = assertThrows<ApiErrorException> {
            authService.changePassword(changePasswordDTO, authentication)
        }

        val expectedException = ApiError.unauthorized().asException()
        assertApiErrorExceptionEquals(expectedException, thrownException)

        verify(exactly = 1) { accountService.getAccount(eMail) }
    }
}
