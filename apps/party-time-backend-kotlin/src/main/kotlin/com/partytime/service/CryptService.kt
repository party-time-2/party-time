package com.partytime.service

import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.util.UUID

/**
 * A [Service] class used for centralized password encoding & matching as well as random UUID generation.
 *
 * @param passwordEncoder Used to hash new passwords and compare passwords with hashed passwords
 * @constructor Constructs a new [CryptService]
 */
@Service
class CryptService(
    private val passwordEncoder: PasswordEncoder,
) {

    /**
     * Encodes a password with a hash function
     *
     * @param password Un-encoded original password
     * @return Password hash
     */
    fun encodePassword(password: String): String = passwordEncoder.encode(password)

    /**
     * Checks if a password matches a previously encoded password (hash).
     *
     * @param password An un-encrypted password
     * @param encodedPassword The password hash result of a previous encoding process
     * @return true if the password matches the hash, false if they don't match
     */
    fun passwordMatchesHash(password: String, encodedPassword: String) =
        passwordEncoder.matches(password, encodedPassword)

    /**
     * Generates a new random UUID
     *
     * @return The generated UUID
     */
    fun randomUUID(): UUID = UUID.randomUUID()
}
