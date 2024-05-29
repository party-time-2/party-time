package com.partytime.jpa.repository

import com.partytime.jpa.entity.Account
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface AccountRepository: JpaRepository<Account, Long> {
    fun findByEmailVerificationCode(code: String): Optional<Account>
    fun existsByEmail(mail: String): Boolean
    fun findAccountByEmail(mail: String): Optional<Account>
}
