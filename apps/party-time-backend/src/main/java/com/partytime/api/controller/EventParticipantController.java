package com.partytime.api.controller;

import com.partytime.configuration.security.TokenAuthentication;
import com.partytime.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/event/{event}/participants")
@Validated
@RequiredArgsConstructor
@Tag(
    name = EventParticipantController.TAG,
    description = "API endpoints providing all required logic for event participants"
)
public class EventParticipantController {
    static final String TAG = "Event Participants API";

    private final EventService eventService;

    /**
     * Implements F008
     */
    @PostMapping("/invitation/accept")
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
    @PostMapping("/invitation/decline")
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
