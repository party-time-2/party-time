package com.partytime.jpa.mapper;

import com.partytime.api.dto.event.ParticipantDTO;
import com.partytime.jpa.entity.EventParticipant;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class EventParticipantMapper {

    public static ParticipantDTO map(EventParticipant event) {
        return ParticipantDTO.builder()
            .account(AccountMapper.map(event.getAccount()))
            .status(event.getStatus())
            .build();
    }

}
