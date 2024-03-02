package com.partytime.service

import com.partytime.api.dto.account.AccountDeleteDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.jpa.entity.Event
import jakarta.transaction.Transactional
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

/**
 * A [Service] class that contains functionality for deleting an account.
 *
 * @param accountService Service used to fetch account related information and delete an account
 * @param eventService Service used to delete events of a to-be-deleted account
 * @param passwordEncoder [PasswordEncoder] used to compare a provided password with a stored password hash
 * @constructor Creates a new [AccountDeletionService]
 */
@Service
class AccountDeletionService(
    private val accountService: AccountService,
    private val eventService: EventService,
    private val passwordEncoder: PasswordEncoder
) {

    /**
     * Implements F015
     *
     * Deletes the account of the user authenticated with [authentication].
     * Succeeds if the user provides the correct password of their account with [deleteDTO].
     */
    @Transactional
    fun deleteAccount(deleteDTO: AccountDeleteDTO, authentication: AuthenticationToken) {
        // Check Password
        val account = accountService.getAccountByMail(authentication.principal)
        if (!passwordEncoder.matches(deleteDTO.password, account.pwHash)) {
            throw ApiError.unauthorized().asException()
        }

        // Every occurrence of an account has to be deleted
        // Include all Deletes here
        val events: List<Event> = eventService.getEvents(account.email)
        eventService.deleteMultipleEvents(events, authentication.principal)

        // Lastly remove the Account
        accountService.deleteAccount(account)
    }
}
