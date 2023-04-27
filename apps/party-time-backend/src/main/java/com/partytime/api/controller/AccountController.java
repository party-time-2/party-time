package com.partytime.api.controller;

import com.partytime.configuration.security.TokenAuthentication;
import com.partytime.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/account")
@Validated
@RequiredArgsConstructor
@Tag(
    name = AccountController.TAG,
    description = "API Endpoints providing all required logic for an Account"
)
public class AccountController {
    static final String TAG = "Account API";

    private final AccountService accountService;

    /**
     * Implements F015
     */
    @DeleteMapping("/delete")
    @Operation(
        description = "Deletes the Account of the Logged In User",
        responses = {
            @ApiResponse(
                description = "Account deleted with success",
                responseCode = "200",
                useReturnTypeSchema = true
            )
        }
    )
    public void deleteOwnAccount(TokenAuthentication authentication) {
        // TODO
    }

}
