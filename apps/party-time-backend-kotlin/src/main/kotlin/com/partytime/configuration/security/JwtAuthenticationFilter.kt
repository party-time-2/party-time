package com.partytime.configuration.security

import com.partytime.service.JwtService
import io.jsonwebtoken.Claims
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpHeaders
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.web.filter.OncePerRequestFilter

/**
 * Filter that transforms a Jwt-based authentication header into a code-accessible [AuthenticationToken]
 *
 * @param jwtService Service for processing Jwt information
 * @param userDetailsService Service for loading user details (mainly the password hash)
 * @constructor Constructs a new [JwtAuthenticationFilter]
 */
class JwtAuthenticationFilter(
    private val jwtService: JwtService,
    private val userDetailsService: UserDetailsService
): OncePerRequestFilter() {

    /**
     * Filter that transforms an auth-header into a code-accessible [AuthenticationToken]
     *
     * @param request Incoming request that contains the auth-header
     * @param response Outgoing response that won't be modified by this function
     * @param filterChain used to proceed with the request
     */
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authHeader = request.getHeader(HttpHeaders.AUTHORIZATION)

        try {
            if (authHeader != null && authHeader.isNotBlank()) {
                val claims: Claims = jwtService.extractClaims(authHeader)
                val valid: Boolean = jwtService.isValid(claims)
                if (valid && SecurityContextHolder.getContext().authentication == null) {
                    // Token Valid and no Authentication present
                    val userDetails = userDetailsService.loadUserByUsername(jwtService.getEmail(claims))

                    if (userDetails is PartyTimeUserDetails) {
                        val auth = AuthenticationToken(userDetails)

                        SecurityContextHolder.getContext().authentication = auth
                    }
                }
            }
        } catch (e: Exception) {
            // Any Exception in Token parsing results in 401
            logger.debug("Failed to Parse Token", e)
        }
        filterChain.doFilter(request, response)
    }

}
