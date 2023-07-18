package com.partytime.api.dto.event;

import com.partytime.api.dto.account.AccountDTO;
import com.partytime.api.dto.address.AddressDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventDTO {

    @NotNull
    private Long id;

    @NotNull
    @NotEmpty
    @Size(min = 5, max = 20)
    private String name;

    @NotNull
    @Valid
    private AccountDTO organizer;

    @NotNull
    @FutureOrPresent
    private LocalDateTime dateTime;

    @NotNull
    @Valid
    private AddressDTO address;

    private List<ParticipantDTO> participants;

}
