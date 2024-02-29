package com.partytime.service

import com.partytime.api.error.ApiError
import com.partytime.api.error.ApiErrorException
import com.partytime.api.error.asException
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
import java.util.Optional


class AccountServiceTest : UnitTest() {

    private val accountRepository = mockk<AccountRepository>()
    private val accountService = AccountService(accountRepository)

    private val eMail = "example@example.com"
    private val testAccount = Account(eMail, true, "Example Example", "abc")

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

        assertEquals(expectedException.apiError.message, thrownException.apiError.message)
        assertEquals(expectedException.apiError.status, thrownException.apiError.status)
        assertEquals(expectedException.message, thrownException.message)

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
}
