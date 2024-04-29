package com.partytime.service

import com.partytime.EMAIL
import com.partytime.NAME
import com.partytime.ORGANIZER_EMAIL
import com.partytime.ORGANIZER_NAME
import com.partytime.ORGANIZER_PASSWORD
import com.partytime.PASSWORD
import com.partytime.api.dto.account.AccountDeleteDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.ApiErrorException
import com.partytime.api.error.asException
import com.partytime.assertApiErrorExceptionEquals
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.jpa.entity.Account
import com.partytime.jpa.entity.Address
import com.partytime.jpa.entity.Event
import com.partytime.jpa.entity.Invitation
import com.partytime.jpa.entity.Status
import com.partytime.testAbstraction.UnitTest
import io.mockk.every
import io.mockk.justRun
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.time.LocalDateTime

class AccountDeletionServiceUnitTest : UnitTest() {

    private val accountService = mockk<AccountService>()
    private val cryptService = mockk<CryptService>()
    private val organizerService = mockk<OrganizerService>()
    private val participantService = mockk<ParticipantService>()

    private val accountDeletionService =
        AccountDeletionService(accountService, cryptService, organizerService, participantService)

    private val testPasswordEncoder = BCryptPasswordEncoder()
    private val encodedUserPassword = testPasswordEncoder.encode(PASSWORD)
    private val encodedOrganizerPassword = testPasswordEncoder.encode(ORGANIZER_PASSWORD)

    private val userAccount = Account(EMAIL, true, NAME, encodedUserPassword)
    private val organizerAccount = Account(ORGANIZER_EMAIL, true, ORGANIZER_NAME, encodedOrganizerPassword)
    private val eventId = 0L
    private val event =
        Event(organizerAccount, "TestEvent", LocalDateTime.now(), Address("", "", "", "", ""), mutableSetOf()).apply {
            id = eventId
        }
    private val invitation = Invitation(userAccount, event, Status.INVITED).also {
        event.invitations.add(it)
    }

    @Nested
    inner class DeleteAccountTest {
        private val accountDeleteDTO = AccountDeleteDTO(
            PASSWORD
        )

        private val account = Account(
            EMAIL,
            true,
            NAME,
            encodedUserPassword
        ).apply {
            id = 0
        }

        private val authentication = mockk<AuthenticationToken>()

        @Test
        fun deleteAccountSuccess() {
            //setup - mock
            every { authentication.principal } returns EMAIL
            every { accountService.getAccountByMail(EMAIL) } returns account
            every { cryptService.passwordMatchesHash(PASSWORD, encodedUserPassword) } returns true
            every { organizerService.getEvents(EMAIL) } returns emptyList()
            justRun { organizerService.deleteMultipleEvents(any(), EMAIL) }
            every { participantService.getParticipatingEvents(EMAIL) } returns listOf(invitation)
            justRun { participantService.declineInvitation(eventId, EMAIL) }
            justRun { participantService.deleteAllInvitations(EMAIL) }
            justRun { accountService.deleteAccount(account) }

            //execute
            accountDeletionService.deleteAccount(accountDeleteDTO, authentication)

            //verify
            verify(exactly = 2) { authentication.principal }
            verify(exactly = 1) { accountService.getAccountByMail(EMAIL) }
            verify(exactly = 1) { cryptService.passwordMatchesHash(PASSWORD, encodedUserPassword) }
            verify(exactly = 1) { organizerService.getEvents(EMAIL) }
            verify(exactly = 1) { organizerService.deleteMultipleEvents(any(), EMAIL) }
            verify(exactly = 1) { participantService.getParticipatingEvents(EMAIL) }
            verify(exactly = 1) { participantService.declineInvitation(eventId, EMAIL) }
            verify(exactly = 1) { participantService.deleteAllInvitations(EMAIL) }
            verify(exactly = 1) { accountService.deleteAccount(account) }
        }

        @Test
        fun deleteAccountUnauthorized() {
            //setup - mock
            every { authentication.principal } returns EMAIL
            every { accountService.getAccountByMail(EMAIL) } returns account
            every { cryptService.passwordMatchesHash(PASSWORD, encodedUserPassword) } returns false

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                accountDeletionService.deleteAccount(accountDeleteDTO, authentication)
            }

            val expectedException = ApiError.unauthorized().asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { authentication.principal }
            verify(exactly = 1) { accountService.getAccountByMail(EMAIL) }
            verify(exactly = 1) { cryptService.passwordMatchesHash(PASSWORD, encodedUserPassword) }
        }
    }


}
