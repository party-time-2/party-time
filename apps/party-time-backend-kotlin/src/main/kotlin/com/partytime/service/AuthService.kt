package com.partytime.service

import com.partytime.api.dto.account.AccountRegisterDTO
import com.partytime.api.dto.changepassword.ChangePasswordDTO
import com.partytime.api.dto.login.LoginRequestDTO
import com.partytime.api.dto.login.LoginResponseDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.configuration.security.TokenAuthentication
import com.partytime.jpa.entity.Account
import com.partytime.jpa.repository.AccountRepository
import com.partytime.mail.model.MailEvent
import com.partytime.mail.model.VerifyAccountData
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.context.ApplicationEventPublisher
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

private val authLogger = KotlinLogging.logger {}
@Service
class AuthService (
    private val accountService: AccountService,
    private val accountRepository: AccountRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService,
    private val configurationProperties: PartyTimeConfigurationProperties,
    private val applicationEventPublisher: ApplicationEventPublisher
) {

    /**
     * F010 - Konto Erstellen
     * F014 - Konto Verifizieren
     */
    @Transactional
    fun registerAccount(accountRegisterDTO: AccountRegisterDTO): Account {
        if (accountRepository.existsByEmail(accountRegisterDTO.email)) {
            // Account already exists!
            throw ApiError.badRequest("Ein Account mit dieser E-Mail existiert bereits!")
                .asException()
        }

        Account(
            accountRegisterDTO.email,
            false,
            accountRegisterDTO.name,
            passwordEncoder.encode(accountRegisterDTO.password),
            emailVerificationCode = UUID.randomUUID().toString()
        )

        val account = Account(
            accountRegisterDTO.email,
            false,
            accountRegisterDTO.name,
            passwordEncoder.encode(accountRegisterDTO.password),
            emailVerificationCode = UUID.randomUUID().toString()
        )

        val savedAccount = accountRepository.save(account)

        // F014 - Konto Verifizieren
        val mailEvent = MailEvent(
            this,
            savedAccount.email,
            "Verifiziere deinen Account!",
            VerifyAccountData(
                configurationProperties.url,
                account.name,
                "${configurationProperties.url}/auth/verify/${account.emailVerificationCode}"
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
     */
    @Transactional
    fun verifyAccount(emailVerificationCode: String) {
        val account = accountRepository.findByEmailVerificationCode(emailVerificationCode)
            .orElseThrow {
                ApiError.badRequest("E-Mail Verifizierung fehlgeschlagen").asException()
            }
        account.emailVerified = true
        account.emailVerificationCode = null
        accountRepository.save(account)
    }

    /**
     * Implements F011
     */
    fun loginUser(dto: LoginRequestDTO): LoginResponseDTO {
        val account = accountService.getAccount(dto.email)
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
     */
    @Transactional
    fun changePassword(changePasswordDTO: ChangePasswordDTO, authentication: TokenAuthentication) {
        val email = authentication.principal.username
        val account = accountService.getAccount(email)
        val oldPasswordMatches = passwordEncoder.matches(changePasswordDTO.oldPassword, account.pwHash)
        if (!oldPasswordMatches) {
            throw ApiError.unauthorized().asException()
        }

        val newPasswordHash = passwordEncoder.encode(changePasswordDTO.newPassword)
        account.pwHash = newPasswordHash
        accountRepository.save(account)
    }
}
