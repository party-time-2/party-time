package com.partytime.api.dto.event

import com.partytime.api.dto.account.AccountDTO
import com.partytime.jpa.entity.Status
import jakarta.validation.Valid
import jakarta.validation.constraints.Email

/**
 * Data container for creating invitations.
 *
 * @param email E-mail address of the invitee.
 */
data class InvitationCreateDTO(
    @field:Email
    val email: String
)

/**
 * Interface specifying the fields of InvitationDetails container
 */
sealed interface InvitationDetails {
    /** The invitationId */
    val id: Long

    /** The status of the invitation */
    val status: Status
}

/**
 * Implementation of [EventDetails], notably lacking any invitee information.
 */
data class InvitationDetailsDTO(
    override val id: Long,
    @field:Valid
    override val status: Status
): InvitationDetails

/**
 * Everything [InvitationDetails] entails + invitee information
 *
 * @param invitee The invitee of the invitation
 */
data class AccountInvitationDetailsDTO(
    override val id: Long,
    @field:Valid
    override val status: Status,
    @field:Valid
    val invitee: AccountDTO
): InvitationDetails
