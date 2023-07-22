package com.partytime.jpa.mapper;

import com.partytime.api.dto.event.EventDTO;
import com.partytime.jpa.entity.Event;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.Optional;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class EventMapper {

    public static EventDTO map(Event event) {
        return EventDTO.builder()
            .id(event.getId())
            .name(event.getName())
            .organizer(AccountMapper.map(event.getOrganizer()))
            .dateTime(event.getDateTime())
            .address(AddressMapper.map(event.getAddress()))
            .participants(Optional.ofNullable(event.getEventParticipants())
                .orElse(Collections.emptyList()).stream()
                .map(EventParticipantMapper::map)
                .toList())
            .build();
    }

    public static EventDTO mapParticipating(Event event) {
        return EventDTO.builder()
            .id(event.getId())
            .name(event.getName())
            .organizer(AccountMapper.map(event.getOrganizer()))
            .dateTime(event.getDateTime())
            .address(AddressMapper.map(event.getAddress()))
            .build();
    }

}
