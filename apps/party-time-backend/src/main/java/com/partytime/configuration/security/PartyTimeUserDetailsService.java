package com.partytime.configuration.security;

import com.partytime.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@RequiredArgsConstructor
public class PartyTimeUserDetailsService implements UserDetailsService {

    private final AccountService accountService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return accountService.optAccount(username)
                .map(PartyTimeUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("Host not exists"));
    }
}
