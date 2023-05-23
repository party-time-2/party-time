package com.partytime.api.dto.event;

import com.partytime.api.dto.account.AccountDTO;
import com.partytime.jpa.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParticipantDTO {

    private AccountDTO account;
    private Status status;

}
