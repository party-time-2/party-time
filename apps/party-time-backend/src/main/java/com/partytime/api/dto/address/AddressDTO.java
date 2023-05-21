package com.partytime.api.dto.address;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDTO {

    private String addressLine;
    private String zip;
    private String city;
    private String country;

}
