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
import org.junit.jupiter.api.Assertions.assertNull
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

    @Nested
    inner class RegisterAccountTests: UnitTest() {
        private val accountRegisterDTO = AccountRegisterDTO(
            NAME,
            EMAIL,
            PASSWORD
        )

        private val existingAccount = Account(
            EMAIL,
            false,
            NAME,
            encodedPassword,
            emailVerificationCode = verificationCode.toString()
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
            every { accountService.optAccountByMail(EMAIL) } returns Optional.of(existingAccount)

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
        //setup - data
        val account = Account(
            EMAIL,
            true,
            NAME,
            encodedPassword
        )

        //setup - mock
        every { accountRepository.save(account) } answers {
            firstArg<Account>().also {
                if (it.id == null) it.id = 0L
            }
        }

        //execute
        val savedAccount = accountService.saveAccount(account)
        assertEquals(EMAIL, savedAccount.email)
        assertTrue(savedAccount.emailVerified)
        assertEquals(NAME, savedAccount.name)
        assertEquals(encodedPassword, savedAccount.pwHash)
        assertEquals(0, savedAccount.id)
        assertNull(savedAccount.emailVerificationCode)

        //verify
        verify(exactly = 1) {
            accountRepository.save(withArg {
                assertEquals(EMAIL, it.email)
                assertEquals(NAME, it.name)
                assertEquals(encodedPassword, it.pwHash)
                assertTrue(it.emailVerified)
            })
        }
    }

    @Nested
    inner class DeleteAccountTests: UnitTest() {
        private val account = Account(
            EMAIL,
            false,
            NAME,
            encodedPassword
        ).also {
            it.id = 0L
        }

        @Test
        fun deleteAccountSuccess() {
            //setup - mock
            justRun { accountRepository.delete(account) }

            //execute
            assertDoesNotThrow {
                accountService.deleteAccount(account)
            }

            //verify
            verify(exactly = 1) { accountRepository.delete(account) }
        }

        @Test
        fun deleteAccountNotFound() {
            //setup - mock
            every { accountRepository.delete(account) } throws OptimisticLockingFailureException("")

            //execute
            assertThrows<OptimisticLockingFailureException> {
                accountService.deleteAccount(account)
            }

            //verify
            verify(exactly = 1) { accountRepository.delete(account) }
        }
    }

    @Nested
    inner class ChangePasswordTests: UnitTest() {
        private val savedAccount = Account(
            EMAIL,
            true,
            NAME,
            encodedPassword
        ).also {
            it.id = 0L
        }

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
            every { accountRepository.findAccountByEmail(EMAIL) } returns Optional.of(savedAccount)
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
            every { accountRepository.findAccountByEmail(EMAIL) } returns Optional.of(savedAccount)
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
        private val account = Account(
            EMAIL,
            true,
            NAME,
            encodedPassword
        ).also {
            it.id = 0L
        }

        @Test
        fun getAccountByMailSuccess() {
            //setup - mock
            every { accountRepository.findAccountByEmail(EMAIL) } returns Optional.of(account)

            //execute
            val receivedAccount = accountService.getAccountByMail(EMAIL)
            assertEquals(account, receivedAccount)

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
        private val account = Account(
            EMAIL,
            true,
            NAME,
            encodedPassword
        ).also {
            it.id = 0L
        }

        @Test
        fun optAccountByMailSuccess() {
            //setup - mock
            every { accountRepository.findAccountByEmail(EMAIL) } returns Optional.of(account)

            //execute
            val receivedAccount = accountService.optAccountByMail(EMAIL)
            assertEquals(account, receivedAccount.get())

            //validate
            verify(exactly = 1) { accountRepository.findAccountByEmail(EMAIL) }
        }

        @Test
        fun optAccountByMailNotFound() {
            every { accountRepository.findAccountByEmail(EMAIL) } returns Optional.empty()
            val receivedAccount = accountService.optAccountByMail(EMAIL)

            assertTrue(receivedAccount.isEmpty)

            verify(exactly = 1) { accountRepository.findAccountByEmail(EMAIL) }
        }
    }
}
