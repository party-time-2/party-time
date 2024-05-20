package com.partytime.service

import com.partytime.testAbstraction.UnitTest
import com.partytime.testUtility.generateParticipantAccount
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import org.springframework.security.crypto.password.PasswordEncoder

class CryptServiceTest : UnitTest() {
    private val passwordEncoder = mockk<PasswordEncoder>()
    private val cryptService = CryptService(passwordEncoder)

    private val accountData = generateParticipantAccount(
        verified = true,
        withVerificationCode = true
    )
    private val account = accountData.account

    @Test
    fun encodePassword() {
        //setup - mock
        every { passwordEncoder.encode(accountData.additionalAccountTestInformation.passwordPlainText) } returns account.pwHash

        //execute
        val result = cryptService.encodePassword(accountData.additionalAccountTestInformation.passwordPlainText)
        assertEquals(account.pwHash, result)

        //verify
        verify(exactly = 1) { passwordEncoder.encode(accountData.additionalAccountTestInformation.passwordPlainText) }
    }

    @Nested
    inner class PasswordMatchesHash : UnitTest() {
        @Test
        fun passwordMatchesHashTrue() {
            //setup - mock
            every {
                passwordEncoder.matches(
                    accountData.additionalAccountTestInformation.passwordPlainText,
                    account.pwHash
                )
            } returns true

            //execute
            assertTrue(
                cryptService.passwordMatchesHash(
                    accountData.additionalAccountTestInformation.passwordPlainText,
                    account.pwHash
                )
            )

            //verify
            verify(exactly = 1) {
                passwordEncoder.matches(
                    accountData.additionalAccountTestInformation.passwordPlainText,
                    account.pwHash
                )
            }
        }

        @Test
        fun passwordMatchesHashFalse() {
            //setup - mock
            every {
                passwordEncoder.matches(
                    accountData.additionalAccountTestInformation.passwordPlainText,
                    account.pwHash
                )
            } returns false

            //execute
            assertFalse(
                cryptService.passwordMatchesHash(
                    accountData.additionalAccountTestInformation.passwordPlainText,
                    account.pwHash
                )
            )

            //verify
            verify(exactly = 1) {
                passwordEncoder.matches(
                    accountData.additionalAccountTestInformation.passwordPlainText,
                    account.pwHash
                )
            }
        }
    }


    @Test
    fun randomUUID() {
        assertDoesNotThrow {
            cryptService.randomUUID()
        }
    }
}
