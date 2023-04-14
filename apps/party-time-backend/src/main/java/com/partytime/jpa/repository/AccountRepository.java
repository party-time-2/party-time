package com.partytime.jpa.repository;

import com.partytime.jpa.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String> {

    Optional<Account> findByEmailVerificationCode(String code);

}
