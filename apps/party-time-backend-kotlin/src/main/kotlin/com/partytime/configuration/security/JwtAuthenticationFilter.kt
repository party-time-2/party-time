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

class JwtAuthenticationFilter(
    private val jwtService: JwtService,
    private val userDetailsService: UserDetailsService
): OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authHeader = request.getHeader(HttpHeaders.AUTHORIZATION)

        try {
            if (authHeader != null && authHeader.isNotBlank()) {
                val claims: Claims = jwtService.extractClaims(authHeader)
                val valid: Boolean = jwtService.isValid(claims, true)
                if (valid && SecurityContextHolder.getContext().authentication == null) {
                    // Token Valid and no Authentication present
                    val userDetails = userDetailsService.loadUserByUsername(jwtService.getEmail(claims))

                    if (userDetails is PartyTimeUserDetails) {
                        val auth = TokenAuthentication(userDetails)

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
