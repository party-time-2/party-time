package com.partytime.api.dto.event;

import com.partytime.api.dto.account.AccountDTO;
import com.partytime.api.dto.address.AddressDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
    @Positive
    private Long id;

    @NotNull
    @NotEmpty
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
