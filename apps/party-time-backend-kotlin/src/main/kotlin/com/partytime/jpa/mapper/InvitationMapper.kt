package com.partytime.jpa.mapper

import com.partytime.api.dto.event.AccountInvitationDetailsDTO
import com.partytime.api.dto.event.InvitationDetailsDTO
import com.partytime.api.dto.event.ParticipantEventDTO
import com.partytime.jpa.entity.Invitation

/**
 * Transforms an [Invitation] entity into a (serializable) [InvitationDetailsDTO]
 *
 * @receiver transformation subject
 * @return transformation result, ready for serialization and transmission to the client
 */
fun Invitation.toInvitationDTO(): InvitationDetailsDTO = InvitationDetailsDTO(
    id!!,
    status
)

/**
 * Transforms an [Invitation] entity into a (serializable) [ParticipantEventDTO]
 *
 * @receiver transformation subject
 * @return transformation result, ready for serialization and transmission to the client
 */
fun Invitation.toParticipantEventDTO(): ParticipantEventDTO = ParticipantEventDTO(
    toInvitationDTO(),
    event.toOrganizedEventDetailsDTO()
)

/**
 * Transforms an [Invitation] entity into a (serializable) [AccountInvitationDetailsDTO]
 *
 * @receiver transformation subject
 * @return transformation result, ready for serialization and transmission to the client
 */
fun Invitation.toAccountInvitationDTO(): AccountInvitationDetailsDTO = AccountInvitationDetailsDTO(
    id!!,
    status,
    account.toAccountDTO()
)
