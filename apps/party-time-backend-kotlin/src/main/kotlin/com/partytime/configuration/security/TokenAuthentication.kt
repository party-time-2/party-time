package com.partytime.configuration.security

import org.springframework.security.authentication.AbstractAuthenticationToken
import java.util.Objects

class TokenAuthentication(private val details: PartyTimeUserDetails) : AbstractAuthenticationToken(emptyList()) {
    init {
        isAuthenticated = true
        setDetails(details)
    }

    override fun getCredentials(): String = details.password

    override fun getPrincipal(): PartyTimeUserDetails = details

    override fun equals(other: Any?): Boolean = when {
        this === other -> true
        other == null || javaClass != other.javaClass -> false
        !super.equals(other) -> false
        else -> other is TokenAuthentication && Objects.equals(details, other.details)
    }

    override fun hashCode(): Int = Objects.hash(super.hashCode(), details)
}
