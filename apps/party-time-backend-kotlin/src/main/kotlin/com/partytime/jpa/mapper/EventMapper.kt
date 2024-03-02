package com.partytime.jpa.mapper

import com.partytime.api.dto.event.EventDTO
import com.partytime.jpa.entity.Account
import com.partytime.jpa.entity.Event
import com.partytime.jpa.entity.EventParticipant
import com.partytime.mail.model.EventData
import com.partytime.mail.model.IcsEventData
import java.time.LocalDateTime
import java.util.UUID

/**
 * Transforms an [Event] entity into a (serializable) [EventDTO]
 *
 * @receiver transformation subject
 * @return transformation result, ready for serialization and transmission to the client
 */
fun Event.toEventDTO(): EventDTO = EventDTO(
    id!!,
    name,
    organizer.toAccountDTO(),
    dateTime,
    address.toAddressDTO(),
    eventParticipants.map(EventParticipant::toParticipantDTO)
)

/**
 * Implements F019
 *
 * Transforms an [Event] entity into [IcsEventData], to be rendered by mustache into an attachable ICS event
 *
 * @receiver transformation subject
 * @return transformation result, ready for mustache-rendering
 */
fun Event.toIcsEventData(url: String): IcsEventData {
    val organizer: Account = organizer
    return IcsEventData(
        EventData(
            organizer.name,
            name,
            address.toMultiLineString(),
            formatTimestamp(dateTime)
        ),
        url,
        formatTimestamp(LocalDateTime.now()),
        organizer.email,
        UUID.randomUUID().toString().replace("-", "")
    )
}

private fun formatTimestamp(ts: LocalDateTime): String =
    "${ts.year}${ts.monthValue}${ts.dayOfMonth}T${ts.hour}${ts.minute}${ts.second}Z"
