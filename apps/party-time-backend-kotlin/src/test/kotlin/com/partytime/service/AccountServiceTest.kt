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
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.context.ApplicationEventPublisher
import org.springframework.dao.OptimisticLockingFailureException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.util.Optional
import java.util.UUID

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

    private val url = "http://localhost:8090"

    private val eMail = "example@example.com"
    private val name = "Example Example"
    private val password = "Abc!def5ghi"
    private val testPasswordEncoder = BCryptPasswordEncoder()
    private val encodedPassword = testPasswordEncoder.encode(password)
    private val testUUID = UUID.randomUUID()

    @Test
    fun registerAccountSuccess() {
        //setup - data
        val accountRegisterDTO = AccountRegisterDTO(
            "Example Example",
            "example@example.com",
            "Abc!def5ghi"
        )

        val accountSaved = Account(
            accountRegisterDTO.email,
            false,
            accountRegisterDTO.name,
            encodedPassword
        ).also {
            it.id = 0L
        }


        //setup - mock
        every { accountRepository.findAccountByEmail(accountRegisterDTO.email) } returns Optional.empty()
        every { cryptService.encodePassword(accountRegisterDTO.password) } returns encodedPassword
        every { cryptService.randomUUID() } returns testUUID
        every { accountRepository.save(any()) } returns accountSaved
        every { configurationProperties.url } returns url
        justRun { applicationEventPublisher.publishEvent(any()) }

        //execute
        val savedAccount = accountService.registerAccount(accountRegisterDTO)
        val expectedAccount = Account(
            accountRegisterDTO.email,
            false,
            accountRegisterDTO.name,
            testPasswordEncoder.encode(accountRegisterDTO.password)
        ).also {
            it.id = 0
            it.emailVerificationCode = testUUID.toString()
        }

        assertEquals(expectedAccount.email, savedAccount.email)

        //validate
        verify(exactly = 1) { accountRepository.findAccountByEmail(accountRegisterDTO.email) }
        verify(exactly = 1) { cryptService.encodePassword(accountRegisterDTO.password) }
        verify(exactly = 1) { cryptService.randomUUID() }
        verify(exactly = 1) {
            accountRepository.save(withArg {
                assertEquals(accountRegisterDTO.email, it.email)
                assertEquals(accountRegisterDTO.name, it.name)
                assertEquals(encodedPassword, it.pwHash)
                assertFalse(it.emailVerified)
                assertEquals(expectedAccount.emailVerificationCode, it.emailVerificationCode)
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
        //setup - data
        val accountRegisterDTO = AccountRegisterDTO(
            "Example Example",
            "example@example.com",
            "Abc!def5ghi"
        )

        val account = Account(
            accountRegisterDTO.email,
            false,
            accountRegisterDTO.name,
            testPasswordEncoder.encode(accountRegisterDTO.password),
            emailVerificationCode = UUID.randomUUID().toString()
        )

        //setup - mock
        every { accountService.optAccountByMail(accountRegisterDTO.email) } returns Optional.of(account)

        //execute
        val thrownException = assertThrows<ApiErrorException> {
            accountService.registerAccount(accountRegisterDTO)
        }

        val expectedException = ApiError.badRequest("Ein Account mit dieser E-Mail existiert bereits!").asException()
        assertApiErrorExceptionEquals(expectedException, thrownException)

        //verify
        verify(exactly = 1) { accountService.optAccountByMail(accountRegisterDTO.email) }
    }

    @Test
    fun saveAccountSuccess() {
        //setup - data
        val accountUnsaved = Account(
            eMail,
            false,
            name,
            encodedPassword
        )
        val accountSaved = Account(
            accountUnsaved.email,
            accountUnsaved.emailVerified,
            accountUnsaved.name,
            accountUnsaved.pwHash
        ).also {
            it.id = 0L
        }

        //setup - mock
        every { accountRepository.save(accountUnsaved) } returns accountSaved

        //execute
        val savedAccount = accountService.saveAccount(accountUnsaved)
        assertEquals(accountSaved, savedAccount)

        //verify
        verify(exactly = 1) { accountRepository.save(any()) }
    }

    @Test
    fun deleteAccountSuccess() {
        //setup - data
        val accountSaved = Account(
            eMail,
            false,
            name,
            encodedPassword
        ).also {
            it.id = 0L
        }

        //setup - mock
        justRun { accountRepository.delete(accountSaved) }

        assertDoesNotThrow {
            accountService.deleteAccount(accountSaved)
        }

        verify(exactly = 1) { accountRepository.delete(accountSaved) }
    }

    @Test
    fun deleteAccountNotFound() {
        //setup - data
        val notSaved = Account(
            eMail,
            false,
            name,
            encodedPassword
        )

        every { accountRepository.delete(notSaved) } throws OptimisticLockingFailureException("")

        assertThrows<OptimisticLockingFailureException> {
            accountService.deleteAccount(notSaved)
        }

        verify(exactly = 1) { accountRepository.delete(notSaved) }
    }

    @Test
    fun changePasswordSuccess() {
        //setup - data
        val accountSaved = Account(
            eMail,
            false,
            name,
            encodedPassword
        ).also {
            it.id = 0L
        }

        val changePasswordDTO = ChangePasswordDTO(
            password,
            "Jkl?mno2pqr"
        )

        val newEncodedPassword = testPasswordEncoder.encode(changePasswordDTO.newPassword)

        val changedAccount = Account(
            accountSaved.email,
            accountSaved.emailVerified,
            accountSaved.name,
            newEncodedPassword
        ).also {
            it.id = accountSaved.id
        }

        val partyTimeUserDetails = PartyTimeUserDetails(accountSaved)
        val authentication = AuthenticationToken(partyTimeUserDetails)

        //setup - mock
        every { accountRepository.findAccountByEmail(authentication.principal) } returns Optional.of(accountSaved)
        every { cryptService.passwordMatchesHash(changePasswordDTO.oldPassword, encodedPassword) } returns true
        every { cryptService.encodePassword(changePasswordDTO.newPassword) } returns newEncodedPassword
        every { accountRepository.save(any()) } returns changedAccount
        //execute
        assertDoesNotThrow {
            accountService.changePassword(changePasswordDTO, authentication)
        }

        //validate
        verify(exactly = 1) { accountRepository.findAccountByEmail(authentication.principal) }
        verify(exactly = 1) { cryptService.passwordMatchesHash(changePasswordDTO.oldPassword, encodedPassword) }
        verify(exactly = 1) { cryptService.encodePassword(changePasswordDTO.newPassword) }
        verify(exactly = 1) { accountRepository.save(withArg {
            assertEquals(changedAccount.name, it.name)
            assertEquals(changedAccount.pwHash, it.pwHash)
            assertEquals(changedAccount.email, it.email)
            assertEquals(changedAccount.id, it.id)
        }) }
    }

    @Test
    fun changePasswordUnauthorized() {
        //setup - data
        val accountSaved = Account(
            eMail,
            false,
            name,
            encodedPassword
        ).also {
            it.id = 0L
        }

        val changePasswordDTO = ChangePasswordDTO(
            "wrong!Password5unauthorized",
            "Jkl?mno2pqr"
        )
        val partyTimeUserDetails = PartyTimeUserDetails(accountSaved)
        val authentication = AuthenticationToken(partyTimeUserDetails)

        //setup - mock
        every { accountRepository.findAccountByEmail(authentication.principal) } returns Optional.of(accountSaved)
        every { cryptService.passwordMatchesHash(changePasswordDTO.oldPassword, encodedPassword) } returns false

        //execute
        val thrownException = assertThrows<ApiErrorException> {
            accountService.changePassword(changePasswordDTO, authentication)
        }
        val expectedException = ApiError.unauthorized().asException()
        assertApiErrorExceptionEquals(expectedException, thrownException)

        //validate
        verify(exactly = 1) { accountRepository.findAccountByEmail(authentication.principal) }
        verify(exactly = 1) { cryptService.passwordMatchesHash(changePasswordDTO.oldPassword, encodedPassword) }
    }

    @Test
    fun getAccountByMailSuccess() {
        //setup - data
        val accountSaved = Account(
            eMail,
            false,
            name,
            encodedPassword
        ).also {
            it.id = 0L
        }

        //setup - mock
        every { accountRepository.findAccountByEmail(accountSaved.email) } returns Optional.of(accountSaved)

        //execute
        val receivedAccount = accountService.getAccountByMail(eMail)
        assertEquals(accountSaved, receivedAccount)

        //validate
        verify(exactly = 1) { accountRepository.findAccountByEmail(accountSaved.email) }
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

    @Test
    fun optAccountByMailSuccess() {
        //setup - data
        val accountSaved = Account(
            eMail,
            false,
            name,
            encodedPassword
        ).also {
            it.id = 0L
        }

        //setup - mock
        every { accountRepository.findAccountByEmail(eMail) } returns Optional.of(accountSaved)

        //execute
        val receivedAccount = accountService.optAccountByMail(eMail)
        assertEquals(accountSaved, receivedAccount.get())

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
