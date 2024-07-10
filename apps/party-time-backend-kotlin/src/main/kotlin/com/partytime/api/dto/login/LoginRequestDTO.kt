package com.partytime.api.dto.login

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty

data class LoginRequestDTO(
    @field:NotEmpty
    @field:Email
    val email: String,
    @field:NotEmpty
    val password: String
)
