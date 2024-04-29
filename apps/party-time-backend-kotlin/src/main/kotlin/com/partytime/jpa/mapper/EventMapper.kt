package com.partytime.jpa.mapper

import com.partytime.api.dto.event.EventDetailsDTO
import com.partytime.api.dto.event.OrganizedEventDetailsDTO
import com.partytime.api.dto.event.OrganizerEventDTO
import com.partytime.jpa.entity.Account
import com.partytime.jpa.entity.Event
import com.partytime.jpa.entity.Invitation
import com.partytime.mail.model.EventData
import com.partytime.mail.model.IcsEventData
import java.time.LocalDateTime
import java.util.UUID

/**
 * Transforms an [Event] entity into a (serializable) [EventDetailsDTO]
 *
 * @receiver transformation subject
 * @return transformation result, ready for serialization and transmission to the client
 */
fun Event.toEventDetailsDTO(): EventDetailsDTO = EventDetailsDTO(
    id!!,
    name,
    dateTime,
    address.toAddressDTO()
)

/**
 * Transforms an [Event] entity into a (serializable) [OrganizedEventDetailsDTO]
 *
 * @receiver transformation subject
 * @return transformation result, ready for serialization and transmission to the client
 */
fun Event.toOrganizedEventDetailsDTO(): OrganizedEventDetailsDTO = OrganizedEventDetailsDTO(
    id!!,
    name,
    dateTime,
    address.toAddressDTO(),
    organizer.toAccountDTO()
)


/**
 * Transforms an [Event] entity into a (serializable) [OrganizerEventDTO]
 *
 * @receiver transformation subject
 * @return transformation result, ready for serialization and transmission to the client
 */
fun Event.toOrganizerEventDTO(): OrganizerEventDTO = OrganizerEventDTO(
    invitations.map(Invitation::toAccountInvitationDTO),
    toEventDetailsDTO()
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
