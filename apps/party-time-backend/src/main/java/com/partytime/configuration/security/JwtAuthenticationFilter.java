package com.partytime.configuration.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.partytime.api.error.ApiError;
import com.partytime.service.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || authHeader.isBlank()) {
            filterChain.doFilter(request, response);
//            failAuth(response);
            return;
        }

        try {
            Claims claims = jwtService.extractClaims(authHeader);
            boolean valid = jwtService.isValid(claims, true);
            if (valid && SecurityContextHolder.getContext().getAuthentication() == null) {
                // Token Valid and no Authentication present
                TokenAuthentication auth = new TokenAuthentication(claims);
                auth.setDetails(new WebAuthenticationDetailsSource()
                    .buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(auth);
            }

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            // Any Exception in Token parsing results in 401
            logger.debug("Failed to Parse Token", e);
//            failAuth(response);
        }
    }

    private void failAuth(HttpServletResponse response) throws IOException {
        response.setStatus(401);
        response.addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        ApiError error = ApiError.unauthorized();
        String json = objectMapper.writeValueAsString(error);
        PrintWriter writer = response.getWriter();
        writer.write(json);
        writer.flush();
    }

}
