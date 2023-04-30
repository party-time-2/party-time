package com.partytime.configuration.security;

import com.partytime.service.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        try {
            if (authHeader != null && !authHeader.isBlank()) {
                Claims claims = jwtService.extractClaims(authHeader);
                boolean valid = jwtService.isValid(claims, true);
                if (valid && SecurityContextHolder.getContext().getAuthentication() == null) {
                    // Token Valid and no Authentication present
                    UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.getEmail(claims));

                    if (userDetails instanceof PartyTimeUserDetails details) {
                        TokenAuthentication auth = new TokenAuthentication(details);

                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }

            }
        } catch (Exception e) {
            // Any Exception in Token parsing results in 401
            logger.debug("Failed to Parse Token", e);
        }
        filterChain.doFilter(request, response);
    }

}
