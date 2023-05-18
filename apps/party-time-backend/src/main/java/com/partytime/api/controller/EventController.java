package com.partytime.api.controller;

import com.partytime.api.dto.event.EventCreateDTO;
import com.partytime.api.dto.event.EventDTO;
import com.partytime.api.dto.event.ParticipantDTO;
import com.partytime.configuration.security.TokenAuthentication;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/event")
@Validated
@RequiredArgsConstructor
@Tag(
    name = EventController.TAG,
    description = "API endpoints providing all required logic for events"
)
public class EventController {
    static final String TAG = "Event API";

    /**
     * Implements F016
     */
    @GetMapping
    @Operation(
        description = "Get events of the logged in user where it is organizer",
        responses = {
            @ApiResponse(
                description = "Data",
                responseCode = "200",
                useReturnTypeSchema = true
            )
        }
    )
    public Page<EventDTO> getEvents(TokenAuthentication authentication) {
        return Page.empty(); // TODO Implementation
    }

    /**
     * Implements F006
     */
    @GetMapping("/{id}/participants")
    @Operation(
        description = "Get participants of given event",
        responses = {
            @ApiResponse(
                description = "Data",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            @ApiResponse(
                description = "Not organizer",
                responseCode = "403"
            ),
            @ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        }
    )
    public Page<ParticipantDTO> getParticipants(@Parameter(description = "The Id of the Event") @PathVariable("id") Long eventId,
                                                TokenAuthentication authentication) {
        return Page.empty(); // TODO Implementation
    }

    /**
     * Implements F004
     */
    @PostMapping("/{id}/participants/{email}")
    @Operation(
        description = "Invite Account to Event",
        responses = {
            @ApiResponse(
                description = "Invitation Mail sent",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            @ApiResponse(
                description = "Invitation failed",
                responseCode = "400"
            ),
            @ApiResponse(
                description = "Not Organizer",
                responseCode = "403"
            ),
            @ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        }
    )
    public void inviteParticipant(@Parameter(description = "The Id of the Event") @PathVariable("id") Long eventId,
                                  @Parameter(description = "The Email of the Guest to invite") @PathVariable("email") String email,
                                  TokenAuthentication authentication) {
        // TODO Implementation
    }

    /**
     * Implements F005
     */
    @DeleteMapping("/{id}/participants/{email}")
    @Operation(
        description = "Uninvite Account to Event",
        responses = {
            @ApiResponse(
                description = "Account uninvited",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            @ApiResponse(
                description = "Uninvite failed",
                responseCode = "400"
            ),
            @ApiResponse(
                description = "Not Organizer",
                responseCode = "403"
            ),
            @ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        }
    )
    public void uninviteParticipant(@Parameter(description = "The Id of the Event") @PathVariable("id") Long eventId,
                                    @Parameter(description = "The Email of the Guest to invite") @PathVariable("email") String email,
                                    TokenAuthentication authentication) {
        // TODO Implementation
    }

    /**
     * Implements F001
     */
    @PostMapping
    @Operation(
        description = "Create an Event as logged in User",
        responses = {
            @ApiResponse(
                description = "Event successfully created",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            @ApiResponse(
                description = "Event creation failed",
                responseCode = "400"
            )
        }
    )
    public EventDTO createEvent(@RequestBody @NotNull @Valid EventCreateDTO body,
                                TokenAuthentication authentication) {
        return null; // TODO Implementation
    }

    /**
     * Implements F002
     */
    @PutMapping
    @Operation(
        description = "Update an Event as logged in User",
        responses = {
            @ApiResponse(
                description = "Event successfully updated",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            @ApiResponse(
                description = "Event update failed",
                responseCode = "400"
            ),
            @ApiResponse(
                description = "Not Organizer",
                responseCode = "403"
            ),
            @ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        }
    )
    public EventDTO updateEvent(@RequestBody @NotNull @Valid EventDTO body,
                                TokenAuthentication authentication) {
        return body; // TODO Implementation
    }

    /**
     * Implements F003
     */
    @DeleteMapping("/{id}")
    @Operation(
        description = "Delete an Event as logged in User",
        responses = {
            @ApiResponse(
                description = "Event successfully created",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            @ApiResponse(
                description = "Event deletion failed",
                responseCode = "400"
            ),
            @ApiResponse(
                description = "Not organizer",
                responseCode = "403"
            ),
            @ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        }
    )
    public void deleteEvent(@Parameter(description = "The id of the event") @PathVariable("id") Long eventId,
                            TokenAuthentication authentication) {
        // TODO Implementation
    }

}
