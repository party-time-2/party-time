package com.partytime.api.controller;

import com.partytime.api.dto.AccountDTO;
import com.partytime.api.dto.AccountRegisterDTO;
import com.partytime.api.dto.changepassword.ChangePasswordDTO;
import com.partytime.configuration.security.TokenAuthentication;
import com.partytime.api.dto.login.LoginResponseDTO;
import com.partytime.api.dto.login.LoginRequestDTO;
import com.partytime.jpa.mapper.AccountMapper;
import com.partytime.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Validated
@RequiredArgsConstructor
@Tag(
    name = AuthController.TAG,
    description = "API endpoints providing all required logic for authentication"
)
public class AuthController {
    static final String TAG = "Authentication API";

    private final AuthService authService;

    /**
     * F010 - Konto Erstellen
     */
    @PostMapping("/register")
    @Operation(
        description = "Register a new account",
        responses = {
            @ApiResponse(
                description = "The account object of the newly created account",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            @ApiResponse(
                description = "Account with e-mail already exists",
                responseCode = "400"
            )
        }
    )
    @SecurityRequirements
    public AccountDTO register(@RequestBody @Valid @NotNull AccountRegisterDTO body) {
        return AccountMapper.map(
            authService.registerAccount(body)
        );
    }

    /**
     * Implements F011
     */
    @PostMapping("/login")
    @Operation(
        description = "Login an account",
        responses = {
            @ApiResponse(
                description = "Login success",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            @ApiResponse(
                description = "Login failed",
                responseCode = "401"
            ),
            @ApiResponse(
                description = "Account not verified",
                responseCode = "403"
            ),
            @ApiResponse(
                description = "Account doesn't exist",
                responseCode = "404"
            )
        }
    )
    @SecurityRequirements
    public LoginResponseDTO login(@RequestBody @Valid @NotNull LoginRequestDTO body) {
        return authService.loginUser(body);
    }

    /**
     * Implements F013
     */
    @PostMapping("/change")
    @Operation(
        description = "Change the password of an account",
        responses = {
            @ApiResponse(
                description = "Password change success",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            @ApiResponse(
                description = "The old password is wrong",
                responseCode = "401"
            ),
            @ApiResponse(
                description = "New password does not match requirements",
                responseCode = "409"
            )
        }
    )
    public void changePassword(@RequestBody @Valid @NotNull ChangePasswordDTO body,
                               TokenAuthentication authentication) {
        authService.changePassword(body, authentication);
    }

    /**
     * F014 - Konto Verifizieren
     */
    @PostMapping("/verify/{code}")
    @Operation(
        description = "Verify the e-mail of an account",
        responses = {
            @ApiResponse(
                description = "Verification success. User account is active now!",
                responseCode = "200"
            ),
            @ApiResponse(
                description = "Account verification failed",
                responseCode = "400"
            )
        }
    )
    @SecurityRequirements
    public void verifyMail(@PathVariable("code") @NotNull @NotEmpty String code) {
        authService.verifyAccount(code);
    }

}
