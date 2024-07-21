package com.partytime.api.dto.login

/**
 * Data transfer object used for successful login requests
 *
 * @param token JWT used for future password-less authentication
 */
data class LoginResponseDTO(
    val token: String
)
