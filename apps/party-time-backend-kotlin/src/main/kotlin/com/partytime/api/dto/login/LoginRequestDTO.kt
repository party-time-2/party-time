package com.partytime.api.dto.login

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty

/**
 * Data transfer object used for login requests
 *
 * @param email Email of the account holder
 * @param password Password of the to-be-created account
 */
data class LoginRequestDTO(
    @field:NotEmpty
    @field:Email
    val email: String,
    @field:NotEmpty
    val password: String
)
