package com.partytime.api.dto.event

import com.partytime.api.dto.account.AccountDTO
import com.partytime.api.dto.address.AddressDTO
import jakarta.validation.Valid
import jakarta.validation.constraints.FutureOrPresent
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Size
import java.time.LocalDateTime

/**
 * Data container for creating new events.
 *
 * @param name The name of the new event
 * @param dateTime The date and time of the new event
 * @param address The address of the new event
 */
data class EventCreateDTO(
    @field:NotEmpty
    @field:Size(min = 5, max = 20)
    val name: String,
    @field:FutureOrPresent
    val dateTime: LocalDateTime,
    @field:Valid
    val address: AddressDTO
)

/**
 * Interface specifying the fields of EventDetails container
 */
sealed interface EventDetails {
    /** The eventId */
    val id: Long
    /** The name of the event */
    val name: String
    /** The date and time of the event */
    val dateTime: LocalDateTime
    /** The address of the event */
    val address: AddressDTO
}

/**
 * Implementation of [EventDetails], notably lacking any organizer information.
 */
data class EventDetailsDTO(
    override val id: Long,
    @field:NotEmpty
    @field:Size(min = 5, max=20)
    override val name: String,
    @field:FutureOrPresent
    override val dateTime: LocalDateTime,
    @field:Valid
    override val address: AddressDTO
) : EventDetails

/**
 * Everything [EventDetails] entails + organizer information
 *
 * @param organizer The organizer of the event
 */
data class OrganizedEventDetailsDTO(
    override val id: Long,
    @field:NotEmpty
    @field:Size(min = 5, max=20)
    override val name: String,
    @field:Valid
    @field:FutureOrPresent
    override val dateTime: LocalDateTime,
    @field:Valid
    override val address: AddressDTO,
    @field:Valid
    val organizer: AccountDTO
): EventDetails


/**
 * Combination of invitation details (no info who got invited, just status) and event details (including organizer)
 *
 * @param invitationDetailsDTO Information about the invitation status, without any account information
 * @param organizedEventDetailsDTO Information about the event, with organizer information
 */
data class ParticipantEventDTO(
    val invitationDetailsDTO: InvitationDetailsDTO,
    val organizedEventDetailsDTO: OrganizedEventDetailsDTO
)

/**
 * Combination of invitation details (who got invited and just status) and event details (no organizer account)
 *
 * @param accountInvitationDetailsDTO Information about the invitation status of participants, with account information
 * @param eventDetailsDTO Information about the event, without organizer information
 */
data class OrganizerEventDTO(
    val accountInvitationDetailsDTO: List<AccountInvitationDetailsDTO>,
    val eventDetailsDTO: EventDetailsDTO
)
