package com.partytime.service;

import com.partytime.api.dto.AccountRegisterDTO;
import com.partytime.api.error.ApiError;
import com.partytime.jpa.entity.Account;
import com.partytime.jpa.repository.AccountRepository;
import com.partytime.mail.MailService;
import com.partytime.mail.model.verifyaccount.VerifyAccountModel;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    /**
     * F010 - Konto Erstellen
     * F014 - Konto Verifizieren
     */
    @Transactional
    public Account registerAccount(AccountRegisterDTO accountRegisterDTO) {
        if (accountRepository.existsByEmail(accountRegisterDTO.getEmail())) {
            // Account already exists!
            throw ApiError.badRequest("An Account with this Email already exists!")
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
        mailService.sendMail(savedAccount.getEmail(), "Verify your Account!",
            MailService.TEMPLATE_VERIFY_ACCOUNT, VerifyAccountModel.builder()
                .name(account.getName())
                .verificationLink("https://partytime.de/profile/activation/" + account.getEmailVerificationCode())
                .build());

        return savedAccount;
    }

    /**
     * F014 - Konto Verifizieren
     */
    @Transactional
    public void verifyAccount(String emailVerificationCode) {
        Account account = accountRepository.findByEmailVerificationCode(emailVerificationCode)
            .orElseThrow(() -> ApiError.badRequest("Email Verification failed ").asException());
        account.setEmailVerified(true);
        account.setEmailVerificationCode(null);
        accountRepository.save(account);
    }

}
