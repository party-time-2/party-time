package com.partytime.api.controller

import com.partytime.api.dto.event.AccountInvitationDetailsDTO
import com.partytime.api.dto.event.EventCreateDTO
import com.partytime.api.dto.event.EventDetailsDTO
import com.partytime.api.dto.event.InvitationCreateDTO
import com.partytime.api.dto.event.OrganizerEventDTO
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.jpa.entity.Event
import com.partytime.jpa.entity.Invitation
import com.partytime.jpa.mapper.toAccountInvitationDTO
import com.partytime.jpa.mapper.toEventDetailsDTO
import com.partytime.jpa.mapper.toOrganizerEventDTO
import com.partytime.service.OrganizerService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import jakarta.validation.constraints.NotNull
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Controller for event organization related matters.
 *
 * @param organizerService Service for managing event-organizing related matters (e.g. creating an event)
 * @constructor Constructs a new [OrganizerController]
 */
@RestController
@RequestMapping("/api/host")
@Validated
@Tag(
    name = OrganizerController.TAG,
    description = "API endpoints for event organizer"
)
class OrganizerController(
    private val organizerService: OrganizerService
) {
    companion object {
        /** Tag information for OpenAPI documentation */
        const val TAG: String = "Event Organizer API"
    }

    /**
     * Implements F016
     *
     * Fetches event information of events organized by the user.
     *
     * @param authentication Authentication information of the event organizer
     * @return List of Event information (missing Organizer name, since that's the authenticated user)
     */
    @GetMapping("/events")
    @Operation(
        description = "Get events wherever the authenticated user is the organizer",
        responses = [ApiResponse(description = "Data", responseCode = "200", useReturnTypeSchema = true)]
    )
    fun getEvents(authentication: AuthenticationToken): List<EventDetailsDTO> =
        organizerService.getEvents(authentication.principal).map(Event::toEventDetailsDTO)

    /**
     * Implements F016
     *
     * Fetches event information of event organized by the user.
     *
     * @param eventId id of the event organized by the user
     * @param authentication Authentication information of the event organizer
     * @return Details of a single Event (missing Organizer info, since that's the authenticated user)
     */
    @GetMapping("/event/{id}")
    @Operation(
        description = "Get event by id if the authenticated user is the organizer",
        responses = [
            ApiResponse(
                description = "Data",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            ApiResponse(
                description = "Not organizer",
                responseCode = "403"
            ), ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        ]
    )
    fun getEvent(
        @Parameter(description = "The id of the event") @PathVariable("id") eventId: Long,
        authentication: AuthenticationToken
    ): OrganizerEventDTO =
        organizerService.getEvent(authentication.principal, eventId).toOrganizerEventDTO()

    /**
     * Implements F001
     *
     * Creates an event organized by the user.
     *
     * @param body Information about the event to be created
     * @param authentication Authentication information of the event organizer
     * @return Details about the newly created event (missing Organizer info, since that's the authenticated user)
     */
    @PostMapping("/event")
    @Operation(
        description = "Create an event as authenticated user",
        responses = [
            ApiResponse(
                description = "Event successfully created",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            ApiResponse(
                description = "Event creation failed",
                responseCode = "400"
            )
        ]
    )
    fun createEvent(
        @RequestBody body: @NotNull @Valid EventCreateDTO,
        authentication: AuthenticationToken
    ): OrganizerEventDTO =
        organizerService.createEvent(body, authentication.principal).toOrganizerEventDTO()

    /**
     * Implements F002
     *
     * Updates event information for an event organized by the user.
     *
     * @param body Information about the event to be updated. Must contain the eventId of a saved event.
     * @param authentication Authentication information of the event organizer
     * @return Details about the updated event (missing Organizer info, since that's the authenticated user)
     */
    @PatchMapping("/event")
    @Operation(
        description = "Update own event if the authenticated user is the organizer",
        responses = [
            ApiResponse(
                description = "Event successfully updated",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            ApiResponse(
                description = "Event update failed",
                responseCode = "400"
            ),
            ApiResponse(
                description = "Not organizer",
                responseCode = "403"
            ),
            ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        ]
    )
    fun updateEvent(
        @RequestBody body: @NotNull @Valid EventDetailsDTO,
        authentication: AuthenticationToken
    ): OrganizerEventDTO =
        organizerService.updateEvent(body, authentication.principal).toOrganizerEventDTO()


    /**
     * Implements F003
     *
     * Deletes an event organized by the user.
     *
     * @param eventId id of the to-be-canceled event organized by the user
     * @param authentication Authentication information of the event organizer
     */
    @DeleteMapping("/event/{eventId}")
    @Operation(
        description = "Delete own event if the authenticated user is the organizer",
        responses = [
            ApiResponse(
                description = "Event successfully deleted",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            ApiResponse(
                description = "Event deletion failed",
                responseCode = "400"
            ),
            ApiResponse(
                description = "Not organizer",
                responseCode = "403"
            ),
            ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        ]
    )
    fun deleteEvent(
        @Parameter(description = "The id of the event") @PathVariable("eventId") eventId: Long,
        authentication: AuthenticationToken
    ) {
        organizerService.deleteEventById(eventId, authentication.principal)
    }



    /**
     * Implements F006
     *
     * Fetches an invitation list of an event organized by the user.
     *
     * @param eventId id of the event organized by the user
     * @param authentication Authentication information of the event organizer
     * @return List of invites of a specific event
     */
    @GetMapping("/event/{eventId}/participants")
    @Operation(
        description = "Get participants of given event if the authenticated user is the organizer",
        responses = [
            ApiResponse(
                description = "Data",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            ApiResponse(
                description = "Not organizer",
                responseCode = "403"
            ),
            ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        ]
    )
    fun getParticipants(
        @Parameter(description = "The id of the event") @PathVariable("eventId") eventId: Long,
        authentication: AuthenticationToken
    ): List<AccountInvitationDetailsDTO> =
        organizerService.getParticipants(eventId, authentication.principal).map(Invitation::toAccountInvitationDTO)

    /**
     * Implements F004
     * Implements F007
     *
     * Invites an account to an event organized by the user.
     *
     * @param eventId id of the event organized by the user
     * @param body E-mail address container with e-mail of the invitee account
     * @param authentication Authentication information of the event organizer
     * @return List of all event invitees after the new invitee has been invited
     */
    @PostMapping("/event/{eventId}/participants")
    @Operation(
        description = "Invite account if the authenticated user is the organizer",
        responses = [
            ApiResponse(
                description = "Invitation e-mail sent",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            ApiResponse(
                description = "Invitation failed",
                responseCode = "400"
            ),
            ApiResponse(
                description = "Not organizer",
                responseCode = "403"
            ),
            ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        ]
    )
    fun inviteParticipant(
        @Parameter(description = "The id of the event") @PathVariable("eventId") eventId: Long,
        @RequestBody body: @NotNull @Valid InvitationCreateDTO,
        authentication: AuthenticationToken
    ): List<AccountInvitationDetailsDTO> {
        organizerService.inviteParticipant(eventId, body, authentication.principal)
        return organizerService.getParticipants(eventId, authentication.principal).map(Invitation::toAccountInvitationDTO)
    }

    /**
     * Implements F005
     *
     * Uninvites an account from an event organized by the user.
     *
     * @param eventId id of the event organized by the user
     * @param inviteId id of the invitation whose account should be uninvited
     * @param authentication Authentication information of the event organizer
     * @return List of all event invitees after the previous invitee has been uninvited
     */
    @DeleteMapping("/event/{eventId}/participants/{inviteId}")
    @Operation(
        description = "Cancel invitation of account to own event if the authenticated user is the organizer",
        responses = [
            ApiResponse(
                description = "Account uninvited",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            ApiResponse(
                description = "Uninvite failed",
                responseCode = "400"
            ),
            ApiResponse(
                description = "Not organizer",
                responseCode = "403"
            ),
            ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        ]
    )
    fun uninviteParticipant(
        @Parameter(description = "The id of the event") @PathVariable("eventId") eventId: Long,
        @Parameter(description = "The id of the invitation") @PathVariable("inviteId") inviteId: Long,
        authentication: AuthenticationToken
    ): List<AccountInvitationDetailsDTO> {
        organizerService.uninviteParticipant(eventId, inviteId, authentication.principal)
        return organizerService.getParticipants(eventId, authentication.principal).map(Invitation::toAccountInvitationDTO)
    }
}
