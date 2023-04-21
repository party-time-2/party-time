package com.partytime.service;

import com.partytime.api.error.ApiError;
import com.partytime.jpa.entity.Account;
import com.partytime.jpa.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    public Account getAccount(String email) {
        return accountRepository.findAccountByEmail(email)
            .orElseThrow(() -> ApiError.badRequest("Es kann kein Account mit dieser Mail gefunden werden").asException());
    }

}