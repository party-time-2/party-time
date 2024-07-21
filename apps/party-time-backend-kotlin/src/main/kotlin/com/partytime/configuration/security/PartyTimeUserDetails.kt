package com.partytime.configuration.security

import com.partytime.jpa.entity.Account
import org.springframework.security.core.userdetails.User

/**
 * User details used to authenticate users when they want to use protected server functionality.
 * Server-internal use only.
 */
class PartyTimeUserDetails(account: Account): User(
    account.email, account.pwHash, emptyList()
)
