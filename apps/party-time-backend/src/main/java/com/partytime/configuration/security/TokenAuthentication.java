package com.partytime.configuration.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;

import java.util.Collections;

public class TokenAuthentication extends AbstractAuthenticationToken {

    private final PartyTimeUserDetails details;

    /**
     * Creates a token with the supplied array of authorities.
     */
    public TokenAuthentication(PartyTimeUserDetails details) {
        super(Collections.emptyList());
        this.details = details;
        setAuthenticated(true);
        setDetails(details);
    }

    @Override
    public Object getCredentials() {
        return details.getPassword();
    }

    @Override
    public Object getPrincipal() {
        return details;
    }

}
