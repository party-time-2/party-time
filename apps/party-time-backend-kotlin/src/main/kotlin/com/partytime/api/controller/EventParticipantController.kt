package com.partytime.api.controller

import com.partytime.api.dto.event.ParticipatingEventDTO
import com.partytime.configuration.security.TokenAuthentication
import com.partytime.jpa.entity.EventParticipant
import com.partytime.jpa.mapper.mapParticipating
import com.partytime.service.EventService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.constraints.NotNull
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/event/participants")
@Validated
@Tag(
    name = EventParticipantController.TAG,
    description = "API endpoints providing all required logic for event participants"
)
class EventParticipantController @Autowired constructor(
    private val eventService: EventService
) {
    companion object {
        const val TAG: String = "Event Participants API"
    }

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
    fun getEvents(authentication: TokenAuthentication): List<ParticipatingEventDTO> =
        eventService.getParticipatingEvents(authentication.principal.username).map(EventParticipant::mapParticipating)

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
        authentication: TokenAuthentication
    ): ParticipatingEventDTO =
        eventService.getParticipatingEvent(event, authentication.principal.username).mapParticipating()

    /**
     * Implements F008
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
        authentication: TokenAuthentication
    ) {
        eventService.acceptInvitation(event, authentication.principal.username)
    }

    /**
     * Implements F009
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
        authentication: TokenAuthentication
    ) {
        eventService.declineInvitation(event, authentication.principal.username)
    }
}
