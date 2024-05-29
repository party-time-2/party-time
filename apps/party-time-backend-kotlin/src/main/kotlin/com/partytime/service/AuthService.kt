package com.partytime.service

import com.partytime.api.dto.login.LoginRequestDTO
import com.partytime.api.dto.login.LoginResponseDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.jpa.entity.Account
import com.partytime.mail.model.MailEvent
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.context.ApplicationEventPublisher
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

private val authServiceLogger = KotlinLogging.logger("AuthService")
/**
 *  A [Service] class for authentication related functionality.
 *
 *  @param accountService used for retrieving Accounts and storing changed Account information
 *  @param cryptService Used to encode passwords and check if passwords match hashes
 *  @param jwtService Used to create [AuthenticationToken] for successfully logged-in users
 *  @param applicationEventPublisher Used to send [MailEvent] for verification requests
 *  @constructor Constructs a new [AuthService]
 */
@Service
class AuthService(
    private val accountService: AccountService,
    private val cryptService: CryptService,
    private val jwtService: JwtService,
    private val applicationEventPublisher: ApplicationEventPublisher
) {
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
        authServiceLogger.info { "Account ${account.email} verified." }
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

        val passwordMatch = cryptService.passwordMatchesHash(dto.password, account.pwHash)
        if (!passwordMatch) {
            throw ApiError.unauthorized().asException()
        }

        val accessToken = jwtService.createAccessToken(account)
        authServiceLogger.info { "Account ${account.email} JWT created." }
        return LoginResponseDTO(accessToken)
    }
}
