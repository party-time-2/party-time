package com.partytime.api.controller

import com.partytime.api.dto.account.AccountDTO
import com.partytime.api.dto.account.AccountDeleteDTO
import com.partytime.api.dto.account.AccountRegisterDTO
import com.partytime.api.dto.changepassword.ChangePasswordDTO
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.jpa.mapper.toAccountDTO
import com.partytime.service.AccountDeletionService
import com.partytime.service.AccountService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.security.SecurityRequirements
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import jakarta.validation.constraints.NotNull
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Controller for account related matters.
 *
 * @param accountService Service used for registering accounts and changing passwords
 * @param accountDeletionService Service used for deleting accounts
 * @constructor Constructs a new [AuthController]
 */
@RestController
@RequestMapping("/api/account")
@Validated
@Tag(
    name = AccountController.TAG,
    description = "API Endpoints providing all required logic for an Account"
)
class AccountController (
    private val accountService: AccountService,
    private val accountDeletionService: AccountDeletionService
) {
    companion object {
        /** Tag information for OpenAPI documentation */
        const val TAG = "Account API"
    }

    /**
     * F010 - Konto Erstellen
     *
     * Creates a new account with the provided information.
     *
     * @param body Information about the to-be-created account.
     * @return Information about the registered account.
     */
    @PostMapping
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
    fun register(@Valid @NotNull @RequestBody body:  AccountRegisterDTO): AccountDTO =
        accountService.registerAccount(body).toAccountDTO()

    /**
     * Implements F015
     *
     * Deletes the account of the authenticated user.
     *
     * @param body Information required for deleting the account (current password)
     * @param authentication Authentication information of the authenticated user
     */
    @DeleteMapping
    @Operation(
        description = "Deletes the Account of the Logged In User",
        responses = [ApiResponse(
            description = "Account deleted with success",
            responseCode = "200",
            useReturnTypeSchema = true
        ), ApiResponse(description = "The Old Password is Wrong", responseCode = "401")]
    )
    fun deleteOwnAccount(
        @Valid @NotNull @RequestBody body: AccountDeleteDTO,
        authentication: AuthenticationToken
    ) = accountDeletionService.deleteAccount(body, authentication)

    /**
     * Implements F013
     *
     * Changes the password of an authenticated user.
     *
     * @param body Information required for changing the password (old password & new password)
     * @param authentication Authentication information of the authenticated user
     */
    @PostMapping("/pwchange")
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
    fun changePassword(@Valid @NotNull @RequestBody body: ChangePasswordDTO, authentication: AuthenticationToken) =
        accountService.changePassword(body, authentication)
}
