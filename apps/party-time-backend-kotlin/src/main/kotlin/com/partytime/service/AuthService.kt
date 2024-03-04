package com.partytime.service

import com.partytime.api.dto.account.AccountRegisterDTO
import com.partytime.api.dto.changepassword.ChangePasswordDTO
import com.partytime.api.dto.login.LoginRequestDTO
import com.partytime.api.dto.login.LoginResponseDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.jpa.entity.Account
import com.partytime.mail.model.MailEvent
import com.partytime.mail.model.VerifyAccountData
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.context.ApplicationEventPublisher
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

private val authLogger = KotlinLogging.logger {}

/**
 *  A [Service] class for authentication related functionality.
 *
 *  @param accountService used for retrieving Accounts and storing changed Account information
 *  @param passwordEncoder Used to hash new passwords for storage and hash old passwords for comparison with stored passwords
 *  @param jwtService Used to create [AuthenticationToken] for successfully logged-in users
 *  @param configurationProperties Used to retrieve the server url for verification requests
 *  @param applicationEventPublisher Used to send [MailEvent] for verification requests
 *  @constructor Constructs a new [AuthService]
 */
@Service
class AuthService(
    private val accountService: AccountService,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService,
    private val configurationProperties: PartyTimeConfigurationProperties,
    private val applicationEventPublisher: ApplicationEventPublisher
) {

    //TODO Move [registerAccount] to [AccountService] class

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
        if (accountService.optAccountByMail(accountRegisterDTO.email).isPresent) {
            // Account already exists!
            throw ApiError.badRequest("Ein Account mit dieser E-Mail existiert bereits!")
                .asException()
        }

        val account = Account(
            accountRegisterDTO.email,
            false,
            accountRegisterDTO.name,
            passwordEncoder.encode(accountRegisterDTO.password),
            emailVerificationCode = UUID.randomUUID().toString()
        )

        val savedAccount = accountService.saveAccount(account)

        // F014 - Konto Verifizieren
        val mailEvent = MailEvent(
            this,
            savedAccount.email,
            "Verifiziere deinen Account!",
            VerifyAccountData(
                configurationProperties.url,
                savedAccount.name,
                "${configurationProperties.url}/auth/verify/${savedAccount.emailVerificationCode}"
            )
        )

        applicationEventPublisher.publishEvent(mailEvent)

        authLogger.info {
            "Account created! Verification Code: " + account.emailVerificationCode
        }

        return savedAccount
    }

    /**
     * F014 - Konto Verifizieren
     *
     * Verifies an account by e-mail-verification code
     * @param emailVerificationCode E-mail-verification code provided by the link the user clicked on
     */
    @Transactional
    fun verifyAccount(emailVerificationCode: String) {
        val account = accountService.accountByEmailVerificationCode(emailVerificationCode)
            .orElseThrow {
                ApiError.badRequest("E-Mail Verifizierung fehlgeschlagen").asException()
            }
        account.emailVerified = true
        account.emailVerificationCode = null
        accountService.saveAccount(account)
    }

    /**
     * Implements F011
     *
     * Performs a login for the user by transforming their [LoginRequestDTO] into a [LoginResponseDTO].
     * The login will only succeed if the data contained in [LoginResponseDTO] can be associated with a
     *
     * - registered
     * - e-mail-verified
     * - password matching
     *
     * saved [Account].
     * @param dto Information provided by the user that wants to log in
     * @return Authentication token
     */
    fun loginUser(dto: LoginRequestDTO): LoginResponseDTO {
        val account = accountService.getAccountByMail(dto.email)
        if (!account.emailVerified) {
            throw ApiError.forbidden().asException()
        }

        val passwordMatch = passwordEncoder.matches(dto.password, account.pwHash)
        if (!passwordMatch) {
            throw ApiError.unauthorized().asException()
        }

        val accessToken = jwtService.createAccessToken(account)
        return LoginResponseDTO(accessToken)
    }

    /**
     * Implements F013
     *
     * Changes the password of an authenticated user.
     * Succeeds if the hash of the old, user-provided password matches the saved password hash.
     * @param changePasswordDTO contains user-provided information about their current old password and desired new password
     * @param authentication Instance of [AuthenticationToken] of the current user who wishes to change their password.
     */
    @Transactional
    fun changePassword(changePasswordDTO: ChangePasswordDTO, authentication: AuthenticationToken) {
        val email = authentication.principal
        val account = accountService.getAccountByMail(email)
        val oldPasswordMatches = passwordEncoder.matches(changePasswordDTO.oldPassword, account.pwHash)
        if (!oldPasswordMatches) {
            throw ApiError.unauthorized().asException()
        }

        val newPasswordHash = passwordEncoder.encode(changePasswordDTO.newPassword)
        account.pwHash = newPasswordHash
        accountService.saveAccount(account)
    }
}
