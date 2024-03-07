package com.partytime.api.controller

import com.partytime.api.dto.event.ParticipantEventDTO
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.jpa.entity.Invitation
import com.partytime.jpa.mapper.toParticipantEventDTO
import com.partytime.service.ParticipantService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.constraints.NotNull
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Controller for event participation related matters.
 *
 * @param participantService Service for managing event participation related matters (e.g. accepting invites)
 * @constructor Constructs a new [ParticipantController]
 */
@RestController
@RequestMapping("/api/participant")
@Validated
@Tag(
    name = ParticipantController.TAG,
    description = "API endpoints providing all required logic for event participants"
)
class ParticipantController (
    private val participantService: ParticipantService
) {
    companion object {
        /** Tag information for OpenAPI documentation */
        const val TAG: String = "Event Participant API"
    }

    /**
     * Fetches all events an authenticated user has a participation status for.
     *
     * @param authentication Authentication information of the user requesting the events they've a participation status for
     * @return List of [ParticipantEventDTO] containing information about the events invited in.
     */
    @GetMapping("/events")
    @Operation(
        description = "Get all participating events",
        responses = [
            ApiResponse(
                description = "Event data",
                responseCode = "200",
                useReturnTypeSchema = true
            )
        ]
    )
    fun getEvents(authentication: AuthenticationToken): List<ParticipantEventDTO> =
        participantService.getParticipatingEvents(authentication.principal).map(Invitation::toParticipantEventDTO)

    /**
     * Fetches details of a single event the authenticated user has been invited to.
     *
     * @param eventId id of the event for which to fetch details
     * @param authentication Authentication details of the user requesting event details
     * @return Details about a single the authenticated user has been invited to
     */
    @GetMapping("/event/{eventId}")
    @Operation(
        description = "Get a single participating event",
        responses = [
            ApiResponse(
                description = "Event data",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        ]
    )
    fun getEvent(
        @PathVariable("eventId") eventId: @NotNull Long,
        authentication: AuthenticationToken
    ): ParticipantEventDTO =
        participantService.getInvitation(eventId, authentication.principal).toParticipantEventDTO()

    /**
     * Implements F008
     *
     * Handles accepting an event invitation.
     *
     * @param eventId id of the event for which to accept an invitation
     * @param authentication Authentication details of the user accepting an event invitation
     */
    @PostMapping("/event/{eventId}/invitation/accept")
    @Operation(
        description = "Accept invitation for an event",
        responses = [
            ApiResponse(
                description = "Event invitation accepted",
                responseCode = "200"
            ),
            ApiResponse(
                description = "Invitation accept failed",
                responseCode = "400"
            ),
            ApiResponse(
                description = "Not invited",
                responseCode = "403"
            ),
            ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        ]
    )
    fun acceptInvitation(
        @PathVariable("eventId") eventId: @NotNull Long,
        authentication: AuthenticationToken
    ) {
        participantService.acceptInvitation(eventId, authentication.principal)
    }

    /**
     * Implements F009
     *
     * Handles declining an event invitation.
     *
     * @param eventId id of the event for which to decline an invitation
     * @param authentication Authentication details of the user declining an event invitation
     */
    @PostMapping("/event/{eventId}/invitation/decline")
    @Operation(
        description = "Decline invitation for an event",
        responses = [
            ApiResponse(
                description = "Event invitation declined",
                responseCode = "200"
            ),
            ApiResponse(
                description = "Invitation decline failed",
                responseCode = "400"
            ),
            ApiResponse(
                description = "Not invited",
                responseCode = "403"
            ),
            ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        ]
    )
    fun declineInvitation(
        @PathVariable("eventId") eventId: @NotNull Long,
        authentication: AuthenticationToken
    ) {
        participantService.declineInvitation(eventId, authentication.principal)
    }
}
