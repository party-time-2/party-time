package com.partytime.configuration.security

import com.partytime.jpa.entity.Account
import com.partytime.service.AccountService
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException

/**
 * A [UserDetailsService] class for user details related functionality.
 *
 * @param accountService Service for fetching user details
 * @constructor Constructs a new [PartyTimeUserDetailsService]
 */
class PartyTimeUserDetailsService(
    private val accountService: AccountService
) : UserDetailsService {

    /**
     * Fetches the details of a user with [accountService].
     *
     * @param username Username of the user that should be fetched.
     * @return Information about user with the provided [username]
     */
    override fun loadUserByUsername(username: String): UserDetails =
        accountService.optAccountByMail(username)
            .map { account: Account ->
                PartyTimeUserDetails(account)
            }
            .orElseThrow {
                UsernameNotFoundException("User doesn't exist")
            }
}
