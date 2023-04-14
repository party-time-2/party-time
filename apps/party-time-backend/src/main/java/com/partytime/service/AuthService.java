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
        return accountRepository.save(account);
    }

}
