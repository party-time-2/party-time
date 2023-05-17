package com.partytime.api.controller;

import com.partytime.api.dto.AccountDeleteDTO;
import com.partytime.configuration.security.TokenAuthentication;
import com.partytime.service.AccountDeletionService;
import com.partytime.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    private final AccountDeletionService accountDeletionService;

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
            ),
            @ApiResponse(
                description = "The Old Password is Wrong",
                responseCode = "401"
            )
        }
    )
    public void deleteOwnAccount(@RequestBody @NotNull @Valid AccountDeleteDTO body,
                                 TokenAuthentication authentication) {
        accountDeletionService.deleteAccount(body, authentication);
    }

}
