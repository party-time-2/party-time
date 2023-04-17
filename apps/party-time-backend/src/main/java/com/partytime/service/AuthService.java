package com.partytime.service;

import com.partytime.api.dto.AccountRegisterDTO;
import com.partytime.api.error.ApiError;
import com.partytime.jpa.entity.Account;
import com.partytime.jpa.repository.AccountRepository;
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
        if (accountRepository.existsById(accountRegisterDTO.getEmail())) {
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
        mailService.sendMail(savedAccount.getEmail(), "Verify your Account!", "Please verify your Account: \n\n" +
            "Link: https://partytime.de/profile/activation/" + savedAccount.getEmailVerificationCode() + "\n\n" +
            "Best Regards\n" +
            "Herbert");

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