package com.partytime.configuration.security;

import com.partytime.jpa.entity.Account;
import org.springframework.security.core.userdetails.User;

import java.util.Collections;

public class PartyTimeUserDetails extends User {

    public PartyTimeUserDetails(Account account) {
        super(account.getEmail(), account.getPwHash(), Collections.emptyList());
    }

}
