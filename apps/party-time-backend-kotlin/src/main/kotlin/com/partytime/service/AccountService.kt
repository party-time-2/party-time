package com.partytime.service

import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.jpa.entity.Account
import com.partytime.jpa.repository.AccountRepository
import org.springframework.stereotype.Service
import java.util.Optional

/**
 * A [Service] class for account related functionality.
 *
 * @param accountRepository Repository where account related information can be stored
 * @constructor Constructs a new [AccountService]
 */
@Service
class AccountService(
    private val accountRepository: AccountRepository
) {

    /**
     * Saves an [Account] in the [accountRepository].
     *
     * @param account to be stored in the [accountRepository]
     * @return Result of saving the [Account]. Usually has a non-null [Account.id]
     */
    fun saveAccount(account: Account) = accountRepository.save(account)

    /**
     * Finds an [Account] by e-mail address.
     *
     * @param email The e-mail address of the user whose account should be fetched.
     * @return [Account] with matching e-mail address.
     */
    fun getAccountByMail(email: String): Account = optAccountByMail(email)
        .orElseThrow { ApiError.notFound("Es kann kein Account mit dieser E-Mail gefunden werden.").asException() }

    /**
     * Finds an [Account] that may not necessarily exist by e-mail address.
     * The optional will be empty if an account with the provided e-mail address couldn't be found.
     *
     * @param email The e-mail address of the user whose account should be fetched
     * @return [Optional] potentially containing an [Account] if the e-mail address is registered for an [Account]
     */
    fun optAccountByMail(email: String): Optional<Account> = accountRepository.findAccountByEmail(email)

    /**
     * Finds an [Account] that may not necessarily exist by e-mail-verification code.
     * The optional will be empty if an account with the provided e-mail-verification code.
     *
     * @param emailVerificationCode The e-mail-verification code of the user whose account should be fetched
     * @return [Optional] potentially containing an [Account] if the e-mail-verification code is registered for an [Account].
     */
    fun accountByEmailVerificationCode(emailVerificationCode: String) = accountRepository
        .findByEmailVerificationCode(emailVerificationCode)

    /**
     * Deletes an [Account].
     *
     * @param account the account that should be deleted in the [accountRepository]
     */
    fun deleteAccount(account: Account) {
        accountRepository.delete(account)
    }


}
