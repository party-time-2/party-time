package com.partytime.configuration.security;

import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;

public class TokenAuthentication extends AbstractAuthenticationToken {

    private final Claims claims;
    private final UserDetails principal;

    /**
     * Creates a token with the supplied array of authorities.
     */
    public TokenAuthentication(Claims claims) {
        super(Collections.emptyList());
        this.claims = claims;
        this.principal = User.withUsername(claims.get("email", String.class))
            .authorities(Collections.emptyList())
            .build();
        this.setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }

    public Claims getClaims() {
        return claims;
    }
}
