package com.partytime.configuration.security

import com.partytime.jpa.entity.Account
import org.springframework.security.core.userdetails.User

class PartyTimeUserDetails(account: Account): User(
    account.email, account.pwHash, emptyList()
)
