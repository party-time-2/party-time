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

/**
 * A [Service] class for Json Web Token (Jwt) related functionality.
 *
 * @param configurationProperties Container for the jwt secret that should be used to sign every created token
 * @constructor Constructs a new [JwtService]
 */
@Service
class JwtService(
    private val configurationProperties: PartyTimeConfigurationProperties
) {
    companion object {
        /** Issuer URL of all created auth tokens */
        const val ISSUER: String = "https://partytime.de/auth"

        /** Descriptor of e-mail claim */
        const val CLAIM_EMAIL: String = "email"

        /** Descriptor of name claim */
        const val CLAIM_NAME: String = "name"

        /** Descriptor of e-mail-verified claim */
        const val CLAIM_EMAIL_VERIFIED: String = "email_verified"
    }

    /**
     * Creates a new access token for an account.
     *
     * @param account Creates a new access token for this [Account]
     * @return Access token for the provided [Account]
     */
    fun createAccessToken(account: Account): String =
        createToken(account.email, account.name, account.emailVerified)

    /**
     * Implements F011
     *
     * Creates a Jwt token with an e-mail address, name, and information about the e-mail verification status
     *
     * @param email e-mail address to be included in the claims of the Jwt
     * @param name name to be included in the claims of the Jwt
     * @param emailVerified Information about the e-mail verification status to be included in the claims of the Jwt
     * @return A newly created Jwt containing the provided information inside its [Claims]
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

    /**
     * Checks the validity and extracts the claims of a token
     *
     * @param token the Jwt from which claims should be extracted
     * @return extracted claims of a validated token
     */
    fun extractClaims(token: String): Claims = Jwts //TODO check if builder result can't be saved in property
        .parser()
        .requireIssuer(ISSUER)
        .clockSkewSeconds(10)
        .verifyWith(getSignInKey())
        .build()
        .parseSignedClaims(token)
        .payload

    /**
     * Checks if extracted claims are valid.
     *
     * @param claims Instance of [Claims] whose validity should be checked
     * @return Information about the validity of the claims
     */
    fun isValid(claims: Claims): Boolean = claims.run {
        issuer.equals(ISSUER)
                && id != null
                && issuedAt.before(Date())
                && subject != null
                && get(CLAIM_EMAIL) != null
    }

    /**
     * Extract the e-mail address from Jwt Claims
     *
     * @param claims extract the e-mail address from this [Claims] object
     * @return e-mail address contained in the provided [Claims] object
     */
    fun getEmail(claims: Claims): String = claims.get(CLAIM_EMAIL, String::class.java)
}
