package com.partytime.configuration.security

import com.partytime.jpa.entity.Account
import com.partytime.service.AccountService
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException


class PartyTimeUserDetailsService(
    private val accountService: AccountService
) : UserDetailsService {


    override fun loadUserByUsername(username: String): UserDetails =
        accountService.optAccount(username)
            .map { account: Account ->
                PartyTimeUserDetails(account)
            }
            .orElseThrow {
                UsernameNotFoundException("User doesn't exist")
            }
}
