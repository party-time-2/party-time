package com.partytime.service

import com.partytime.api.dto.login.LoginRequestDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.ApiErrorException
import com.partytime.api.error.asException
import com.partytime.assertApiErrorExceptionEquals
import com.partytime.testAbstraction.UnitTest
import com.partytime.testUtility.generateParticipantAccount
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
import java.util.Optional
import java.util.UUID

class AuthServiceUnitTest : UnitTest() {
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

    @Nested
    inner class VerifyAccountTests : UnitTest() {
        private val validVerificationCode = UUID.randomUUID().toString()
        private val invalidVerificationCode = UUID.randomUUID().toString()

        private val account = generateParticipantAccount(
            verified = false,
            withVerificationCode = true
        ).account

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
    inner class LoginUserTests : UnitTest() {
        private val invalidPassword = "wrong!Password5unauthorized"

        private val verifiedAccountData = generateParticipantAccount(
            verified = true,
            withVerificationCode = false
        )
        private val verifiedAccount = verifiedAccountData.account

        private val verifiedValidLoginRequestDTO = LoginRequestDTO(
            verifiedAccount.email,
            verifiedAccountData.additionalAccountTestInformation.passwordPlainText
        )

        private val verifiedInvalidLoginRequestDTO = LoginRequestDTO(
            verifiedAccount.email,
            invalidPassword
        )

        private val unverifiedAccountData = generateParticipantAccount(
            verified = false,
            withVerificationCode = true
        )
        private val unverifiedAccount = unverifiedAccountData.account

        private val unverifiedValidLoginRequestDTO = LoginRequestDTO(
            unverifiedAccount.email,
            unverifiedAccountData.additionalAccountTestInformation.passwordPlainText
        )

        private val exampleJwtToken = "exampleToken"

        @Test
        fun loginUserSuccess() {
            //setup - mock
            every { accountService.getAccountByMail(verifiedAccount.email) } returns verifiedAccount
            every { cryptService.passwordMatchesHash(verifiedAccountData.additionalAccountTestInformation.passwordPlainText, verifiedAccount.pwHash) } returns true
            every { jwtService.createAccessToken(verifiedAccount) } returns exampleJwtToken

            //execute
            val loginResponseDTO = authService.loginUser(verifiedValidLoginRequestDTO)
            assertEquals(exampleJwtToken, loginResponseDTO.token)

            //verify
            verify(exactly = 1) { accountService.getAccountByMail(verifiedAccount.email) }
            verify(exactly = 1) { cryptService.passwordMatchesHash(verifiedAccountData.additionalAccountTestInformation.passwordPlainText, verifiedAccount.pwHash) }
            verify(exactly = 1) { jwtService.createAccessToken(verifiedAccount) }
        }

        @Test
        fun loginUserForbidden() {
            //setup - mock
            every { accountService.getAccountByMail(unverifiedAccount.email) } returns unverifiedAccount

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                //expected to throw a Forbidden exception because the account hasn't been verified yet
                authService.loginUser(unverifiedValidLoginRequestDTO)
            }
            val expectedException = ApiError.forbidden().asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { accountService.getAccountByMail(unverifiedAccount.email) }
        }

        @Test
        fun loginUserUnauthorized() {
            //setup - mock
            every { accountService.getAccountByMail(verifiedAccount.email) } returns verifiedAccount
            every { cryptService.passwordMatchesHash(invalidPassword, verifiedAccount.pwHash) } returns false

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                authService.loginUser(verifiedInvalidLoginRequestDTO)
            }
            val expectedException = ApiError.unauthorized().asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { accountService.getAccountByMail(verifiedAccount.email) }
            verify(exactly = 1) { cryptService.passwordMatchesHash(invalidPassword, verifiedAccount.pwHash) }
        }
    }
}
