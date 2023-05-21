package com.partytime.api.dto.event;

import com.partytime.api.dto.account.AccountDTO;
import com.partytime.api.dto.address.AddressDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventDTO {

    private Long id;
    private String name;
    private AccountDTO organizer;
    private LocalDateTime dateTime;
    private AddressDTO address;

}
