package com.partytime.api.controller;

import com.partytime.api.dto.AccountDTO;
import com.partytime.api.dto.AccountRegisterDTO;
import com.partytime.api.error.ApiErrorException;
import com.partytime.jpa.mapper.AccountMapper;
import com.partytime.service.AuthService;
import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
