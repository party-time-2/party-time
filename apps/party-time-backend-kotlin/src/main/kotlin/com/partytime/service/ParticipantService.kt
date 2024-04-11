package com.partytime.service

import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.jpa.entity.Event
import com.partytime.jpa.entity.Invitation
import com.partytime.jpa.entity.Status
import com.partytime.jpa.repository.InvitationRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * A [Service] class for event related functionality.
 *
 * @param invitationRepository Repository where event-participation related information can be stored.
 * @param accountService Service used fetch accounts (for e-mail recipient information and event organizer ownership checks)
 * @constructor Constructs a new [ParticipantService]
 */
@Service
class ParticipantService (
    private val invitationRepository: InvitationRepository,
    private val accountService: AccountService,
) {
    /**
     * Implements F007
     *
     * Fetches all events a user has been invited to (including events where the user has declined the invite).
     *
     * @param participantEmail E-mail-address of the invitee
     * @return List of [Event] the user has been invited to
     */
    @Transactional(readOnly = true)
    fun getParticipatingEvents(participantEmail: String): List<Invitation> =
        invitationRepository.findAllByAccount_Email(participantEmail)

    /**
     * Implements F007
     *
     * Fetches information about an Event invitation.
     *
     * @param eventId id of the event for which a participant has been invited
     * @param participantEmail E-mail-address of the invitee
     */
    fun getInvitation(eventId: Long, participantEmail: String): Invitation =
        accountService.getAccountByMail(participantEmail).let { account ->
            invitationRepository.findByEvent_IdAndAccount_Id(eventId, account.id!!)
                .orElseThrow {
                    ApiError.notFound("Die Einladung konnte nicht gefunden werden").asException()
                }
        }

    /**
     * Implements F008
     *
     * Updates an event invitation with information about accepting the invitation.
     *
     * @param eventId id of the event for which a participant has accepted the invitation
     * @param participantEmail E-mail-address of the accepting invitee
     */
    fun acceptInvitation(eventId: Long, participantEmail: String) {
        val eventParticipant = getInvitation(eventId, participantEmail)
        eventParticipant.status = Status.PARTICIPATING
        invitationRepository.save(eventParticipant)
    }

    /**
     * Implements F009
     *
     * Updates an event invitation with information about declining the invitation.
     *
     * @param eventId id of the event for which a participant has accepted the invitation
     * @param participantEmail E-mail-address of the rejecting invitee
     */
    fun declineInvitation(eventId: Long, participantEmail: String) {
        val eventParticipant = getInvitation(eventId, participantEmail)
        eventParticipant.status = Status.DECLINED
        invitationRepository.save(eventParticipant)
    }

    /**
     * Deletes all invitations of a user
     *
     * @param participantEmail E-mail-address of the user whose invitations should be deleted
     */
    @Transactional
    fun deleteAllInvitations(participantEmail: String) {
        val invitations = getParticipatingEvents(participantEmail)
        invitationRepository.deleteAllInBatch(invitations)
    }
}
