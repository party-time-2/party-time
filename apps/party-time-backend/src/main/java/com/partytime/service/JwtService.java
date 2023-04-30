package com.partytime.service;

import com.partytime.configuration.PartyTimeConfigurationProperties;
import com.partytime.jpa.entity.Account;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    public static final String ISSUER = "https://partytime.de/auth";
    public static final String SUB_REFRESH = "refresh-token";
    public static final String CLAIM_EMAIL = "email";
    public static final String CLAIM_NAME = "name";
    public static final String CLAIM_EMAIL_VERIFIED = "email_verified";
    private final PartyTimeConfigurationProperties configurationProperties;

    public String createAccessToken(Account account) {
        return createToken(account);
    }

    public Claims extractClaims(String token) {
        return Jwts
            .parserBuilder()
            .requireIssuer(ISSUER)
            .setAllowedClockSkewSeconds(10)
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    public boolean isValid(Claims claims, boolean accessToken) {
        return claims.getIssuer().equals(ISSUER)
            && claims.getId() != null
            && claims.getIssuedAt().before(new Date())
            && (accessToken ? claims.getSubject() != null : claims.getSubject().equals(SUB_REFRESH))
            && claims.get(CLAIM_EMAIL) != null;
    }

    public String getEmail(Claims claims) {
        return claims.get(CLAIM_EMAIL, String.class);
    }

    /**
     * Implements F011
     */
    private String createToken(Account account) {
        return Jwts.builder()
            .setId(UUID.randomUUID().toString())
            .setIssuedAt(createDate(LocalDateTime.now()))
            .setIssuer(ISSUER)
            .setSubject(UUID.randomUUID().toString())
            .claim(CLAIM_EMAIL, account.getEmail())
            .claim(CLAIM_NAME, account.getName())
            .claim(CLAIM_EMAIL_VERIFIED, account.isEmailVerified())
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(configurationProperties.getJwt().getSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Date createDate(LocalDateTime date) {
        return Date.from(date.atZone(ZoneId.systemDefault()).toInstant());
    }

}
