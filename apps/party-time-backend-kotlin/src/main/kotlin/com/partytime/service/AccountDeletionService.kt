package com.partytime.service

import com.partytime.api.dto.account.AccountDeleteDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.jpa.entity.Event
import com.partytime.jpa.entity.Status
import org.springframework.stereotype.Service

/**
 * A [Service] class that contains functionality for deleting an account.
 * Can't be integrated into [AccountService], since the deletion process requires [OrganizerService].
 * [OrganizerService] already depends on [AccountService], which would result in a circular dependency.
 *
 * @param accountService Service used to fetch account related information and delete an account
 * @param cryptService Used to encode passwords and check if passwords match hashes
 * @param organizerService Service used to retrieve organized events during account deletion
 * @param participantService Service used to retrieve and cancel invitations
 * @constructor Creates a new [AccountDeletionService]
 */
@Service
class AccountDeletionService(
    private val accountService: AccountService,
    private val cryptService: CryptService,
    private val organizerService: OrganizerService,
    private val participantService: ParticipantService
) {

    /**
     * Implements F015
     *
     * Deletes the account of the user authenticated with [authentication].
     * Succeeds if the user provides the correct password of their account with [deleteDTO].
     *
     * @param deleteDTO Information container for current password
     * @param authentication Authentication details of the currently authenticated user.
     */
    @org.springframework.transaction.annotation.Transactional
    fun deleteAccount(deleteDTO: AccountDeleteDTO, authentication: AuthenticationToken) {
        // Check Password
        val account = accountService.getAccountByMail(authentication.principal)
        if (!cryptService.passwordMatchesHash(deleteDTO.password, account.pwHash)) {
            //FIXME better error message
            throw ApiError.unauthorized().asException()
        }

        // Every occurrence of an account has to be deleted
        // Include all Deletes here
        val events: List<Event> = organizerService.getEvents(account.email)
        organizerService.deleteMultipleEvents(events, authentication.principal)

        val invitations = participantService.getParticipatingEvents(account.email)
        invitations.forEach { invitation ->
            if(invitation.status != Status.DECLINED)
                participantService.declineInvitation(invitation.event.id!!, account.email)
        }

        participantService.deleteAllInvitations(account.email)

        // Lastly remove the Account
        accountService.deleteAccount(account)
    }
}
