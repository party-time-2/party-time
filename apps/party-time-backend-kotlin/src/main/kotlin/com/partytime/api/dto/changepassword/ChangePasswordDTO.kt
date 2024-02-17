package com.partytime.api.dto.changepassword

import com.partytime.api.ApiConstants
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

data class ChangePasswordDTO(
    @field:NotEmpty
    @field:Size(min = 8, max = 30)
    @Pattern(regexp = ApiConstants.REGEX_PASSWORD)
    val oldPassword: String,
    @field:NotEmpty
    @field:Size(min = 8, max = 30)
    @field:Pattern(regexp = ApiConstants.REGEX_PASSWORD)
    val newPassword: String
)
