package com.partytime.api.dto.address;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDTO {

    @NotNull
    @NotEmpty
    private String addressLine;
    private String addressLineAddition;

    @NotNull
    @NotEmpty
    private String zip;

    @NotNull
    @NotEmpty
    private String city;

    @NotNull
    @NotEmpty
    private String country;

}
