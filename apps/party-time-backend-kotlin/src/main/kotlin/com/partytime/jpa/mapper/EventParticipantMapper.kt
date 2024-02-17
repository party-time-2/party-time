package com.partytime.jpa.mapper

import com.partytime.api.dto.event.ParticipantDTO
import com.partytime.jpa.entity.EventParticipant

fun EventParticipant.map(): ParticipantDTO = ParticipantDTO(
    account.map(),
    status
)
