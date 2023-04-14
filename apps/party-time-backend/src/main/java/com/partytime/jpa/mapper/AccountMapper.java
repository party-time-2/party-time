package com.partytime.jpa.mapper;

import com.partytime.api.dto.AccountDTO;
import com.partytime.jpa.entity.Account;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class AccountMapper {

    public static AccountDTO map(Account account) {
        return AccountDTO.builder()
            .name(account.getName())
            .email(account.getEmail())
            .emailVerified(account.isEmailVerified())
            .build();
    }

}
