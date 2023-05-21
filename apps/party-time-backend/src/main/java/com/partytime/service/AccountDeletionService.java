package com.partytime.service;

import com.partytime.api.dto.account.AccountDeleteDTO;
import com.partytime.api.error.ApiError;
import com.partytime.configuration.security.TokenAuthentication;
import com.partytime.jpa.entity.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AccountDeletionService {

    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;

    /**
     * Implements F015
     */
    @Transactional
    public void deleteAccount(AccountDeleteDTO deleteDTO, TokenAuthentication authentication) {
        // Check Password
        Account account = accountService.getAccount(authentication.getPrincipal().getUsername());
        if (!passwordEncoder.matches(deleteDTO.getPassword(), account.getPwHash())) {
            throw ApiError.unauthorized().asException();
        }
        // Every occurrence of an account has to be deleted
        // Include all Deletes here


        // Lastly remove the Account
        accountService.deleteAccount(account);
    }

}
