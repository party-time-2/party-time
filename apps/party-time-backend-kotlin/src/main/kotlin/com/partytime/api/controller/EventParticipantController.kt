package com.partytime.api.controller

import com.partytime.api.dto.event.ParticipatingEventDTO
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.jpa.entity.EventParticipant
import com.partytime.jpa.mapper.toParticipatingEventDTO
import com.partytime.service.EventService
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
 * Controller for Event participant related matters.
 *
 * @param eventService Service for managing event related matters (e.g. accepting invites)
 * @constructor Constructs a new [EventParticipantController]
 */
@RestController
@RequestMapping("/api/event/participants")
@Validated
@Tag(
    name = EventParticipantController.TAG,
    description = "API endpoints providing all required logic for event participants"
)
class EventParticipantController (
    private val eventService: EventService
) {
    companion object {
        /** Tag information for OpenAPI documentation */
        const val TAG: String = "Event Participants API"
    }

    /**
     * Fetches all events an authenticated user has a participation status for.
     *
     * @param authentication Authentication information of the user requesting the events they've a participation status for
     * @return List of [ParticipatingEventDTO] containing information about the events participated in.
     */
    @GetMapping
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
    fun getEvents(authentication: AuthenticationToken): List<ParticipatingEventDTO> =
        eventService.getParticipatingEvents(authentication.principal).map(EventParticipant::toParticipatingEventDTO)

    /**
     * Fetches details of a single event.
     *
     * @param event id of the event for which to fetch details
     * @param authentication Authentication details of the user requesting event details
     */
    @GetMapping("/{event}")
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
        @PathVariable("event") event: @NotNull Long,
        authentication: AuthenticationToken
    ): ParticipatingEventDTO =
        eventService.getParticipatingEvent(event, authentication.principal).toParticipatingEventDTO()

    /**
     * Implements F008
     *
     * Handles accepting an event invitation.
     *
     * @param event id of the event for which to accept an invitation
     * @param authentication Authentication details of the user accepting an event invitation
     */
    @PostMapping("/{event}/invitation/accept")
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
        @PathVariable("event") event: @NotNull Long,
        authentication: AuthenticationToken
    ) {
        eventService.acceptInvitation(event, authentication.principal)
    }

    /**
     * Implements F009
     *
     * Handles declining an event invitation.
     *
     * @param event id of the event for which to decline an invitation
     * @param authentication Authentication details of the user declining an event invitation
     */
    @PostMapping("/{event}/invitation/decline")
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
        @PathVariable("event") event: @NotNull Long,
        authentication: AuthenticationToken
    ) {
        eventService.declineInvitation(event, authentication.principal)
    }
}
