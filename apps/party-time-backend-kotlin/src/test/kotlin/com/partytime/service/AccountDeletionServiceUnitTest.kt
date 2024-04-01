package com.partytime.service

import com.partytime.EMAIL
import com.partytime.NAME
import com.partytime.PASSWORD
import com.partytime.api.dto.account.AccountDeleteDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.ApiErrorException
import com.partytime.api.error.asException
import com.partytime.assertApiErrorExceptionEquals
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.jpa.entity.Account
import com.partytime.testAbstraction.UnitTest
import io.mockk.every
import io.mockk.justRun
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

class AccountDeletionServiceUnitTest: UnitTest() {

    private val accountService = mockk<AccountService>()
    private val cryptService = mockk<CryptService>()
    private val organizerService = mockk<OrganizerService>()

    private val accountDeletionService = AccountDeletionService(accountService, cryptService, organizerService)

    private val testPasswordEncoder = BCryptPasswordEncoder()
    private val encodedPassword = testPasswordEncoder.encode(PASSWORD)

    @Nested
    inner class DeleteAccountTest {
        private val accountDeleteDTO = AccountDeleteDTO(
            PASSWORD
        )

        private val account = Account(
            EMAIL,
            true,
            NAME,
            encodedPassword
        ).apply {
            id = 0
        }

        private val authentication = mockk<AuthenticationToken>()

        @Test
        fun deleteAccountSuccess() {
            //setup - mock
            every { authentication.principal } returns EMAIL
            every { accountService.getAccountByMail(EMAIL) } returns account
            every { cryptService.passwordMatchesHash(PASSWORD, encodedPassword) } returns true
            every { organizerService.getEvents(EMAIL) } returns emptyList()
            justRun { organizerService.deleteMultipleEvents(any(), EMAIL) }
            justRun { accountService.deleteAccount(any()) }

            //execute
            accountDeletionService.deleteAccount(accountDeleteDTO, authentication)

            //verify
            verify(exactly = 2) { authentication.principal }
            verify(exactly = 1) { accountService.getAccountByMail(EMAIL) }
            verify(exactly = 1) { cryptService.passwordMatchesHash(PASSWORD, encodedPassword) }
            verify(exactly = 1) { organizerService.getEvents(EMAIL) }
            verify(exactly = 1) { organizerService.deleteMultipleEvents(any(), EMAIL) }
            verify(exactly = 1) { accountService.deleteAccount(any()) }




        }

        @Test
        fun deleteAccountUnauthorized() {
            //setup - mock
            every { authentication.principal } returns EMAIL
            every { accountService.getAccountByMail(EMAIL) } returns account
            every { cryptService.passwordMatchesHash(PASSWORD, encodedPassword) } returns false

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                accountDeletionService.deleteAccount(accountDeleteDTO, authentication)
            }

            val expectedException = ApiError.unauthorized().asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { authentication.principal }
            verify(exactly = 1) { accountService.getAccountByMail(EMAIL) }
            verify(exactly = 1) { cryptService.passwordMatchesHash(PASSWORD, encodedPassword) }
        }
    }


}
