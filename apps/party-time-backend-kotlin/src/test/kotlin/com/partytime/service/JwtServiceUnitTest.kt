package com.partytime.service

import com.partytime.EMAIL
import com.partytime.NAME
import com.partytime.PASSWORD
import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.jpa.entity.Account
import com.partytime.testAbstraction.UnitTest
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.Arguments
import org.junit.jupiter.params.provider.MethodSource
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.util.Calendar
import java.util.Date
import java.util.UUID
import java.util.stream.Stream

class JwtServiceUnitTest : UnitTest() {
    companion object {

        @JvmStatic
        fun isValidFalseArgumentProvider(): Stream<Arguments> {
            val dateThreeMonthsAgo = Calendar.getInstance().apply {
                time = Date()
                add(Calendar.MONTH, -3)
            }.time

            val dateThreeMonthsFuture = Calendar.getInstance().apply {
                time = Date()
                add(Calendar.MONTH, 3)
            }.time

            return Stream.of(
                Arguments.of("Not Issuer", "Not null", dateThreeMonthsAgo, "Not null", "Not null"),
                Arguments.of(JwtService.ISSUER, null, dateThreeMonthsAgo, "Not null", "Not null"),
                Arguments.of(JwtService.ISSUER, "Not null", dateThreeMonthsFuture, "Not null", "Not null"),
                Arguments.of(JwtService.ISSUER, "Not null", dateThreeMonthsAgo, null, "Not null"),
                Arguments.of(JwtService.ISSUER, "Not null", dateThreeMonthsAgo, "Not null", null),
            )
        }
    }

    private val configurationProperties = mockk<PartyTimeConfigurationProperties>()
    private val cryptService = mockk<CryptService>()
    private val jwtService = JwtService(configurationProperties, cryptService)

    private val passwordEncoder = BCryptPasswordEncoder()
    private val encodedPassword = passwordEncoder.encode(PASSWORD)
    private val account = Account(
        EMAIL,
        true,
        NAME,
        encodedPassword
    )

    private val randomUUID = UUID.randomUUID()
    private val secret = "pJADh3HysJ0dbNNnvfTub2vnus9pg7ddP894ZFcyKu72XmX78qU97yuvpOuwEcoe"
    private val signInKey = Decoders.BASE64.decode(secret).let(Keys::hmacShaKeyFor)
    private val jwtsParser = Jwts
        .parser()
        .requireIssuer(JwtService.ISSUER)
        .clockSkewSeconds(10)
        .verifyWith(signInKey)
        .build()

    private val claims = mockk<Claims>()

    @Test
    fun createAccessToken() {
        //setup - mock
        every { cryptService.randomUUID() } returns randomUUID
        every { configurationProperties.jwt.secret } returns secret
        //execute
        val token = jwtService.createAccessToken(account)
        val payload = jwtsParser.parseSignedClaims(token).payload
        assertEquals(randomUUID.toString(), payload.id)
        assertEquals(JwtService.ISSUER, payload.issuer)
        assertEquals(randomUUID.toString(), payload.subject)
        assertEquals(EMAIL, payload[JwtService.CLAIM_EMAIL])
        assertEquals(NAME, payload[JwtService.CLAIM_NAME])
        assertEquals(true, payload[JwtService.CLAIM_EMAIL_VERIFIED])

        //verify
        verify(exactly = 2) { cryptService.randomUUID() }
        verify(exactly = 1) { configurationProperties.jwt.secret }
    }

    @Test
    fun extractClaims() {
        //setup - mock
        every { cryptService.randomUUID() } returns randomUUID
        every { configurationProperties.jwt.secret } returns secret

        //execute
        val token = jwtService.createAccessToken(account) //no other way to create token
        val payload = jwtService.extractClaims(token)
        assertEquals(randomUUID.toString(), payload.id)
        assertEquals(JwtService.ISSUER, payload.issuer)
        assertEquals(randomUUID.toString(), payload.subject)
        assertEquals(EMAIL, payload[JwtService.CLAIM_EMAIL])
        assertEquals(NAME, payload[JwtService.CLAIM_NAME])
        assertEquals(true, payload[JwtService.CLAIM_EMAIL_VERIFIED])

        //verify
        verify(exactly = 2) { cryptService.randomUUID() }
        verify(exactly = 2) { configurationProperties.jwt.secret }
    }

    @Nested
    inner class IsValid {
        @Test
        fun isValidTrue() {
            //setup - mock
            every { claims.issuer } returns JwtService.ISSUER
            every { claims.id } returns "Not null"
            val dateThreeMonthsAgo = Calendar.getInstance().apply {
                time = Date()
                add(Calendar.MONTH, -3)
            }.time
            every { claims.issuedAt } returns dateThreeMonthsAgo
            every { claims.subject } returns "Not null"
            every { claims[JwtService.CLAIM_EMAIL] } returns "Not null"
            //execute
            assertTrue(jwtService.isValid(claims))

            //verify
            verify(exactly = 1) { claims.issuer }
            verify(exactly = 1) { claims.id }
            verify(exactly = 1) { claims.issuedAt }
            verify(exactly = 1) { claims.subject }
            verify(exactly = 1) { claims[JwtService.CLAIM_EMAIL] }
        }

        @ParameterizedTest
        @MethodSource("com.partytime.service.JwtServiceUnitTest#isValidFalseArgumentProvider")
        fun isValidFalse(issuer: String, id: String?, issuedAt: Date, subject: String?, email: String?) {
            //setup - mock
            every { claims.issuer } returns issuer
            every { claims.id } returns id
            every { claims.issuedAt } returns issuedAt
            every { claims.subject } returns subject
            every { claims[JwtService.CLAIM_EMAIL] } returns email

            //execute
            assertFalse(jwtService.isValid(claims))

            //verify
            verify(atLeast = 0, atMost = 1) { claims.issuer }
            verify(atLeast = 0, atMost = 1) { claims.id }
            verify(atLeast = 0, atMost = 1) { claims.issuedAt }
            verify(atLeast = 0, atMost = 1) { claims.subject }
            verify(atLeast = 0, atMost = 1) { claims[JwtService.CLAIM_EMAIL] }
        }
    }


    @Test
    fun getEmail() {
        //setup - mock
        every { claims.get(JwtService.CLAIM_EMAIL, String::class.java) } returns EMAIL

        //execute
        val email = jwtService.getEmail(claims)
        assertEquals(EMAIL, email)

        //verify
        verify(exactly = 1) { claims.get(JwtService.CLAIM_EMAIL, String::class.java) }
    }
}
