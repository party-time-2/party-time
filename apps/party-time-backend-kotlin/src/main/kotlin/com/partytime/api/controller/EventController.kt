package com.partytime.api.controller

import com.partytime.api.dto.event.EventCreateDTO
import com.partytime.api.dto.event.EventDTO
import com.partytime.api.dto.event.ParticipantDTO
import com.partytime.configuration.security.AuthenticationToken
import com.partytime.jpa.entity.Event
import com.partytime.jpa.entity.EventParticipant
import com.partytime.jpa.mapper.toParticipantDTO
import com.partytime.jpa.mapper.toEventDTO
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

/**
 * Controller for Event related matters.
 *
 * @param eventService Service for managing event-organizing related matters (e.g. creating an event)
 * @constructor Constructs a new [EventController]
 */
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
        /** Tag information for OpenAPI documentation */
        const val TAG: String = "Event Host API"
    }

    /**
     * Implements F016
     *
     * Fetches event information of events organized by the user.
     *
     * @param authentication Authentication information of the event organizer
     */
    @GetMapping
    @Operation(
        description = "Get events wherever the authenticated user is the organizer",
        responses = [ApiResponse(description = "Data", responseCode = "200", useReturnTypeSchema = true)]
    )
    fun getEvents(authentication: AuthenticationToken): List<EventDTO> =
        eventService.getEvents(authentication.principal).map(Event::toEventDTO)

    /**
     * Implements F016
     *
     * Fetches event information of event organized by the user.
     *
     * @param eventId id of the event organized by the user
     * @param authentication Authentication information of the event organizer
     */
    @GetMapping("/{id}")
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
    ): EventDTO =
        eventService.getEvent(authentication.principal, eventId).toEventDTO()

    /**
     * Implements F006
     *
     * Fetches a participant list of an event organized by the user.
     *
     * @param eventId id of the event organized by the user
     * @param authentication Authentication information of the event organizer
     */
    @GetMapping("/{id}/participants")
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
        @Parameter(description = "The id of the event") @PathVariable("id") eventId: Long,
        authentication: AuthenticationToken
    ): List<ParticipantDTO> =
        eventService.getParticipants(eventId, authentication.principal).map(EventParticipant::toParticipantDTO)

    /**
     * Implements F004
     * Implements F007
     *
     * Invites an account to an event organized by the user.
     *
     * @param eventId id of the event organized by the user
     * @param email E-mail address of the account to be invited
     * @param authentication Authentication information of the event organizer
     */
    @PostMapping("/{id}/participants/{email}")
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
        @Parameter(description = "The id of the event") @PathVariable("id") eventId: Long,
        @Parameter(description = "The e-mail of the guest to invite") @PathVariable("email") email: String,
        authentication: AuthenticationToken
    ): List<ParticipantDTO> {
        eventService.inviteParticipant(eventId, email, authentication.principal)
        return eventService.getParticipants(eventId, authentication.principal).map(EventParticipant::toParticipantDTO)
    }

    /**
     * Implements F005
     *
     * Uninvites an account from an event organized by the user.
     *
     * @param eventId id of the event organized by the user
     * @param email E-mail address of the account to be uninvited
     * @param authentication Authentication information of the event organizer
     */
    @DeleteMapping("/{id}/participants/{email}")
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
        @Parameter(description = "The id of the event") @PathVariable("id") eventId: Long,
        @Parameter(description = "The e-mail of the guest to invite") @PathVariable("email") email: String,
        authentication: AuthenticationToken
    ): List<ParticipantDTO> {
        eventService.uninviteParticipant(eventId, email, authentication.principal)
        return eventService.getParticipants(eventId, authentication.principal).map(EventParticipant::toParticipantDTO)
    }

    /**
     * Implements F001
     *
     * Creates an event organized by the user.
     *
     * @param body Information about the event to be created
     * @param authentication Authentication information of the event organizer
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
        authentication: AuthenticationToken
    ): EventDTO =
        eventService.createEvent(body, authentication.principal).toEventDTO()

    /**
     * Implements F002
     *
     * Updates event information for an event organized by the user.
     *
     * @param body Information about the event to be updated. Must contain the eventId of a saved event.
     * @param authentication Authentication information of the event organizer
     */
    @PutMapping
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
        @RequestBody body: @NotNull @Valid EventDTO,
        authentication: AuthenticationToken
    ): EventDTO =
        eventService.updateEvent(body, authentication.principal).toEventDTO()

    /**
     * Implements F003
     *
     * Deletes an event organized by the user.
     *
     * @param eventId id of the to-be-canceled event organized by the user
     * @param authentication Authentication information of the event organizer
     */
    @DeleteMapping("/{id}")
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
        @Parameter(description = "The id of the event") @PathVariable("id") eventId: Long,
        authentication: AuthenticationToken
    ) {
        eventService.deleteEventById(eventId, authentication.principal)
    }
}
