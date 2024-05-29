package com.partytime.api.dto.changepassword

import com.partytime.api.ApiConstants
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

/**
 * Serializable information container for Password changes
 *
 * @param oldPassword The old password of the user whose password should be changed
 * @param newPassword The new password of the user whose password should be changed
 */
data class ChangePasswordDTO(
    @field:NotEmpty
    @field:Size(min = 8, max = 30)
    @field:Pattern(regexp = ApiConstants.REGEX_PASSWORD)
    val oldPassword: String,
    @field:NotEmpty
    @field:Size(min = 8, max = 30)
    @field:Pattern(regexp = ApiConstants.REGEX_PASSWORD)
    val newPassword: String
)
