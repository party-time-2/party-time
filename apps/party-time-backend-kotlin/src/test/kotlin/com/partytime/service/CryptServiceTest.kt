package com.partytime.service

import com.partytime.PASSWORD
import com.partytime.testAbstraction.UnitTest
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.security.crypto.password.PasswordEncoder

class CryptServiceTest : UnitTest() {
    private val passwordEncoder = mockk<PasswordEncoder>()
    private val cryptService = CryptService(passwordEncoder)

    private val encodedPassword = "\$2a\$04\$huclRuFe8Is4.Go4utHYWesrt.CL/glaWOM9f9mRt.tKkh4V07Io6"

    @Test
    fun encodePassword() {
        //setup - mock
        every { passwordEncoder.encode(PASSWORD) } returns encodedPassword

        //execute
        val result = cryptService.encodePassword(PASSWORD)
        assertEquals(result, encodedPassword)

        //verify
        verify(exactly = 1) { passwordEncoder.encode(PASSWORD) }
    }

    @Nested
    inner class PasswordMatchesHash {
        @Test
        fun passwordMatchesHashTrue() {
            //setup - mock
            every { passwordEncoder.matches(PASSWORD, encodedPassword) } returns true

            //execute
            assertTrue(cryptService.passwordMatchesHash(PASSWORD, encodedPassword))

            //verify
            verify(exactly = 1) { passwordEncoder.matches(PASSWORD, encodedPassword) }
        }

        @Test
        fun passwordMatchesHashFalse() {
            //setup - mock
            every { passwordEncoder.matches(PASSWORD, encodedPassword) } returns false

            //execute
            assertFalse(cryptService.passwordMatchesHash(PASSWORD, encodedPassword))

            //verify
            verify(exactly = 1) { passwordEncoder.matches(PASSWORD, encodedPassword) }
        }
    }


    @Test
    fun randomUUID() {
        cryptService.randomUUID()
    }
}
