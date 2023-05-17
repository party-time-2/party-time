package com.partytime.jpa.repository;

import com.partytime.jpa.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByEmailVerificationCode(String code);

    boolean existsByEmail(String mail);

    Optional<Account> findAccountByEmail(String mail);

}
