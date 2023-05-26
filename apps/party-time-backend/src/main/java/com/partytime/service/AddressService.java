package com.partytime.service;

import com.partytime.api.dto.address.AddressDTO;
import com.partytime.api.error.ApiError;
import com.partytime.jpa.entity.Address;
import com.partytime.jpa.mapper.AddressMapper;
import com.partytime.jpa.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public Address getAddress(String addressLine,
                              String addressLineAddition,
                              String zip,
                              String city,
                              String country) {
        String adLineAdd = addressLineAddition != null ? addressLineAddition : "";
        return addressRepository.findByData(addressLine, adLineAdd, zip, city, country)
            .or(() -> Optional.of(AddressMapper.create(addressLine, adLineAdd, zip, city, country))
                .map(addressRepository::save))
            .orElseThrow(() -> ApiError.badRequest("Fehler bei der Anlage einer Addresse").asException());
    }

    public Address getAddress(AddressDTO address) {
        return getAddress(address.getAddressLine(),
            address.getAddressLineAddition(),
            address.getZip(),
            address.getCity(),
            address.getCountry());
    }

}
