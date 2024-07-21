package com.partytime.api.dto.account

import com.partytime.api.ApiConstants
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

/**
 * Data transfer object used for account deletion
 *
 * @param password Password of the account that should be deleted
 */
data class AccountDeleteDTO(
    @field:NotEmpty
    val password: String
)

/**
 * Data transfer object used for account information
 *
 * @param id Id of the account
 * @param name Name of the account holder
 * @param email Email of the account holder
 */
data class AccountDTO(
    val id: Long,
    @field:NotEmpty
    val name: String,
    @field:NotEmpty
    @field:Email
    val email: String
)

/**
 * Data transfer object used for account registration
 *
 * @param name Name of the account holder
 * @param email Email of the account holder
 * @param password Password of the to-be-created account
 */
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
