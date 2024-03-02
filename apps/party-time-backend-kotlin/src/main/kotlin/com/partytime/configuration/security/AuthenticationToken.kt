package com.partytime.configuration.security

import org.springframework.security.authentication.AbstractAuthenticationToken
import java.util.Objects

/**
 * Authentication token that users can use to authenticate themselves after authenticating themselves via password.
 *
 * @param details Information about the user for which the [AuthenticationToken] is issued
 * @constructor Constructs a new authentication token for a user
 */
class AuthenticationToken(private val details: PartyTimeUserDetails) : AbstractAuthenticationToken(emptyList()) {
    init {
        isAuthenticated = true
        setDetails(details)
    }

    /**
     * Password hash of the authenticated user
     *
     * @return credentials of the AuthenticationToken
     */
    override fun getCredentials(): String = details.password

    /**
     * Username of the authenticated user.
     *
     * @return principal of the AuthenticationToken
     */
    override fun getPrincipal(): String = details.username

    override fun equals(other: Any?): Boolean = when {
        this === other -> true
        other == null || javaClass != other.javaClass -> false
        !super.equals(other) -> false
        else -> other is AuthenticationToken && Objects.equals(details, other.details)
    }

    override fun hashCode(): Int = Objects.hash(super.hashCode(), details)
}
