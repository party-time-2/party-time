package com.partytime.configuration.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;

import java.util.Collections;
import java.util.Objects;

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
    public String getCredentials() {
        return details.getPassword();
    }

    @Override
    public PartyTimeUserDetails getPrincipal() {
        return details;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        TokenAuthentication that = (TokenAuthentication) o;
        return Objects.equals(getDetails(), that.getDetails());
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getDetails());
    }
}
