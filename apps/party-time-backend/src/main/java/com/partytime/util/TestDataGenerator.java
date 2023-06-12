package com.partytime.util;

import com.partytime.api.dto.login.LoginRequestDTO;
import com.partytime.api.dto.login.LoginResponseDTO;
import com.partytime.jpa.entity.Account;
import com.partytime.jpa.repository.AccountRepository;
import com.partytime.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
@Profile("!prod") // Not in Prod Mode
public class TestDataGenerator implements ApplicationRunner {

    public static final String DEBUG_PASSWORD = "Hallo123!party";
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

    @Override
    public void run(ApplicationArguments args) {
        createAccount("Verified User 1", "verified1@partytime.de", true);
        createAccount("Verified User 2", "verified2@partytime.de", true);
        createAccount("Verified User 3", "verified3@partytime.de", true);
        createAccount("Verified User 4", "verified4@partytime.de", true);

        createAccount("Not Verified User 1", "not_verified1@partytime.de", false);
        createAccount("Not Verified User 2", "not_verified2@partytime.de", false);
        createAccount("Not Verified User 3", "not_verified3@partytime.de", false);
        createAccount("Not Verified User 4", "not_verified4@partytime.de", false);
    }

    /**
     * Implements F011
     */
    @SuppressWarnings("java:S6437") // Test Data not used in Production
    private void createAccount(String name, String email, boolean verified) {
        if (!accountRepository.existsByEmail(email)) {
            Account account = Account.builder()
                .name(name)
                .pwHash(passwordEncoder.encode(DEBUG_PASSWORD))
                .emailVerified(verified)
                .email(email)
                .build();
            if (!verified) {
                account.setEmailVerificationCode(UUID.randomUUID().toString());
            }
            accountRepository.save(account);
            log.info("Created a " + (verified ? "verified" : "not verified") + " Test Account with Email " + email);
        }
        if (verified) {
            // TODO Remove me before Abgabe
            LoginResponseDTO respo = authService.loginUser(LoginRequestDTO.builder()
                .email(email)
                .password(DEBUG_PASSWORD)
                .build());
            log.info("Token for " + email + ":\n" + respo.getToken());
        }
    }

}
