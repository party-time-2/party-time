package com.partytime.api.controller

import com.partytime.api.dto.account.AccountDeleteDTO
import com.partytime.configuration.security.TokenAuthentication
import com.partytime.service.AccountDeletionService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import jakarta.validation.constraints.NotNull
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/account")
@Validated
@Tag(
    name = AccountController.TAG,
    description = "API Endpoints providing all required logic for an Account"
)
class AccountController (
    private val accountDeletionService: AccountDeletionService
) {
    companion object {
        const val TAG = "Account API"
    }

    /**
     * Implements F015
     */
    @DeleteMapping("/delete")
    @Operation(
        description = "Deletes the Account of the Logged In User",
        responses = [ApiResponse(
            description = "Account deleted with success",
            responseCode = "200",
            useReturnTypeSchema = true
        ), ApiResponse(description = "The Old Password is Wrong", responseCode = "401")]
    )
    fun deleteOwnAccount(
        @RequestBody body: @NotNull @Valid AccountDeleteDTO,
        authentication: TokenAuthentication
    ) {
        accountDeletionService.deleteAccount(body, authentication)
    }
}
