package com.partytime.api.controller;

import com.partytime.api.dto.event.EventCreateDTO;
import com.partytime.api.dto.event.EventDTO;
import com.partytime.api.dto.event.ParticipantDTO;
import com.partytime.configuration.security.TokenAuthentication;
import com.partytime.jpa.mapper.EventMapper;
import com.partytime.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

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

    private final EventService eventService;

    /**
     * Implements F016
     */
    @GetMapping
    @Operation(
        description = "Get events wherever the authenticated user is host ",
        responses = {
            @ApiResponse(
                description = "Data",
                responseCode = "200",
                useReturnTypeSchema = true
            )
        }
    )
    public List<EventDTO> getEvents(TokenAuthentication authentication) {
        return eventService.getEvents(authentication.getPrincipal().getUsername()).stream()
            .map(EventMapper::map)
            .toList();
    }

    @GetMapping("/{id}")
    @Operation(
        description = "Get event by id if the authenticated user is host ",
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
    public EventDTO getEvent(@Parameter(description = "The id of the event") @PathVariable("id") Long eventId,
                             TokenAuthentication authentication) {
        return EventMapper.map(eventService.getEvent(authentication.getPrincipal().getUsername(), eventId));
    }

    /**
     * Implements F006
     */
    @GetMapping("/{id}/participants")
    @Operation(
        description = "Get participants of given event if the authenticated user is host ",
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
    public List<ParticipantDTO> getParticipants(@Parameter(description = "The id of the event") @PathVariable("id") Long eventId,
                                                TokenAuthentication authentication) {
        return Collections.emptyList(); // TODO Implementation
    }


    /**
     * Implements F004
     */
    @PostMapping("/{id}/participants/{email}")
    @Operation(
        description = "Invite account to own event",
        responses = {
            @ApiResponse(
                description = "Invitation e-mail sent",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            @ApiResponse(
                description = "Invitation failed",
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
    public void inviteParticipant(@Parameter(description = "The id of the event") @PathVariable("id") Long eventId,
                                  @Parameter(description = "The e-mail of the guest to invite") @PathVariable("email") String email,
                                  TokenAuthentication authentication) {
        // TODO Implementation
    }

    /**
     * Implements F005
     */
    @DeleteMapping("/{id}/participants/{email}")
    @Operation(
        description = "Cancel invitation of account to own event",
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
                description = "Not organizer",
                responseCode = "403"
            ),
            @ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        }
    )
    public void uninviteParticipant(@Parameter(description = "The id of the event") @PathVariable("id") Long eventId,
                                    @Parameter(description = "The e-mail of the guest to invite") @PathVariable("email") String email,
                                    TokenAuthentication authentication) {
        // TODO Implementation
    }

    /**
     * Implements F001
     */
    @PostMapping
    @Operation(
        description = "Create an event as  authenticated user",
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
        return EventMapper.map(
            eventService.createEvent(body, authentication.getPrincipal().getUsername())
        );
    }

    /**
     * Implements F002
     */
    @PutMapping
    @Operation(
        description = "Update own event if authenticated user is host",
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
                description = "Not organizer",
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
        return EventMapper.map(
            eventService.updateEvent(body, authentication.getPrincipal().getUsername())
        );
    }

    /**
     * Implements F003
     */
    @DeleteMapping("/{id}")
    @Operation(
        description = "Delete own event if authenticated user  is host",
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
