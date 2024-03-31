package com.partytime.service

import com.partytime.api.dto.account.AccountRegisterDTO
import com.partytime.api.dto.changepassword.ChangePasswordDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.ApiErrorException
import com.partytime.api.error.asException
import com.partytime.assertApiErrorExceptionEquals
import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.configuration.security.PartyTimeUserDetails
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

private const val url = "http://localhost:8090"
private const val eMail = "example@example.com"
private const val name = "Example Example"
private const val password = "Abc!def5ghi"

class AccountServiceTest : UnitTest() {
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
    private val encodedPassword = testPasswordEncoder.encode(password)
    private val verificationCode = UUID.randomUUID()

    @Nested
    inner class RegisterAccountTests {
        private val accountRegisterDTO = AccountRegisterDTO(
            name,
            eMail,
            password
        )

        private val existingAccount = Account(
            eMail,
            false,
            name,
            encodedPassword,
            emailVerificationCode = verificationCode.toString()
        )

        @Test
        fun registerAccountSuccess() {
            //setup - mock
            every { accountRepository.findAccountByEmail(eMail) } returns Optional.empty()
            every { cryptService.encodePassword(password) } returns encodedPassword
            every { cryptService.randomUUID() } returns verificationCode
            every { accountRepository.save(any()) } answers {
                firstArg<Account>().also {
                    if (it.id == null) it.id = 0L
                }
            }
            every { configurationProperties.url } returns url
            justRun { applicationEventPublisher.publishEvent(any()) }

            //execute
            val savedAccount = accountService.registerAccount(accountRegisterDTO)
            assertEquals(eMail, savedAccount.email)
            assertFalse(savedAccount.emailVerified)
            assertEquals(name, savedAccount.name)
            assertEquals(encodedPassword, savedAccount.pwHash)
            assertEquals(0, savedAccount.id)
            assertEquals(verificationCode.toString(), savedAccount.emailVerificationCode)

            //validate
            verify(exactly = 1) { accountRepository.findAccountByEmail(eMail) }
            verify(exactly = 1) { cryptService.encodePassword(password) }
            verify(exactly = 1) { cryptService.randomUUID() }
            verify(exactly = 1) {
                accountRepository.save(withArg {
                    assertEquals(eMail, it.email)
                    assertEquals(name, it.name)
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
                    assertEquals(url, verifyAccountData.homepage)
                    assertEquals(savedAccount.name, verifyAccountData.name)
                    assertEquals(
                        "$url/auth/verify/${savedAccount.emailVerificationCode}",
                        verifyAccountData.verificationLink
                    )
                })
            }
        }

        @Test
        fun registerAccountAlreadyExists() {
            //setup - mock
            every { accountService.optAccountByMail(eMail) } returns Optional.of(existingAccount)

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                accountService.registerAccount(accountRegisterDTO)
            }

            val expectedException =
                ApiError.badRequest("Ein Account mit dieser E-Mail existiert bereits!").asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { accountService.optAccountByMail(eMail) }
        }
    }

    @Test
    fun saveAccountSuccess() {
        //setup - data
        val account = Account(
            eMail,
            true,
            name,
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
        assertEquals(eMail, savedAccount.email)
        assertTrue(savedAccount.emailVerified)
        assertEquals(name, savedAccount.name)
        assertEquals(encodedPassword, savedAccount.pwHash)
        assertEquals(0, savedAccount.id)
        assertNull(savedAccount.emailVerificationCode)

        //verify
        verify(exactly = 1) {
            accountRepository.save(withArg {
                assertEquals(eMail, it.email)
                assertEquals(name, it.name)
                assertEquals(encodedPassword, it.pwHash)
                assertTrue(it.emailVerified)
            })
        }
    }

    @Nested
    inner class DeleteAccountTests {
        private val account = Account(
            eMail,
            false,
            name,
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
    inner class ChangePasswordTests {
        private val savedAccount = Account(
            eMail,
            true,
            name,
            encodedPassword
        ).also {
            it.id = 0L
        }

        private val newPassword = "Jkl?mno2pqr"
        private val newEncodedPassword = testPasswordEncoder.encode(newPassword)

        private val validChangePasswordDTO = ChangePasswordDTO(
            password,
            newPassword
        )

        private val wrongPassword = "wrong!Password5unauthorized"

        val invalidChangePasswordDTO = ChangePasswordDTO(
            wrongPassword,
            newPassword
        )

        private val partyTimeUserDetails = PartyTimeUserDetails(savedAccount)
        private val authentication = AuthenticationToken(partyTimeUserDetails)

        @Test
        fun changePasswordSuccess() {
            //setup - mock
            every { accountRepository.findAccountByEmail(eMail) } returns Optional.of(savedAccount)
            every { cryptService.passwordMatchesHash(password, encodedPassword) } returns true
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
            verify(exactly = 1) { accountRepository.findAccountByEmail(eMail) }
            verify(exactly = 1) { cryptService.passwordMatchesHash(password, encodedPassword) }
            verify(exactly = 1) { cryptService.encodePassword(newPassword) }
            verify(exactly = 1) {
                accountRepository.save(withArg {
                    assertEquals(eMail, it.email)
                    assertEquals(name, it.name)
                    assertEquals(newEncodedPassword, it.pwHash)
                    assertTrue(it.emailVerified)
                    assertEquals(0, it.id)
                })
            }
        }

        @Test
        fun changePasswordUnauthorized() {
            //setup - mock
            every { accountRepository.findAccountByEmail(authentication.principal) } returns Optional.of(savedAccount)
            every { cryptService.passwordMatchesHash(wrongPassword, encodedPassword) } returns false

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                accountService.changePassword(invalidChangePasswordDTO, authentication)
            }
            val expectedException = ApiError.unauthorized().asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //validate
            verify(exactly = 1) { accountRepository.findAccountByEmail(authentication.principal) }
            verify(exactly = 1) { cryptService.passwordMatchesHash(wrongPassword, encodedPassword) }
        }
    }

    @Nested
    inner class GetAccountByMailTests {
        private val account = Account(
            eMail,
            true,
            name,
            encodedPassword
        ).also {
            it.id = 0L
        }

        @Test
        fun getAccountByMailSuccess() {
            //setup - mock
            every { accountRepository.findAccountByEmail(eMail) } returns Optional.of(account)

            //execute
            val receivedAccount = accountService.getAccountByMail(eMail)
            assertEquals(account, receivedAccount)

            //validate
            verify(exactly = 1) { accountRepository.findAccountByEmail(eMail) }
        }

        @Test
        fun getAccountByMailNotFound() {
            every { accountRepository.findAccountByEmail(eMail) } returns Optional.empty()

            val thrownException = assertThrows<ApiErrorException> {
                accountService.getAccountByMail(eMail)
            }

            val expectedException =
                ApiError.notFound("Es kann kein Account mit dieser E-Mail gefunden werden.").asException()

            assertApiErrorExceptionEquals(expectedException, thrownException)

            verify(exactly = 1) { accountRepository.findAccountByEmail(eMail) }
        }
    }

    @Nested
    inner class OptAccountByMailTests {
        private val account = Account(
            eMail,
            true,
            name,
            encodedPassword
        ).also {
            it.id = 0L
        }

        @Test
        fun optAccountByMailSuccess() {
            //setup - mock
            every { accountRepository.findAccountByEmail(eMail) } returns Optional.of(account)

            //execute
            val receivedAccount = accountService.optAccountByMail(eMail)
            assertEquals(account, receivedAccount.get())

            //validate
            verify(exactly = 1) { accountRepository.findAccountByEmail(eMail) }
        }

        @Test
        fun optAccountByMailNotFound() {
            every { accountRepository.findAccountByEmail(eMail) } returns Optional.empty()
            val receivedAccount = accountService.optAccountByMail(eMail)

            assertTrue(receivedAccount.isEmpty)

            verify(exactly = 1) { accountRepository.findAccountByEmail(eMail) }
        }
    }
}
