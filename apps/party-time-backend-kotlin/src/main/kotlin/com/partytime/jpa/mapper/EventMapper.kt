package com.partytime.jpa.mapper

import com.partytime.api.dto.event.EventDTO
import com.partytime.api.dto.event.ParticipatingEventDTO
import com.partytime.jpa.entity.Event
import com.partytime.jpa.entity.EventParticipant

fun Event.map(): EventDTO = EventDTO(
    id!!,
    name,
    organizer.map(),
    dateTime,
    address.map(),
    eventParticipants.map(EventParticipant::map)
)

fun EventParticipant.mapParticipating(): ParticipatingEventDTO = ParticipatingEventDTO(
            event.id!!,
            event.name,
            event.organizer.map(),
            event.dateTime,
            event.address.map(),
            emptyList(),
            status
        )
