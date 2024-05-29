package com.partytime.api.dto.account

import com.partytime.api.ApiConstants
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

data class AccountDeleteDTO(
    @field:NotEmpty
    val password: String
)

data class AccountDTO(
    val id: Long,
    @field:NotEmpty
    val name: String,
    @field:NotEmpty
    @field:Email
    val email: String
)

data class AccountRegisterDTO(
    @field:NotEmpty
    @field:Size(min = 5, max = 20)
    val name: String,

    @field:NotEmpty
    @field:Email
    val email: String,

    @field:NotEmpty
    @field:Size(min = 8, max = 30)
    @field:Pattern(regexp = ApiConstants.REGEX_PASSWORD)
    val password: String
)
