package com.partytime.jpa.mapper;

import com.partytime.api.dto.address.AddressDTO;
import com.partytime.jpa.entity.Address;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class AddressMapper {

    public static AddressDTO map(Address address) {
        return AddressDTO.builder()
            .addressLine(address.getAddressLine())
            .addressLineAddition(address.getAddressLineAddition())
            .zip(address.getZip())
            .city(address.getCity())
            .country(address.getCountry())
            .build();
    }

    public static Address map(AddressDTO address) {
        return Address.builder()
            .addressLine(address.getAddressLine())
            .addressLineAddition(address.getAddressLineAddition())
            .zip(address.getZip())
            .city(address.getCity())
            .country(address.getCountry())
            .build();
    }

    public static Address create(String addressLine,
                                 String addressLineAddition,
                                 String zip,
                                 String city,
                                 String country) {
        return Address.builder()
            .addressLine(addressLine)
            .addressLineAddition(addressLineAddition)
            .zip(zip)
            .city(city)
            .country(country)
            .build();
    }

}
