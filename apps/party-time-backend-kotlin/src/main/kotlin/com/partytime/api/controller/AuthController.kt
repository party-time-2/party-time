package com.partytime.api.controller

import com.partytime.api.dto.login.LoginRequestDTO
import com.partytime.api.dto.login.LoginResponseDTO
import com.partytime.service.AuthService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.security.SecurityRequirements
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Controller for authentication related matters.
 *
 * @param authService Service for authentication related matters (e.g. logging in)
 * @constructor Constructs a new [AuthController]
 */
@RestController
@RequestMapping("/api/auth")
@Validated
@Tag(
    name = AuthController.TAG,
    description = "API endpoints providing all required logic for authentication"
)
class AuthController (
    private val authService: AuthService
) {
    companion object {
        /** Tag information for OpenAPI documentation */
        const val TAG: String = "Authentication API"
    }

    /**
     * Implements F011
     *
     * Logs a user into the plattform.
     *
     * @param body Information required for the log-in
     * @return Information about the successful log-in (contains the auth-token for password-less authentication)
     */
    @PostMapping("/login")
    @Operation(
        description = "Login an account",
        responses = [
            ApiResponse(
                description = "Login success",
                responseCode = "200",
                useReturnTypeSchema = true
            ), ApiResponse(
                description = "Login failed",
                responseCode = "401"
            ), ApiResponse(
                description = "Account not verified",
                responseCode = "403"
            ), ApiResponse(description = "Account doesn't exist", responseCode = "404")
        ]
    )
    @SecurityRequirements
    fun login(@RequestBody body: @Valid @NotNull LoginRequestDTO): LoginResponseDTO =
        authService.loginUser(body)

    /**
     * F014 - Konto Verifizieren
     *
     * Verifies the validity of the provided e-mail address of an account.
     *
     * @param code The e-mail-verification code used to identify which account should be marked as e-mail-verified
     * @param emptyBody An empty message body, as required by the HTTP POST method
     */
    @PostMapping("/verify/{code}")
    @Operation(
        description = "Verify the e-mail of an account",
        responses = [
            ApiResponse(
                description = "Verification success. User account is active now!",
                responseCode = "200"
            ),
            ApiResponse(
                description = "Account verification failed",
                responseCode = "400"
            )
        ]
    )
    @SecurityRequirements
    fun verifyMail(
        @PathVariable("code") code: @NotNull @NotEmpty String,
        @RequestBody emptyBody: Unit
    ) {
        authService.verifyAccount(code)
    }
}
