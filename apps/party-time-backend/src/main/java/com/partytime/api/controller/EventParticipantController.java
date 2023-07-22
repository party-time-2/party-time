package com.partytime.api.controller;

import com.partytime.api.dto.event.EventDTO;
import com.partytime.api.dto.event.ParticipatingEventDTO;
import com.partytime.configuration.security.TokenAuthentication;
import com.partytime.jpa.mapper.EventMapper;
import com.partytime.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/event/participants")
@Validated
@RequiredArgsConstructor
@Tag(
    name = EventParticipantController.TAG,
    description = "API endpoints providing all required logic for event participants"
)
public class EventParticipantController {
    static final String TAG = "Event Participants API";

    private final EventService eventService;

    @GetMapping
    @Operation(
        description = "Get all participating events",
        responses = {
            @ApiResponse(
                description = "Event data",
                responseCode = "200",
                useReturnTypeSchema = true
            )
        }
    )
    public List<ParticipatingEventDTO> getEvents(TokenAuthentication authentication) {
        return eventService.getParticipatingEvents(authentication.getPrincipal().getUsername()).stream()
            .map(EventMapper::mapParticipating)
            .toList();
    }

    @GetMapping("/{event}")
    @Operation(
        description = "Get a single participating event",
        responses = {
            @ApiResponse(
                description = "Event data",
                responseCode = "200",
                useReturnTypeSchema = true
            ),
            @ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        }
    )
    public ParticipatingEventDTO getEvent(@PathVariable("event") @NotNull Long event,
                             TokenAuthentication authentication) {
        return EventMapper.mapParticipating(eventService.getParticipatingEvent(event, authentication.getPrincipal().getUsername()));
    }

    /**
     * Implements F008
     */
    @PostMapping("/{event}/invitation/accept")
    @Operation(
        description = "Accept invitation for an event",
        responses = {
            @ApiResponse(
                description = "Event invitation accepted",
                responseCode = "200"
            ),
            @ApiResponse(
                description = "Invitation accept failed",
                responseCode = "400"
            ),
            @ApiResponse(
                description = "Not invited",
                responseCode = "403"
            ),
            @ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        }
    )
    public void acceptInvitation(@PathVariable("event") @NotNull Long event,
                                 TokenAuthentication authentication) {
        eventService.acceptInvitation(event, authentication.getPrincipal().getUsername());
    }

    /**
     * Implements F009
     */
    @PostMapping("/{event}/invitation/decline")
    @Operation(
        description = "Decline invitation for an event",
        responses = {
            @ApiResponse(
                description = "Event invitation declined",
                responseCode = "200"
            ),
            @ApiResponse(
                description = "Invitation decline failed",
                responseCode = "400"
            ),
            @ApiResponse(
                description = "Not invited",
                responseCode = "403"
            ),
            @ApiResponse(
                description = "Event not found",
                responseCode = "404"
            )
        }
    )
    public void declineInvitation(@PathVariable("event") @NotNull Long event,
                                 TokenAuthentication authentication) {
        eventService.declineInvitation(event, authentication.getPrincipal().getUsername());
    }

}
