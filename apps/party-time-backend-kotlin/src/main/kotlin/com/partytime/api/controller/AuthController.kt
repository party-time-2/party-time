package com.partytime.api.controller

import com.partytime.api.dto.account.AccountDTO
import com.partytime.api.dto.account.AccountRegisterDTO
import com.partytime.api.dto.changepassword.ChangePasswordDTO
import com.partytime.api.dto.login.LoginRequestDTO
import com.partytime.api.dto.login.LoginResponseDTO
import com.partytime.configuration.security.TokenAuthentication
import com.partytime.jpa.mapper.map
import com.partytime.service.AuthService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.security.SecurityRequirements
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
@Validated
@Tag(
    name = AuthController.TAG,
    description = "API endpoints providing all required logic for authentication"
)
class AuthController @Autowired constructor(
    private val authService: AuthService
) {
    companion object {
        const val TAG: String = "Authentication API"
    }


    /**
     * F010 - Konto Erstellen
     */
    @PostMapping("/register")
    @Operation(
        description = "Register a new account",
        responses = [
            ApiResponse(
                description = "The account object of the newly created account",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            ApiResponse(
                description = "Account with e-mail already exists",
                responseCode = "400"
            )
        ]
    )
    @SecurityRequirements
    fun register(@RequestBody body: @Valid @NotNull AccountRegisterDTO): AccountDTO =
        authService.registerAccount(body).map()

    /**
     * Implements F011
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
     * Implements F013
     */
    @PostMapping("/change")
    @Operation(
        description = "Change the password of an account",
        responses = [
            ApiResponse(
                description = "Password change success",
                responseCode = "200",
                useReturnTypeSchema = true
            ), ApiResponse(
                description = "The old password is wrong",
                responseCode = "401"
            ), ApiResponse(description = "New password does not match requirements", responseCode = "409")
        ]
    )
    fun changePassword(@RequestBody body: @Valid @NotNull ChangePasswordDTO, authentication: TokenAuthentication) {
        authService.changePassword(body, authentication)
    }

    /**
     * F014 - Konto Verifizieren
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
    fun verifyMail(@PathVariable("code") code: @NotNull @NotEmpty String) {
        authService.verifyAccount(code)
    }
}
