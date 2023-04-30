package com.partytime.service;

import com.partytime.api.error.ApiError;
import com.partytime.jpa.entity.Account;
import com.partytime.jpa.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    public Account getAccount(String email) {
        return optAccount(email)
            .orElseThrow(() -> ApiError.notFound("Es kann kein Account mit dieser Mail gefunden werden").asException());
    }

    public Optional<Account> optAccount(String email) {
        return accountRepository.findAccountByEmail(email);
    }

    public void deleteAccount(Account account) {
        accountRepository.delete(account);
    }

}
