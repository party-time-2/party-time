package com.partytime.service;

import com.partytime.api.dto.AccountRegisterDTO;
import com.partytime.api.dto.changepassword.ChangePasswordDTO;
import com.partytime.api.dto.login.LoginRequestDTO;
import com.partytime.api.dto.login.LoginResponseDTO;
import com.partytime.api.error.ApiError;
import com.partytime.configuration.PartyTimeConfigurationProperties;
import com.partytime.configuration.security.TokenAuthentication;
import com.partytime.jpa.entity.Account;
import com.partytime.jpa.repository.AccountRepository;
import com.partytime.mail.MailService;
import com.partytime.mail.model.verifyaccount.VerifyAccountModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AccountService accountService;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final JwtService jwtService;
    private final PartyTimeConfigurationProperties configurationProperties;

    /**
     * F010 - Konto Erstellen
     * F014 - Konto Verifizieren
     */
    @Transactional
    public Account registerAccount(AccountRegisterDTO accountRegisterDTO) {
        if (accountRepository.existsByEmail(accountRegisterDTO.getEmail())) {
            // Account already exists!
            throw ApiError.badRequest("Ein Account mit dieser Email existiert bereits!")
                .asException();
        }
        Account account = Account.builder()
            .name(accountRegisterDTO.getName())
            .email(accountRegisterDTO.getEmail())
            .emailVerified(false)
            .pwHash(passwordEncoder.encode(accountRegisterDTO.getPassword()))
            .emailVerificationCode(UUID.randomUUID().toString())
            .build();
        Account savedAccount = accountRepository.save(account);

        // F014 - Konto Verifizieren
        mailService.sendMail(savedAccount.getEmail(), "Verifiziere deinen Account!",
            MailService.TEMPLATE_VERIFY_ACCOUNT, VerifyAccountModel.builder()
                .name(account.getName())
                    .homepage(configurationProperties.getUrl())
                .verificationLink(configurationProperties.getUrl() + "/auth/verify/" + account.getEmailVerificationCode())
                .build());

        log.info("Account created! Verification Code: " + account.getEmailVerificationCode());

        return savedAccount;
    }

    /**
     * F014 - Konto Verifizieren
     */
    @Transactional
    public void verifyAccount(String emailVerificationCode) {
        Account account = accountRepository.findByEmailVerificationCode(emailVerificationCode)
            .orElseThrow(() -> ApiError.badRequest("Email Verifizierung fehlgeschlagen").asException());
        account.setEmailVerified(true);
        account.setEmailVerificationCode(null);
        accountRepository.save(account);
    }

    /**
     * Implements F011
     */
    public LoginResponseDTO loginUser(LoginRequestDTO dto) {
        Account account = accountService.getAccount(dto.getEmail());
        if (!account.isEmailVerified()) {
            throw ApiError.forbidden().asException();
        }

        boolean passwordMatch = passwordEncoder.matches(dto.getPassword(), account.getPwHash());
        if (!passwordMatch) {
            throw ApiError.unauthorized().asException();
        }

        String accessToken = jwtService.createAccessToken(account);
        return new LoginResponseDTO(accessToken);
    }

    /**
     * Implements F013
     */
    @Transactional
    public void changePassword(ChangePasswordDTO changePasswordDTO, TokenAuthentication authentication) {
        String email = authentication.getPrincipal().getUsername();
        Account account = accountService.getAccount(email);
        boolean oldPasswordMatches = passwordEncoder.matches(changePasswordDTO.getOldPassword(), account.getPwHash());
        if (!oldPasswordMatches) {
            throw ApiError.unauthorized().asException();
        }
        String newPasswordHash = passwordEncoder.encode(changePasswordDTO.getNewPassword());
        account.setPwHash(newPasswordHash);
        accountRepository.save(account);
    }

}
