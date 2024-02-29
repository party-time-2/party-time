package com.partytime.service

import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.jpa.entity.Account
import com.partytime.jpa.repository.AccountRepository
import org.springframework.stereotype.Service
import java.util.Optional

@Service
class AccountService (
    private val accountRepository: AccountRepository
) {
    fun getAccount(email: String): Account = optAccount(email)
        .orElseThrow { ApiError.notFound("Es kann kein Account mit dieser E-Mail gefunden werden.").asException() }

    fun optAccount(email: String): Optional<Account> = accountRepository.findAccountByEmail(email)

    fun deleteAccount(account: Account) {
        accountRepository.delete(account)
    }


}
