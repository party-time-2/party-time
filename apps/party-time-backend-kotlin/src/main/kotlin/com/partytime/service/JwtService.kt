package com.partytime.service

import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.jpa.entity.Account
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.Date
import java.util.UUID
import javax.crypto.SecretKey

@Service
class JwtService (
    private val configurationProperties: PartyTimeConfigurationProperties
) {
    companion object {
        const val ISSUER: String = "https://partytime.de/auth"
        const val SUB_REFRESH: String = "refresh-token"
        const val CLAIM_EMAIL: String = "email"
        const val CLAIM_NAME: String = "name"
        const val CLAIM_EMAIL_VERIFIED: String = "email_verified"
    }

    fun createAccessToken(account: Account): String =
        createAccessToken(account.email, account.name, account.emailVerified)

    fun createAccessToken(email: String, name: String, emailVerified: Boolean): String =
        createToken(email, name, emailVerified)

    fun extractClaims(token: String): Claims = Jwts
        .parser()
        .requireIssuer(ISSUER)
        .clockSkewSeconds(10)
        .verifyWith(getSignInKey())
        .build()
        .parseSignedClaims(token)
        .payload

    fun isValid(claims: Claims, accessToken: Boolean): Boolean = claims.run {
        issuer.equals(ISSUER)
                && id != null
                && issuedAt.before(Date())
                && if (accessToken) (subject != null) else subject.equals(SUB_REFRESH)
                && get(CLAIM_EMAIL) != null
    }

    fun getEmail(claims: Claims): String = claims.get(CLAIM_EMAIL, String::class.java)

    /**
     * Implements F011
     */
    private fun createToken(email: String, name: String, emailVerified: Boolean): String = Jwts.builder()
        .id(UUID.randomUUID().toString())
        .issuedAt(createDate(LocalDateTime.now()))
        .issuer(ISSUER)
        .subject(UUID.randomUUID().toString())
        .claim(CLAIM_EMAIL, email)
        .claim(CLAIM_NAME, name)
        .claim(CLAIM_EMAIL_VERIFIED, emailVerified)
        .signWith(getSignInKey(), Jwts.SIG.HS384)
        .compact()

    private fun getSignInKey(): SecretKey = Decoders.BASE64.decode(configurationProperties.jwt.secret)
        .let(Keys::hmacShaKeyFor)

    private fun createDate(date: LocalDateTime): Date =
        Date.from(date.atZone(ZoneId.systemDefault()).toInstant())

}
