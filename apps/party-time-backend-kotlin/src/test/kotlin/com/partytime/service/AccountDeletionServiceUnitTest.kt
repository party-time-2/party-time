package com.partytime.service

import com.partytime.api.dto.account.AccountDeleteDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.ApiErrorException
import com.partytime.api.error.asException
import com.partytime.assertApiErrorExceptionEquals
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.jpa.entity.Event
import com.partytime.jpa.entity.Invitation
import com.partytime.jpa.entity.Status
import com.partytime.testAbstraction.UnitTest
import com.partytime.testUtility.generateAddress
import com.partytime.testUtility.generateOrganizerAccount
import com.partytime.testUtility.generateParticipantAccount
import io.mockk.every
import io.mockk.justRun
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import java.time.ZonedDateTime

class AccountDeletionServiceUnitTest : UnitTest() {

    private val accountService = mockk<AccountService>()
    private val cryptService = mockk<CryptService>()
    private val organizerService = mockk<OrganizerService>()
    private val participantService = mockk<ParticipantService>()

    private val accountDeletionService =
        AccountDeletionService(accountService, cryptService, organizerService, participantService)

    private val address = generateAddress(true)

    private val deleteThisAccountData = generateOrganizerAccount()
    private val deleteThisAccount = deleteThisAccountData.account

    private val firstParticipantAccountData = generateParticipantAccount(
        verified = true,
        withVerificationCode = false
    )
    private val firstParticipantAccount = firstParticipantAccountData.account

    private val secondParticipantAccountData = generateParticipantAccount(
        verified = true,
        withVerificationCode = false
    )
    private val secondParticipantAccount = secondParticipantAccountData.account

    private val firstOrganizedEvent = Event(deleteThisAccount, "FirstTestEvent", ZonedDateTime.now().plusMonths(3), address)
        .apply {
            id = 0L
            invitations.add(Invitation(firstParticipantAccount, this, Status.INVITED).apply { id = 0L })
            invitations.add(Invitation(secondParticipantAccount, this, Status.DECLINED).apply { id = 1L })
        }

    private val secondOrganizedEvent = Event(deleteThisAccount, "SecondTestEvent", ZonedDateTime.now().plusMonths(5), address)
        .apply { id = 1L }
    private val secondEventParticipatingInvitation = Invitation(firstParticipantAccount, secondOrganizedEvent, Status.PARTICIPATING).apply {
        id = 2L
        secondOrganizedEvent.invitations.add(this)
    }

    private val secondOrganizerAccountData = generateOrganizerAccount()
    private val secondOrganizerAccount = secondOrganizerAccountData.account
    private val participatingEvent = Event(secondOrganizerAccount, "ThirdTestEvent", ZonedDateTime.now().plusMonths(8), address)
        .apply { id = 2L }
    private val participatingEventParticipatingInvitation = Invitation(deleteThisAccount, participatingEvent, Status.INVITED).also {
        participatingEvent.invitations.add(it)
    }
    private val declinedEvent = Event(secondOrganizerAccount, "FourthTestEvent", ZonedDateTime.now().plusMonths(2), address)
        .apply { id = 3L }
    private val declinedEventDeclinedInvitation = Invitation(deleteThisAccount, declinedEvent, Status.DECLINED).also {
        declinedEvent.invitations.add(it)
    }

    @Nested
    inner class DeleteAccountTest : UnitTest() {
        private val accountDeleteDTO = AccountDeleteDTO(
            deleteThisAccountData.additionalAccountTestInformation.passwordPlainText
        )

        private val authentication = mockk<AuthenticationToken>()

        @Test
        fun deleteAccountSuccess() {
            //setup - mock
            every { authentication.principal } returns deleteThisAccount.email
            every { accountService.getAccountByMail(deleteThisAccount.email) } returns deleteThisAccount
            every { cryptService.passwordMatchesHash(deleteThisAccountData.additionalAccountTestInformation.passwordPlainText, deleteThisAccount.pwHash) } returns true
            every { organizerService.getEvents(deleteThisAccount.email) } returns listOf(firstOrganizedEvent, secondOrganizedEvent)
            justRun { organizerService.deleteMultipleEvents(listOf(firstOrganizedEvent, secondOrganizedEvent), deleteThisAccount.email) }
            every { participantService.getInvitations(deleteThisAccount.email) } returns listOf(participatingEventParticipatingInvitation, declinedEventDeclinedInvitation)
            justRun { participantService.declineInvitation(participatingEvent.id!!, deleteThisAccount.email) }
            justRun { participantService.deleteAllInvitations(deleteThisAccount.email) }
            justRun { accountService.deleteAccount(deleteThisAccount) }

            //execute
            accountDeletionService.deleteAccount(accountDeleteDTO, authentication)

            //verify
            verify(exactly = 2) { authentication.principal }
            verify(exactly = 1) { accountService.getAccountByMail(deleteThisAccount.email) }
            verify(exactly = 1) { cryptService.passwordMatchesHash(deleteThisAccountData.additionalAccountTestInformation.passwordPlainText, deleteThisAccount.pwHash) }
            verify(exactly = 1) { organizerService.getEvents(deleteThisAccount.email) }
            verify(exactly = 1) { organizerService.deleteMultipleEvents(listOf(firstOrganizedEvent, secondOrganizedEvent), deleteThisAccount.email) }
            verify(exactly = 1) { participantService.getInvitations(deleteThisAccount.email) }
            verify(exactly = 1) { participantService.declineInvitation(participatingEvent.id!!, deleteThisAccount.email) }
            verify(exactly = 1) { participantService.deleteAllInvitations(deleteThisAccount.email) }
            verify(exactly = 1) { accountService.deleteAccount(deleteThisAccount) }
        }

        @Test
        fun deleteAccountUnauthorized() {
            //setup - mock
            every { authentication.principal } returns deleteThisAccount.email
            every { accountService.getAccountByMail(deleteThisAccount.email) } returns deleteThisAccount
            every { cryptService.passwordMatchesHash(deleteThisAccountData.additionalAccountTestInformation.passwordPlainText, deleteThisAccount.pwHash) } returns false

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                accountDeletionService.deleteAccount(accountDeleteDTO, authentication)
            }

            val expectedException = ApiError.unauthorized().asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { authentication.principal }
            verify(exactly = 1) { accountService.getAccountByMail(deleteThisAccount.email) }
            verify(exactly = 1) { cryptService.passwordMatchesHash(deleteThisAccountData.additionalAccountTestInformation.passwordPlainText, deleteThisAccount.pwHash) }
        }
    }
}
