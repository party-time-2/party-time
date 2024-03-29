package com.partytime.api.dto.event;

import com.partytime.api.dto.address.AddressDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventCreateDTO {

    @NotNull
    @NotEmpty
    @Size(min = 5, max = 20)
    private String name;

    @NotNull
    @FutureOrPresent
    private LocalDateTime dateTime;

    @Valid
    @NotNull
    private AddressDTO address;

}
