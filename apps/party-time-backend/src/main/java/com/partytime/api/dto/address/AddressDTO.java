package com.partytime.api.dto.address;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDTO {

    @Size(min = 4, max = 25)
    private String addressLine;

    @Size(min = 5, max = 5)
    private String addressLineAddition;

    @NotNull
    @NotEmpty
    private String zip;

    @Size(min = 3, max = 20)

    @NotNull
    @NotEmpty
    private String city;

    @Size(min = 3, max = 20)

    @NotNull
    @NotEmpty
    private String country;

}
