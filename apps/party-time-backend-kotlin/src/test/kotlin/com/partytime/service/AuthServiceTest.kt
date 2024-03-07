package com.partytime.service

import com.partytime.api.dto.login.LoginRequestDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.ApiErrorException
import com.partytime.api.error.asException
import com.partytime.assertApiErrorExceptionEquals
import com.partytime.jpa.entity.Account
import com.partytime.testAbstraction.UnitTest
import io.mockk.every
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
    private val cryptService = mockk<CryptService>()
    private val jwtService = mockk<JwtService>()
    private val applicationEventPublisher = mockk<ApplicationEventPublisher>()

    //AuthService
    private val authService = AuthService(
        accountService,
        cryptService,
        jwtService,
        applicationEventPublisher
    )

    private val testPasswordEncoder = BCryptPasswordEncoder()

    @Test
    fun verifyAccountSuccess() {
        //setup - data
        val verificationCode = UUID.randomUUID().toString()

        val account = Account(
            "example@example.com",
            false,
            "Example Example",
            testPasswordEncoder.encode("Abc!def5ghi"),
            emailVerificationCode = verificationCode
        ).apply {
            id = 0
        }

        //setup - mock
        every { accountService.accountByEmailVerificationCode(verificationCode) } returns Optional.of(account)
        every { accountService.saveAccount(account) } returns account

        //execute
        authService.verifyAccount(verificationCode)

        //verify
        verify(exactly = 1) { accountService.accountByEmailVerificationCode(verificationCode) }
        verify(exactly = 1) {
            accountService.saveAccount(withArg { savedAccount ->
                assertEquals(account.email, savedAccount.email)
                assertTrue(savedAccount.emailVerified)
                assertEquals(account.name, savedAccount.name)
                assertEquals(account.pwHash, savedAccount.pwHash)
                assertNull(savedAccount.emailVerificationCode)
            })
        }
    }

    @Test
    fun verifyAccountFailed() {
        //setup - data
        val verificationCode = UUID.randomUUID().toString()

        //setup - mock
        every { accountService.accountByEmailVerificationCode(verificationCode) } returns Optional.empty()

        //execute
        val thrownException = assertThrows<ApiErrorException> {
            authService.verifyAccount(verificationCode)
        }

        val expectedException = ApiError.badRequest("E-Mail Verifizierung fehlgeschlagen").asException()
        assertApiErrorExceptionEquals(expectedException, thrownException)

        //verify
        verify(exactly = 1) { accountService.accountByEmailVerificationCode(verificationCode) }
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
            testPasswordEncoder.encode(loginRequestDTO.password)
        ).apply {
            id = 0
            emailVerified = true
        }

        //setup - mock
        val exampleToken = "exampleToken"

        every { accountService.getAccountByMail(loginRequestDTO.email) } returns account
        every { cryptService.passwordMatchesHash(loginRequestDTO.password, account.pwHash) } returns true
        every { jwtService.createAccessToken(account) } returns exampleToken

        //execute
        val loginResponseDTO = authService.loginUser(loginRequestDTO)
        assertEquals(exampleToken, loginResponseDTO.token)

        //verify
        verify(exactly = 1) { accountService.getAccountByMail(loginRequestDTO.email) }
        verify(exactly = 1) { cryptService.passwordMatchesHash(loginRequestDTO.password, account.pwHash) }
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
            testPasswordEncoder.encode(loginRequestDTO.password)
        ).apply {
            id = 0
            emailVerified = false
        }

        //setup - mock
        every { accountService.getAccountByMail(loginRequestDTO.email) } returns account

        //execute
        val thrownException = assertThrows<ApiErrorException> {
            authService.loginUser(loginRequestDTO)
        }
        val expectedException = ApiError.forbidden().asException()
        assertApiErrorExceptionEquals(expectedException, thrownException)

        //verify
        verify(exactly = 1) { accountService.getAccountByMail(loginRequestDTO.email) }
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
            testPasswordEncoder.encode(validPassword)
        ).apply {
            id = 0
            emailVerified = true
        }

        //setup - mock
        every { accountService.getAccountByMail(loginRequestDTO.email) } returns account
        every { cryptService.passwordMatchesHash(loginRequestDTO.password, account.pwHash) } returns false


        //execute
        val thrownException = assertThrows<ApiErrorException> {
            authService.loginUser(loginRequestDTO)
        }
        val expectedException = ApiError.unauthorized().asException()
        assertApiErrorExceptionEquals(expectedException, thrownException)

        //verify
        verify(exactly = 1) { accountService.getAccountByMail(loginRequestDTO.email) }
        verify(exactly = 1) { cryptService.passwordMatchesHash(loginRequestDTO.password, account.pwHash) }
    }
}
