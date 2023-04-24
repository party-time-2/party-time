package com.partytime.service;

import com.partytime.api.dto.AccountRegisterDTO;
import com.partytime.api.error.ApiError;
import com.partytime.configuration.PartyTimeConfigurationProperties;
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

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
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
                .verificationLink(configurationProperties.getUrl() + "/profile/activation/" + account.getEmailVerificationCode())
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

}
