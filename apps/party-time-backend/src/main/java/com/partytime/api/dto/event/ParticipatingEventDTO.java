package com.partytime.api.dto.event;

import com.partytime.jpa.entity.Status;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ParticipatingEventDTO extends EventDTO {

    private Status participatingStatus;

}
