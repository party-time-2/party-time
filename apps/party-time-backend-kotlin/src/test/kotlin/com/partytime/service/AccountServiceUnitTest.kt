package com.partytime.service

import com.partytime.EMAIL
import com.partytime.NAME
import com.partytime.PASSWORD
import com.partytime.URL
import com.partytime.api.dto.account.AccountRegisterDTO
import com.partytime.api.dto.changepassword.ChangePasswordDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.ApiErrorException
import com.partytime.api.error.asException
import com.partytime.assertApiErrorExceptionEquals
import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.jpa.entity.Account
import com.partytime.jpa.repository.AccountRepository
import com.partytime.mail.model.MailEvent
import com.partytime.mail.model.VerifyAccountData
import com.partytime.testAbstraction.UnitTest
import io.mockk.every
import io.mockk.justRun
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertDoesNotThrow
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.context.ApplicationEventPublisher
import org.springframework.dao.OptimisticLockingFailureException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.util.Optional
import java.util.UUID

class AccountServiceUnitTest : UnitTest() {
    private val accountRepository = mockk<AccountRepository>()
    private val cryptService = mockk<CryptService>()
    private val configurationProperties = mockk<PartyTimeConfigurationProperties>()
    private val applicationEventPublisher = mockk<ApplicationEventPublisher>()

    private val accountService = AccountService(
        accountRepository,
        cryptService,
        configurationProperties,
        applicationEventPublisher
    )

    private val testPasswordEncoder = BCryptPasswordEncoder()
    private val encodedPassword = testPasswordEncoder.encode(PASSWORD)
    private val verificationCode = UUID.randomUUID()

    private val unverifiedAccount = Account(
        EMAIL,
        false,
        NAME,
        encodedPassword,
        emailVerificationCode = verificationCode.toString()
    )

    private val verifiedAccount = Account(
        EMAIL,
        true,
        NAME,
        encodedPassword
    ).also {
        it.id = 0L
    }

    @Nested
    inner class RegisterAccountTests: UnitTest() {
        private val accountRegisterDTO = AccountRegisterDTO(
            NAME,
            EMAIL,
            PASSWORD
        )

        @Test
        fun registerAccountSuccess() {
            //setup - mock
            every { accountRepository.findAccountByEmail(EMAIL) } returns Optional.empty()
            every { cryptService.encodePassword(PASSWORD) } returns encodedPassword
            every { cryptService.randomUUID() } returns verificationCode
            every { accountRepository.save(any()) } answers {
                firstArg<Account>().also {
                    if (it.id == null) it.id = 0L
                }
            }
            every { configurationProperties.url } returns URL
            justRun { applicationEventPublisher.publishEvent(any()) }

            //execute
            val savedAccount = accountService.registerAccount(accountRegisterDTO)
            assertEquals(EMAIL, savedAccount.email)
            assertFalse(savedAccount.emailVerified)
            assertEquals(NAME, savedAccount.name)
            assertEquals(encodedPassword, savedAccount.pwHash)
            assertEquals(0, savedAccount.id)
            assertEquals(verificationCode.toString(), savedAccount.emailVerificationCode)

            //validate
            verify(exactly = 1) { accountRepository.findAccountByEmail(EMAIL) }
            verify(exactly = 1) { cryptService.encodePassword(PASSWORD) }
            verify(exactly = 1) { cryptService.randomUUID() }
            verify(exactly = 1) {
                accountRepository.save(withArg {
                    assertEquals(EMAIL, it.email)
                    assertEquals(NAME, it.name)
                    assertEquals(encodedPassword, it.pwHash)
                    assertFalse(it.emailVerified)
                    assertEquals(verificationCode.toString(), it.emailVerificationCode)
                })
            }
            verify(exactly = 2) { configurationProperties.url } //used twice for MailEvent construction
            verify(exactly = 1) {
                applicationEventPublisher.publishEvent(withArg {
                    val mailEvent = it as MailEvent
                    assertEquals(savedAccount.email, mailEvent.recipientEmail)
                    assertEquals("Verifiziere deinen Account!", mailEvent.subject)

                    val verifyAccountData = mailEvent.data as VerifyAccountData
                    assertEquals(URL, verifyAccountData.homepage)
                    assertEquals(savedAccount.name, verifyAccountData.name)
                    assertEquals(
                        "$URL/auth/verify/?token=${savedAccount.emailVerificationCode}",
                        verifyAccountData.verificationLink
                    )
                })
            }
        }

        @Test
        fun registerAccountAlreadyExists() {
            //setup - mock
            every { accountService.optAccountByMail(EMAIL) } returns Optional.of(unverifiedAccount)

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                accountService.registerAccount(accountRegisterDTO)
            }

            val expectedException =
                ApiError.badRequest("Ein Account mit dieser E-Mail existiert bereits!").asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { accountService.optAccountByMail(EMAIL) }
        }
    }

    @Test
    fun saveAccountSuccess() {
        //setup - mock
        every { accountRepository.save(unverifiedAccount) } answers {
            firstArg<Account>().also {
                if (it.id == null) it.id = 0L
            }
        }

        //execute
        val savedAccount = accountService.saveAccount(unverifiedAccount)
        assertEquals(EMAIL, savedAccount.email)
        assertFalse(savedAccount.emailVerified)
        assertEquals(NAME, savedAccount.name)
        assertEquals(encodedPassword, savedAccount.pwHash)
        assertEquals(0, savedAccount.id)
        assertNotNull(savedAccount.emailVerificationCode)

        //verify
        verify(exactly = 1) { accountRepository.save(unverifiedAccount) }
    }

    @Nested
    inner class DeleteAccountTests: UnitTest() {
        @Test
        fun deleteAccountSuccess() {
            //setup - mock
            justRun { accountRepository.delete(verifiedAccount) }

            //execute
            assertDoesNotThrow {
                accountService.deleteAccount(verifiedAccount)
            }

            //verify
            verify(exactly = 1) { accountRepository.delete(verifiedAccount) }
        }

        @Test
        fun deleteAccountNotFound() {
            //setup - mock
            every { accountRepository.delete(verifiedAccount) } throws OptimisticLockingFailureException("")

            //execute
            assertThrows<OptimisticLockingFailureException> {
                accountService.deleteAccount(verifiedAccount)
            }

            //verify
            verify(exactly = 1) { accountRepository.delete(verifiedAccount) }
        }
    }

    @Nested
    inner class ChangePasswordTests: UnitTest() {
        private val newPassword = "Jkl?mno2pqr"
        private val newEncodedPassword = testPasswordEncoder.encode(newPassword)

        private val validChangePasswordDTO = ChangePasswordDTO(
            PASSWORD,
            newPassword
        )

        private val wrongPassword = "wrong!Password5unauthorized"

        private val invalidChangePasswordDTO = ChangePasswordDTO(
            wrongPassword,
            newPassword
        )

        private val authentication = mockk<AuthenticationToken>()

        @Test
        fun changePasswordSuccess() {
            //setup - mock
            every { authentication.principal } returns EMAIL
            every { accountRepository.findAccountByEmail(EMAIL) } returns Optional.of(verifiedAccount)
            every { cryptService.passwordMatchesHash(PASSWORD, encodedPassword) } returns true
            every { cryptService.encodePassword(newPassword) } returns newEncodedPassword
            every { accountRepository.save(any()) } answers {
                firstArg<Account>().also {
                    if (it.id == null) it.id = 0L
                }
            }
            //execute
            assertDoesNotThrow {
                accountService.changePassword(validChangePasswordDTO, authentication)
            }

            //validate
            verify(exactly = 1) { authentication.principal }
            verify(exactly = 1) { accountRepository.findAccountByEmail(EMAIL) }
            verify(exactly = 1) { cryptService.passwordMatchesHash(PASSWORD, encodedPassword) }
            verify(exactly = 1) { cryptService.encodePassword(newPassword) }
            verify(exactly = 1) {
                accountRepository.save(withArg {
                    assertEquals(EMAIL, it.email)
                    assertEquals(NAME, it.name)
                    assertEquals(newEncodedPassword, it.pwHash)
                    assertTrue(it.emailVerified)
                    assertEquals(0, it.id)
                })
            }
        }

        @Test
        fun changePasswordUnauthorized() {
            //setup - mock
            every { authentication.principal } returns EMAIL
            every { accountRepository.findAccountByEmail(EMAIL) } returns Optional.of(verifiedAccount)
            every { cryptService.passwordMatchesHash(wrongPassword, encodedPassword) } returns false

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                accountService.changePassword(invalidChangePasswordDTO, authentication)
            }
            val expectedException = ApiError.unauthorized("Das alte Passwort ist falsch. Bitte versuche es erneut.").asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //validate
            verify(exactly = 1) { authentication.principal }
            verify(exactly = 1) { accountRepository.findAccountByEmail(EMAIL) }
            verify(exactly = 1) { cryptService.passwordMatchesHash(wrongPassword, encodedPassword) }
        }
    }

    @Nested
    inner class GetAccountByMailTests: UnitTest() {
        @Test
        fun getAccountByMailSuccess() {
            //setup - mock
            every { accountRepository.findAccountByEmail(EMAIL) } returns Optional.of(verifiedAccount)

            //execute
            val receivedAccount = accountService.getAccountByMail(EMAIL)
            assertEquals(verifiedAccount, receivedAccount)

            //validate
            verify(exactly = 1) { accountRepository.findAccountByEmail(EMAIL) }
        }

        @Test
        fun getAccountByMailNotFound() {
            every { accountRepository.findAccountByEmail(EMAIL) } returns Optional.empty()

            val thrownException = assertThrows<ApiErrorException> {
                accountService.getAccountByMail(EMAIL)
            }

            val expectedException =
                ApiError.notFound("Es kann kein Account mit dieser E-Mail gefunden werden.").asException()

            assertApiErrorExceptionEquals(expectedException, thrownException)

            verify(exactly = 1) { accountRepository.findAccountByEmail(EMAIL) }
        }
    }

    @Nested
    inner class OptAccountByMailTests: UnitTest() {
        @Test
        fun optAccountByMailSuccess() {
            //setup - mock
            every { accountRepository.findAccountByEmail(EMAIL) } returns Optional.of(verifiedAccount)

            //execute
            val receivedAccount = accountService.optAccountByMail(EMAIL)
            assertEquals(verifiedAccount, receivedAccount.get())

            //validate
            verify(exactly = 1) { accountRepository.findAccountByEmail(EMAIL) }
        }

        @Test
        fun optAccountByMailNotFound() {
            //setup - mock
            every { accountRepository.findAccountByEmail(EMAIL) } returns Optional.empty()

            //execute
            val receivedAccount = accountService.optAccountByMail(EMAIL)
            assertTrue(receivedAccount.isEmpty)

            //validate
            verify(exactly = 1) { accountRepository.findAccountByEmail(EMAIL) }
        }
    }

    @Nested
    inner class AccountByEmailVerificationCode {

        @Test
        fun accountByEmailVerificationCodeNotEmpty() {
            //setup - mock
            every { accountRepository.findByEmailVerificationCode(verificationCode.toString()) } returns Optional.of(unverifiedAccount)

            //execute
            val receivedAccount = accountService.accountByEmailVerificationCode(verificationCode.toString())
            assertEquals(unverifiedAccount, receivedAccount.get())

            //validate
            verify(exactly = 1) { accountRepository.findByEmailVerificationCode(verificationCode.toString()) }
        }

        @Test
        fun accountByEmailVerificationCodeEmpty() {
            //setup - mock
            every { accountRepository.findByEmailVerificationCode(verificationCode.toString()) } returns Optional.empty()

            //execute
            val receivedAccount = accountService.accountByEmailVerificationCode(verificationCode.toString())
            assertTrue(receivedAccount.isEmpty)

            //validate
            verify(exactly = 1) { accountRepository.findByEmailVerificationCode(verificationCode.toString()) }
        }
    }
}
