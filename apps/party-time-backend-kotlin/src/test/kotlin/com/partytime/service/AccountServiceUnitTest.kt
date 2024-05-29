package com.partytime.service

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
import com.partytime.testUtility.generateParticipantAccount
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
import java.util.Optional

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

    private val unverifiedAccountData = generateParticipantAccount(
        verified = false,
        withVerificationCode = true
    )
    private val unverifiedAccount = unverifiedAccountData.account

    private val verifiedAccountData = generateParticipantAccount(
        verified = true,
        withVerificationCode = false
    )
    private val verifiedAccount = verifiedAccountData.account

    @Nested
    inner class RegisterAccountTests: UnitTest() {
        private val accountRegisterDTO = AccountRegisterDTO(
            unverifiedAccount.name,
            unverifiedAccount.email,
            unverifiedAccountData.additionalAccountTestInformation.passwordPlainText
        )

        @Test
        fun registerAccountSuccess() {
            //setup - mock
            every { accountRepository.findAccountByEmail(accountRegisterDTO.email) } returns Optional.empty()
            every { cryptService.encodePassword(unverifiedAccountData.additionalAccountTestInformation.passwordPlainText) } returns unverifiedAccount.pwHash
            every { cryptService.randomUUID() } returns unverifiedAccountData.additionalAccountTestInformation.randomUUID!!
            every { accountRepository.save(any()) } answers {
                firstArg<Account>().also {
                    if (it.id == null) it.id = 0L
                }
            }
            every { configurationProperties.url } returns URL
            justRun { applicationEventPublisher.publishEvent(any()) }

            //execute
            val savedAccount = accountService.registerAccount(accountRegisterDTO)
            assertEquals(unverifiedAccount.email, savedAccount.email)
            assertFalse(savedAccount.emailVerified)
            assertEquals(unverifiedAccount.name, savedAccount.name)
            assertEquals(unverifiedAccount.pwHash, savedAccount.pwHash)
            assertEquals(0, savedAccount.id)
            assertEquals(unverifiedAccount.emailVerificationCode, savedAccount.emailVerificationCode)

            //validate
            verify(exactly = 1) { accountRepository.findAccountByEmail(accountRegisterDTO.email) }
            verify(exactly = 1) { cryptService.encodePassword(unverifiedAccountData.additionalAccountTestInformation.passwordPlainText) }
            verify(exactly = 1) { cryptService.randomUUID() }
            verify(exactly = 1) {
                accountRepository.save(withArg {
                    assertEquals(unverifiedAccount.email, it.email)
                    assertEquals(unverifiedAccount.name, it.name)
                    assertEquals(unverifiedAccount.pwHash, it.pwHash)
                    assertFalse(it.emailVerified)
                    assertEquals(unverifiedAccount.emailVerificationCode, it.emailVerificationCode)
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
            every { accountRepository.findAccountByEmail(unverifiedAccount.email) } returns Optional.of(unverifiedAccount)

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                accountService.registerAccount(accountRegisterDTO)
            }

            val expectedException =
                ApiError.badRequest("Ein Account mit dieser E-Mail existiert bereits!").asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //verify
            verify(exactly = 1) { accountRepository.findAccountByEmail(unverifiedAccount.email) }
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
        assertEquals(unverifiedAccount.email, savedAccount.email)
        assertFalse(savedAccount.emailVerified)
        assertEquals(unverifiedAccount.name, savedAccount.name)
        assertEquals(unverifiedAccount.pwHash, savedAccount.pwHash)
        assertEquals(unverifiedAccount.id!!, savedAccount.id)
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
        private val newEncodedPassword = verifiedAccountData.additionalAccountTestInformation
            .passwordEncoder.encode(newPassword)

        private val validChangePasswordDTO = ChangePasswordDTO(
            verifiedAccountData.additionalAccountTestInformation.passwordPlainText,
            newPassword
        )

        private val wrongPassword = "wrong!Password5unauthorized"

        private val invalidChangePasswordDTO = ChangePasswordDTO(
            wrongPassword,
            newPassword
        )

        val oldPwHash = verifiedAccount.pwHash

        private val authentication = mockk<AuthenticationToken>()

        @Test
        fun changePasswordSuccess() {
            //setup - mock
            every { authentication.principal } returns verifiedAccount.email
            every { accountRepository.findAccountByEmail(verifiedAccount.email) } returns Optional.of(verifiedAccount)
            every {
                cryptService.passwordMatchesHash(
                    verifiedAccountData.additionalAccountTestInformation.passwordPlainText,
                    oldPwHash
                )
            } returns true
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
            verify(exactly = 1) { accountRepository.findAccountByEmail(verifiedAccount.email) }
            verify(exactly = 1) {
                cryptService.passwordMatchesHash(
                    verifiedAccountData.additionalAccountTestInformation.passwordPlainText,
                    oldPwHash
                )
            }
            verify(exactly = 1) { cryptService.encodePassword(newPassword) }
            verify(exactly = 1) {
                accountRepository.save(withArg {
                    assertEquals(verifiedAccount.email, it.email)
                    assertEquals(verifiedAccount.name, it.name)
                    assertEquals(newEncodedPassword, it.pwHash)
                    assertTrue(it.emailVerified)
                    assertEquals(verifiedAccount.id!!, it.id)
                })
            }
        }

        @Test
        fun changePasswordUnauthorized() {
            //setup - mock
            every { authentication.principal } returns verifiedAccount.email
            every { accountRepository.findAccountByEmail(verifiedAccount.email) } returns Optional.of(verifiedAccount)
            every {
                cryptService.passwordMatchesHash(
                    wrongPassword,
                    oldPwHash
                )
            } returns false

            //execute
            val thrownException = assertThrows<ApiErrorException> {
                accountService.changePassword(invalidChangePasswordDTO, authentication)
            }
            val expectedException = ApiError.unauthorized("Das alte Passwort ist falsch. Bitte versuche es erneut.").asException()
            assertApiErrorExceptionEquals(expectedException, thrownException)

            //validate
            verify(exactly = 1) { authentication.principal }
            verify(exactly = 1) { accountRepository.findAccountByEmail(verifiedAccount.email) }
            verify(exactly = 1) {
                cryptService.passwordMatchesHash(
                    wrongPassword,
                    oldPwHash
                )
            }
        }
    }

    @Nested
    inner class GetAccountByMailTests: UnitTest() {
        @Test
        fun getAccountByMailSuccess() {
            //setup - mock
            every { accountRepository.findAccountByEmail(verifiedAccount.email) } returns Optional.of(verifiedAccount)

            //execute
            val receivedAccount = accountService.getAccountByMail(verifiedAccount.email)
            assertEquals(verifiedAccount, receivedAccount)

            //validate
            verify(exactly = 1) { accountRepository.findAccountByEmail(verifiedAccount.email) }
        }

        @Test
        fun getAccountByMailNotFound() {
            every { accountRepository.findAccountByEmail(verifiedAccount.email) } returns Optional.empty()

            val thrownException = assertThrows<ApiErrorException> {
                accountService.getAccountByMail(verifiedAccount.email)
            }

            val expectedException =
                ApiError.notFound("Es kann kein Account mit dieser E-Mail gefunden werden.").asException()

            assertApiErrorExceptionEquals(expectedException, thrownException)

            verify(exactly = 1) { accountRepository.findAccountByEmail(verifiedAccount.email) }
        }
    }

    @Nested
    inner class OptAccountByMailTests: UnitTest() {
        @Test
        fun optAccountByMailSuccess() {
            //setup - mock
            every { accountRepository.findAccountByEmail(verifiedAccount.email) } returns Optional.of(verifiedAccount)

            //execute
            val receivedAccount = accountService.optAccountByMail(verifiedAccount.email)
            assertEquals(verifiedAccount, receivedAccount.get())

            //validate
            verify(exactly = 1) { accountRepository.findAccountByEmail(verifiedAccount.email) }
        }

        @Test
        fun optAccountByMailNotFound() {
            //setup - mock
            every { accountRepository.findAccountByEmail(verifiedAccount.email) } returns Optional.empty()

            //execute
            val receivedAccount = accountService.optAccountByMail(verifiedAccount.email)
            assertTrue(receivedAccount.isEmpty)

            //validate
            verify(exactly = 1) { accountRepository.findAccountByEmail(verifiedAccount.email) }
        }
    }

    @Nested
    inner class AccountByEmailVerificationCode {

        @Test
        fun accountByEmailVerificationCodeNotEmpty() {
            //setup - mock
            every { accountRepository.findByEmailVerificationCode(unverifiedAccount.emailVerificationCode!!) } returns Optional.of(unverifiedAccount)

            //execute
            val receivedAccount = accountService.accountByEmailVerificationCode(unverifiedAccount.emailVerificationCode!!)
            assertEquals(unverifiedAccount, receivedAccount.get())

            //validate
            verify(exactly = 1) { accountRepository.findByEmailVerificationCode(unverifiedAccount.emailVerificationCode!!) }
        }

        @Test
        fun accountByEmailVerificationCodeEmpty() {
            //setup - mock
            every { accountRepository.findByEmailVerificationCode(unverifiedAccount.emailVerificationCode!!) } returns Optional.empty()

            //execute
            val receivedAccount = accountService.accountByEmailVerificationCode(unverifiedAccount.emailVerificationCode!!)
            assertTrue(receivedAccount.isEmpty)

            //validate
            verify(exactly = 1) { accountRepository.findByEmailVerificationCode(unverifiedAccount.emailVerificationCode!!) }
        }
    }
}
