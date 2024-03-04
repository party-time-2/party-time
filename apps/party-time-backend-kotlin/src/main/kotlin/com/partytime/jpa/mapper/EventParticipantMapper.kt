package com.partytime.jpa.mapper

import com.partytime.api.dto.event.ParticipantDTO
import com.partytime.api.dto.event.ParticipatingEventDTO
import com.partytime.jpa.entity.EventParticipant

/**
 * Transforms an [EventParticipant] entity into a (serializable) [ParticipantDTO]
 *
 * @receiver transformation subject
 * @return transformation result, ready for serialization and transmission to the client
 */
fun EventParticipant.toParticipantDTO(): ParticipantDTO = ParticipantDTO(
    account.toAccountDTO(),
    status
)

/**
 * Transforms an [EventParticipant] entity into a (serializable) [ParticipatingEventDTO]
 *
 * @receiver transformation subject
 * @return transformation result, ready for serialization and transmission to the client
 */
fun EventParticipant.toParticipatingEventDTO(): ParticipatingEventDTO = ParticipatingEventDTO(
    event.id!!,
    event.name,
    event.organizer.toAccountDTO(),
    event.dateTime,
    event.address.toAddressDTO(),
    emptyList(),
    status
)
