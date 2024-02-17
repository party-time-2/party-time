package com.partytime.service

import com.partytime.api.dto.account.AccountDeleteDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.configuration.security.TokenAuthentication
import com.partytime.jpa.entity.Event
import jakarta.transaction.Transactional
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AccountDeletionService (
    private val accountService: AccountService,
    private val eventService: EventService,
    private val passwordEncoder: PasswordEncoder
) {

    /**
     * Implements F015
     */
    @Transactional
    fun deleteAccount(deleteDTO: AccountDeleteDTO, authentication: TokenAuthentication) {
        // Check Password
        val account = accountService.getAccount(authentication.principal.username)
        if (!passwordEncoder.matches(deleteDTO.password, account.pwHash)) {
            throw ApiError.unauthorized().asException()
        }

        // Every occurrence of an account has to be deleted
        // Include all Deletes here
        val events: List<Event> = eventService.getEvents(account.email)
        eventService.deleteMultipleEvents(events)

        // Lastly remove the Account
        accountService.deleteAccount(account)
    }
}
