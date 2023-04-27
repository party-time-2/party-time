package com.partytime.api.controller;

import com.partytime.api.dto.AccountDTO;
import com.partytime.api.dto.AccountRegisterDTO;
import com.partytime.api.dto.changepassword.ChangePasswordDTO;
import com.partytime.configuration.security.TokenAuthentication;
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
    description = "API Endpoints providing all required logic for Authentication"
)
public class AuthController {
    static final String TAG = "Authentication API";

    private final AuthService authService;

    /**
     * F010 - Konto Erstellen
     */
    @PostMapping("/register")
    @Operation(
        description = "Register a new Account",
        responses = {
            @ApiResponse(
                description = "The Account Object of the newly created Account",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            @ApiResponse(
                description = "Account with Email already exists",
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
     * Implements F013
     */
    @PostMapping("/change")
    @Operation(
        description = "Change the Password of an Account",
        responses = {
            @ApiResponse(
                description = "Password Change success",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            @ApiResponse(
                description = "The Old Password is Wrong",
                responseCode = "401"
            ),
            @ApiResponse(
                description = "New Password does not match requirements",
                responseCode = "409"
            )
        }
    )
    public void changePassword(@RequestBody @Valid @NotNull ChangePasswordDTO body,
                               TokenAuthentication authentication) {
        // TODO
    }

    /**
     * F014 - Konto Verifizieren
     */
    @PostMapping("/verify/{code}")
    @Operation(
        description = "Verify the Email of an Account",
        responses = {
            @ApiResponse(
                description = "Verification Success. User Account is active now!",
                responseCode = "200"
            ),
            @ApiResponse(
                description = "Account Verification failed",
                responseCode = "400"
            )
        }
    )
    @SecurityRequirements
    public void verifyMail(@PathVariable("code") @NotNull @NotEmpty String code) {
        authService.verifyAccount(code);
    }

}
