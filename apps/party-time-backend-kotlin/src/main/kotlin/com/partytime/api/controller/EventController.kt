package com.partytime.api.controller

import com.partytime.api.dto.event.EventCreateDTO
import com.partytime.api.dto.event.EventDTO
import com.partytime.api.dto.event.ParticipantDTO
import com.partytime.configuration.security.TokenAuthentication
import com.partytime.jpa.entity.Event
import com.partytime.jpa.entity.EventParticipant
import com.partytime.jpa.mapper.map
import com.partytime.service.EventService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import jakarta.validation.constraints.NotNull
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/event")
@Validated
@Tag(
    name = EventController.TAG,
    description = "API endpoints providing all required logic for events"
)
class EventController (
    private val eventService: EventService
) {
    companion object {
        const val TAG: String = "Event Host API"
    }

    /**
     * Implements F016
     */
    @GetMapping
    @Operation(
        description = "Get events wherever the authenticated user is host ",
        responses = [ApiResponse(description = "Data", responseCode = "200", useReturnTypeSchema = true)]
    )
    fun getEvents(authentication: TokenAuthentication): List<EventDTO> =
        eventService.getEvents(authentication.principal.username).map(Event::map)

    /**
     * Implements F016
     */
    @GetMapping("/{id}")
    @Operation(
        description = "Get event by id if the authenticated user is host ",
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
        authentication: TokenAuthentication
    ): EventDTO =
        eventService.getEvent(authentication.principal.username, eventId).map()

    /**
     * Implements F006
     */
    @GetMapping("/{id}/participants")
    @Operation(
        description = "Get participants of given event if the authenticated user is host ",
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
        @Parameter(description = "The id of the event") @PathVariable("id") eventId: Long,
        authentication: TokenAuthentication
    ): List<ParticipantDTO> =
        eventService.getParticipants(eventId, authentication.principal.username).map(EventParticipant::map)

    /**
     * Implements F004
     * Implements F007
     */
    @PostMapping("/{id}/participants/{email}")
    @Operation(
        description = "Invite account to own event",
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
        @Parameter(description = "The id of the event") @PathVariable("id") eventId: Long,
        @Parameter(description = "The e-mail of the guest to invite") @PathVariable("email") email: String,
        authentication: TokenAuthentication
    ): List<ParticipantDTO> {
        eventService.inviteParticipant(eventId, email, authentication.principal.username)
        return eventService.getParticipants(eventId, authentication.principal.username).map(EventParticipant::map)
    }

    /**
     * Implements F005
     */
    @DeleteMapping("/{id}/participants/{email}")
    @Operation(
        description = "Cancel invitation of account to own event",
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
        @Parameter(description = "The id of the event") @PathVariable("id") eventId: Long,
        @Parameter(description = "The e-mail of the guest to invite") @PathVariable("email") email: String,
        authentication: TokenAuthentication
    ): List<ParticipantDTO> {
        eventService.uninviteParticipant(eventId, email, authentication.principal.username)
        return eventService.getParticipants(eventId, authentication.principal.username).map(EventParticipant::map)
    }

    /**
     * Implements F001
     */
    @PostMapping
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
        authentication: TokenAuthentication
    ): EventDTO =
        eventService.createEvent(body, authentication.principal.username).map()

    /**
     * Implements F002
     */
    @PutMapping
    @Operation(
        description = "Update own event if authenticated user is host",
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
        @RequestBody body: @NotNull @Valid EventDTO,
        authentication: TokenAuthentication
    ): EventDTO =
        eventService.updateEvent(body, authentication.principal.username).map()

    /**
     * Implements F003
     */
    @DeleteMapping("/{id}")
    @Operation(
        description = "Delete own event if authenticated user  is host",
        responses = [
            ApiResponse(
                description = "Event successfully created",
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
        @Parameter(description = "The id of the event") @PathVariable("id") eventId: Long,
        authentication: TokenAuthentication
    ) {
        eventService.deleteEventById(eventId, authentication.principal.username)
    }
}
