package com.partytime.service

import com.partytime.api.dto.changepassword.ChangePasswordDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.ApiErrorException
import com.partytime.api.error.asException
import com.partytime.assertApiErrorExceptionEquals
import com.partytime.configuration.security.PartyTimeUserDetails
import com.partytime.configuration.security.TokenAuthentication
import com.partytime.jpa.entity.Account
import com.partytime.jpa.repository.AccountRepository
import com.partytime.testAbstraction.UnitTest
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertDoesNotThrow
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.dao.OptimisticLockingFailureException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.util.Optional


class AccountServiceTest : UnitTest() {

    val passwordEncoder = BCryptPasswordEncoder()
    private val accountRepository = mockk<AccountRepository>()
    private val accountService = AccountService(accountRepository, passwordEncoder)

    private val eMail = "example@example.com"
    private val testPassword = "Abc!def5ghi"
    private val testAccount = Account(eMail, true, "Example Example", passwordEncoder.encode(testPassword))

    @Test
    fun getAccountSuccess() {
        every { accountRepository.findAccountByEmail(eMail) } returns Optional.of(testAccount)

        val receivedAccount = accountService.getAccount(eMail)
        assertEquals(testAccount, receivedAccount)

        verify(exactly = 1) { accountRepository.findAccountByEmail(eMail) }
    }

    @Test
    fun getAccountNotFound() {
        every { accountRepository.findAccountByEmail(eMail) } returns Optional.empty()

        val thrownException = assertThrows<ApiErrorException> {
            accountService.getAccount(eMail)
        }

        val expectedException =
            ApiError.notFound("Es kann kein Account mit dieser E-Mail gefunden werden.").asException()

        assertApiErrorExceptionEquals(expectedException, thrownException)

        verify(exactly = 1) { accountRepository.findAccountByEmail(eMail) }
    }

    @Test
    fun optAccountSuccess() {
        every { accountRepository.findAccountByEmail(eMail) } returns Optional.of(testAccount)
        val receivedAccount = accountService.optAccount(eMail)

        assertEquals(testAccount, receivedAccount.get())

        verify(exactly = 1) { accountRepository.findAccountByEmail(eMail) }
    }

    @Test
    fun optAccountNotFound() {
        every { accountRepository.findAccountByEmail(eMail) } returns Optional.empty()
        val receivedAccount = accountService.optAccount(eMail)

        assertTrue(receivedAccount.isEmpty)

        verify(exactly = 1) { accountRepository.findAccountByEmail(eMail) }

    }

    @Test
    fun deleteAccountSuccess() {
        every { accountRepository.delete(testAccount) } returns Unit

        assertDoesNotThrow {
            accountRepository.delete(testAccount)
        }

        verify(exactly = 1) { accountRepository.delete(testAccount) }
    }

    @Test
    fun deleteAccountNotFound() {
        every { accountRepository.delete(testAccount) } throws OptimisticLockingFailureException("")

        assertThrows<OptimisticLockingFailureException> {
            accountRepository.delete(testAccount)
        }

        verify(exactly = 1) { accountRepository.delete(testAccount) }
    }

    @Test
    fun changePasswordSuccess() {
        val changePasswordDTO = ChangePasswordDTO(
            testPassword,
            "Jkl?mno2pqr"
        )
        val partyTimeUserDetails = PartyTimeUserDetails(testAccount)
        val authentication = TokenAuthentication(partyTimeUserDetails)

        every { accountRepository.findAccountByEmail(eMail) } returns Optional.of(testAccount)

        val changedAccount = Account(
            testAccount.email,
            testAccount.emailVerified,
            testAccount.name,
            passwordEncoder.encode(changePasswordDTO.newPassword)
        )

        every { accountRepository.save(changedAccount) } returns changedAccount

        accountService.changePassword(changePasswordDTO, authentication)

        verify(exactly = 1) { accountRepository.findAccountByEmail(eMail) }
        verify(exactly = 1) { accountRepository.save(changedAccount) }
    }

    @Test
    fun changePasswordUnauthorized() {
        val changePasswordDTO = ChangePasswordDTO(
            "wrong!Password5unauthorized",
            "Jkl?mno2pqr"
        )
        val partyTimeUserDetails = PartyTimeUserDetails(testAccount)
        val authentication = TokenAuthentication(partyTimeUserDetails)

        every { accountRepository.findAccountByEmail(eMail) } returns Optional.of(testAccount)

        val thrownException = assertThrows<ApiErrorException> {
            accountService.changePassword(changePasswordDTO, authentication)
        }

        val expectedException = ApiError.unauthorized().asException()
        assertApiErrorExceptionEquals(expectedException, thrownException)

        verify(exactly = 1) { accountRepository.findAccountByEmail(eMail) }
    }


}
