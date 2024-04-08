package com.partytime.service

import com.partytime.api.dto.account.AccountRegisterDTO
import com.partytime.api.dto.changepassword.ChangePasswordDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.jpa.entity.Account
import com.partytime.jpa.repository.AccountRepository
import com.partytime.mail.model.MailEvent
import com.partytime.mail.model.VerifyAccountData
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.context.ApplicationEventPublisher
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.Optional

private val accountServiceLogger = KotlinLogging.logger {}

/**
 * A [Service] class for account related functionality.
 *
 * @param accountRepository Repository where account related information can be stored
 * @param cryptService Used to encode passwords and check if passwords match hashes
 * @param configurationProperties Used to retrieve the server url for verification requests
 * @param applicationEventPublisher Used to send [MailEvent] for verification requests
 * @constructor Constructs a new [AccountService]
 */
@Service
class AccountService(
    private val accountRepository: AccountRepository,
    private val cryptService: CryptService,
    private val configurationProperties: PartyTimeConfigurationProperties,
    private val applicationEventPublisher: ApplicationEventPublisher
) {

    /**
     * F010 - Konto Erstellen
     * F014 - Konto Verifizieren
     *
     * Registers an account if the provided e-mail address isn't associated with an existing account already.
     * @param accountRegisterDTO Information about the to-be-registered account
     * @return The registered account.
     */
    @Transactional
    fun registerAccount(accountRegisterDTO: AccountRegisterDTO): Account {
        if (optAccountByMail(accountRegisterDTO.email).isPresent) {
            // Account already exists!
            throw ApiError.badRequest("Ein Account mit dieser E-Mail existiert bereits!")
                .asException()
        }

        val account = Account(
            accountRegisterDTO.email,
            false,
            accountRegisterDTO.name,
            cryptService.encodePassword(accountRegisterDTO.password),
            emailVerificationCode = cryptService.randomUUID().toString()
        )

        val savedAccount = accountRepository.save(account)

        // F014 - Konto Verifizieren
        val mailEvent = MailEvent(
            this,
            savedAccount.email,
            "Verifiziere deinen Account!",
            VerifyAccountData(
                configurationProperties.url,
                savedAccount.name,
                "${configurationProperties.url}/auth/verify/?token=${savedAccount.emailVerificationCode}"
            )
        )

        applicationEventPublisher.publishEvent(mailEvent)

        accountServiceLogger.info {
            "Account created! Verification Code: " + account.emailVerificationCode
        }

        return savedAccount
    }

    /**
     * Saves an [Account] in the [accountRepository].
     *
     * @param account to be stored in the [accountRepository]
     * @return Result of saving the [Account]. Has a non-null [Account.id]
     */
    fun saveAccount(account: Account) = accountRepository.save(account)

    /**
     * Deletes an [Account] in the [accountRepository].
     *
     * @param account Entry to be deleted in the [accountRepository]
     */
    fun deleteAccount(account: Account) = accountRepository.delete(account)

    /**
     * Implements F013
     *
     * Changes the password of an authenticated user.
     * Succeeds if the hash of the old, user-provided password matches the saved password hash.
     *
     * @param changePasswordDTO contains user-provided information about their current old password and desired new password
     * @param authentication Instance of [AuthenticationToken] of the current user who wishes to change their password.
     */
    @Transactional
    fun changePassword(changePasswordDTO: ChangePasswordDTO, authentication: AuthenticationToken) {
        val email = authentication.principal
        val account = getAccountByMail(email)
        val oldPasswordMatches = cryptService.passwordMatchesHash(changePasswordDTO.oldPassword, account.pwHash)
        if (!oldPasswordMatches) {
            throw ApiError.unauthorized().asException()
        }

        val newPasswordHash = cryptService.encodePassword(changePasswordDTO.newPassword)
        account.pwHash = newPasswordHash
        accountRepository.save(account)
    }

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
}
