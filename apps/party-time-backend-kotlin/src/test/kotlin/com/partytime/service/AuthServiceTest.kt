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
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.context.ApplicationEventPublisher
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.util.Optional
import java.util.UUID

private const val email = "example@example.com"
private const val name = "Example Example"
private const val plainTextPassword = "Abc!def5ghi"

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
    private val encodedPassword = testPasswordEncoder.encode(plainTextPassword)

    @Nested
    inner class VerifyAccountTests {
        private val validVerificationCode = UUID.randomUUID().toString()
        private val invalidVerificationCode = UUID.randomUUID().toString()

        private val account = Account(
            email,
            false,
            name,
            encodedPassword,
            emailVerificationCode = validVerificationCode
        ).apply {
            id = 0
        }

        @Test
        fun verifyAccountSuccess() {
            //setup - mock
            every { accountService.accountByEmailVerificationCode(validVerificationCode) } returns Optional.of(account)
            every { accountService.saveAccount(account) } returns account

            //execute
            authService.verifyAccount(validVerificationCode)
            assertNull(account.emailVerificationCode)
            assertTrue(account.emailVerified)

            //verify
            verify(exactly = 1) { accountService.accountByEmailVerificationCode(validVerificationCode) }
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
            //setup - mock
            every { accountService.accountByEmailVerificationCode(invalidVerificationCode) } returns Optional.empty()

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                authService.verifyAccount(invalidVerificationCode)
            }

            val expectedException = ApiError.badRequest("E-Mail Verifizierung fehlgeschlagen").asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { accountService.accountByEmailVerificationCode(invalidVerificationCode) }
        }
    }

    @Nested
    inner class LoginUserTests {
        private val verificationCode = UUID.randomUUID().toString()
        private val invalidPassword = "wrong!Password5unauthorized"

        private val invalidLoginRequestDTO = LoginRequestDTO(
            email,
            invalidPassword
        )

        private val validLoginRequestDTO = LoginRequestDTO(
            email,
            plainTextPassword
        )

        private val verifiedAccount = Account(
            email,
            true,
            name,
            encodedPassword
        ).apply {
            id = 0
        }

        private val unverifiedAccount = Account(
            email,
            false,
            name,
            encodedPassword
        ).apply {
            id = 0
            emailVerificationCode = verificationCode
        }

        private val exampleJwtToken = "exampleToken"

        @Test
        fun loginUserSuccess() {
            //setup - mock
            every { accountService.getAccountByMail(email) } returns verifiedAccount
            every { cryptService.passwordMatchesHash(plainTextPassword, encodedPassword) } returns true
            every { jwtService.createAccessToken(verifiedAccount) } returns exampleJwtToken

            //execute
            val loginResponseDTO = authService.loginUser(validLoginRequestDTO)
            assertEquals(exampleJwtToken, loginResponseDTO.token)

            //verify
            verify(exactly = 1) { accountService.getAccountByMail(email) }
            verify(exactly = 1) { cryptService.passwordMatchesHash(plainTextPassword, encodedPassword) }
            verify(exactly = 1) { jwtService.createAccessToken(verifiedAccount) }
        }

        @Test
        fun loginUserForbidden() {
            //setup - mock
            every { accountService.getAccountByMail(email) } returns unverifiedAccount

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                //expected to throw a Forbidden exception because the account hasn't been verified yet
                authService.loginUser(validLoginRequestDTO)
            }
            val expectedException = ApiError.forbidden().asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { accountService.getAccountByMail(email) }
        }

        @Test
        fun loginUserUnauthorized() {
            //setup - mock
            every { accountService.getAccountByMail(email) } returns verifiedAccount
            every { cryptService.passwordMatchesHash(invalidPassword, encodedPassword) } returns false

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                authService.loginUser(invalidLoginRequestDTO)
            }
            val expectedException = ApiError.unauthorized().asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { accountService.getAccountByMail(email) }
            verify(exactly = 1) { cryptService.passwordMatchesHash(invalidPassword, encodedPassword) }
        }
    }
}
