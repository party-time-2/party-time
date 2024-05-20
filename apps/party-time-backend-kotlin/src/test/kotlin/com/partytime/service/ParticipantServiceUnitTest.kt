package com.partytime.service

import com.partytime.EVENT_NAME
import com.partytime.api.error.ApiError
import com.partytime.api.error.ApiErrorException
import com.partytime.api.error.asException
import com.partytime.assertApiErrorExceptionEquals
import com.partytime.jpa.entity.Event
import com.partytime.jpa.entity.Invitation
import com.partytime.jpa.entity.Status
import com.partytime.jpa.repository.InvitationRepository
import com.partytime.testAbstraction.UnitTest
import com.partytime.testUtility.generateAddress
import com.partytime.testUtility.generateOrganizerAccount
import com.partytime.testUtility.generateParticipantAccount
import io.mockk.every
import io.mockk.justRun
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertIterableEquals
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import org.junit.jupiter.api.assertThrows
import java.time.ZonedDateTime
import java.util.Optional

class ParticipantServiceUnitTest : UnitTest() {

    private val invitationRepository = mockk<InvitationRepository>()
    private val accountService = mockk<AccountService>()

    private val participantService = ParticipantService(invitationRepository, accountService)

    private val organizerAccount = generateOrganizerAccount().account
    private val address = generateAddress(true)
    private val event = Event(
        organizerAccount,
        EVENT_NAME,
        ZonedDateTime.now().plusMonths(3),
        address
    ).apply { id = 0L }

    private val participantAccount = generateParticipantAccount(
        verified = true,
        withVerificationCode = false
    ).account

    private val invitation = Invitation(
        participantAccount,
        event,
        Status.INVITED
    )

    @Test
    fun getInvitations() {
        //setup - mock
        every { invitationRepository.findAllByAccount_Email(participantAccount.email) } returns listOf(invitation)

        //execute
        val invitations = participantService.getInvitations(participantAccount.email)
        assertIterableEquals(listOf(invitation), invitations)

        //verify
        verify(exactly = 1) { invitationRepository.findAllByAccount_Email(participantAccount.email) }
    }

    @Nested
    inner class GetInvitation {
        @Test
        fun getInvitationSuccess() {
            //setup - mock
            every { accountService.getAccountByMail(participantAccount.email) } returns participantAccount
            every {
                invitationRepository.findByEvent_IdAndAccount_Id(
                    event.id!!,
                    participantAccount.id!!
                )
            } returns Optional.of(invitation)

            //execute
            val foundInvitation = participantService.getInvitation(event.id!!, participantAccount.email)
            assertEquals(invitation, foundInvitation)

            //verify
            verify(exactly = 1) { accountService.getAccountByMail(participantAccount.email) }
            verify(exactly = 1) {
                invitationRepository.findByEvent_IdAndAccount_Id(
                    event.id!!,
                    participantAccount.id!!
                )
            }
        }

        @Test
        fun getInvitationNotFound() {
            //setup - mock
            every { accountService.getAccountByMail(participantAccount.email) } returns participantAccount
            every {
                invitationRepository.findByEvent_IdAndAccount_Id(
                    event.id!!,
                    participantAccount.id!!
                )
            } returns Optional.empty()

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                participantService.getInvitation(event.id!!, participantAccount.email)
            }
            val expectedException = ApiError.notFound("Die Einladung konnte nicht gefunden werden").asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { accountService.getAccountByMail(participantAccount.email) }
            verify(exactly = 1) {
                invitationRepository.findByEvent_IdAndAccount_Id(
                    event.id!!,
                    participantAccount.id!!
                )
            }
        }
    }

    @Test
    fun acceptInvitation() {
        //setup - mock
        every { accountService.getAccountByMail(participantAccount.email) } returns participantAccount
        every {
            invitationRepository.findByEvent_IdAndAccount_Id(
                event.id!!,
                participantAccount.id!!
            )
        } returns Optional.of(invitation)
        every { invitationRepository.save(any()) } answers {
            firstArg<Invitation>().also {
                it.id = it.id ?: 0L
            }
        }

        //execute
        assertDoesNotThrow {
            participantService.acceptInvitation(event.id!!, participantAccount.email)
        }
        assertEquals(Status.PARTICIPATING, invitation.status)

        //verify
        verify(exactly = 1) { accountService.getAccountByMail(participantAccount.email) }
        verify(exactly = 1) {
            invitationRepository.findByEvent_IdAndAccount_Id(
                event.id!!,
                participantAccount.id!!
            )
        }
        verify(exactly = 1) {
            invitationRepository.save(withArg<Invitation> {
                assertEquals(participantAccount, it.account)
                assertEquals(event, it.event)
                assertEquals(Status.PARTICIPATING, it.status)
            })
        }
    }

    @Test
    fun declineInvitation() {
        //setup - mock
        every { accountService.getAccountByMail(participantAccount.email) } returns participantAccount
        every {
            invitationRepository.findByEvent_IdAndAccount_Id(
                event.id!!,
                participantAccount.id!!
            )
        } returns Optional.of(invitation)
        every { invitationRepository.save(any()) } answers {
            firstArg<Invitation>().also {
                it.id = it.id ?: 0L
            }
        }

        //execute
        assertDoesNotThrow {
            participantService.declineInvitation(event.id!!, participantAccount.email)
        }
        assertEquals(Status.DECLINED, invitation.status)

        //verify
        verify(exactly = 1) { accountService.getAccountByMail(participantAccount.email) }
        verify(exactly = 1) {
            invitationRepository.findByEvent_IdAndAccount_Id(
                event.id!!,
                participantAccount.id!!
            )
        }
        verify(exactly = 1) {
            invitationRepository.save(withArg<Invitation> {
                assertEquals(participantAccount, it.account)
                assertEquals(event, it.event)
                assertEquals(Status.DECLINED, it.status)
            })
        }
    }

    @Test
    fun deleteAllInvitations() {
        //setup - mock
        every { invitationRepository.findAllByAccount_Email(participantAccount.email) } returns listOf(invitation)
        justRun { invitationRepository.flush() }
        justRun { invitationRepository.deleteAllInBatch(listOf(invitation)) }

        //execute
        participantService.deleteAllInvitations(participantAccount.email)

        //verify
        verify(exactly = 1) { invitationRepository.findAllByAccount_Email(participantAccount.email) }
        verify(exactly = 1) { invitationRepository.flush() }
        verify(exactly = 1) { invitationRepository.deleteAllInBatch(listOf(invitation)) }
    }
}
