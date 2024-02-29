package com.partytime.service

import com.partytime.api.dto.changepassword.ChangePasswordDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.configuration.security.TokenAuthentication
import com.partytime.jpa.entity.Account
import com.partytime.jpa.repository.AccountRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.Optional

@Service
class AccountService (
    private val accountRepository: AccountRepository,
    private val passwordEncoder: PasswordEncoder
) {
    fun getAccount(email: String): Account = optAccount(email)
        .orElseThrow { ApiError.notFound("Es kann kein Account mit dieser E-Mail gefunden werden.").asException() }

    fun optAccount(email: String): Optional<Account> = accountRepository.findAccountByEmail(email)

    fun deleteAccount(account: Account) {
        accountRepository.delete(account)
    }

    /**
     * Implements F013
     */
    @Transactional
    fun changePassword(changePasswordDTO: ChangePasswordDTO, authentication: TokenAuthentication) {
        val email = authentication.principal.username
        val account = getAccount(email)
        val oldPasswordMatches = passwordEncoder.matches(changePasswordDTO.oldPassword, account.pwHash)
        if (!oldPasswordMatches) {
            throw ApiError.unauthorized().asException()
        }

        val newPasswordHash = passwordEncoder.encode(changePasswordDTO.newPassword)
        account.pwHash = newPasswordHash
        accountRepository.save(account)
    }
}
