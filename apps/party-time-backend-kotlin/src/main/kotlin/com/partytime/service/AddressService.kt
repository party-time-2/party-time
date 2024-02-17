package com.partytime.service

import com.partytime.api.dto.address.AddressDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.jpa.entity.Address
import com.partytime.jpa.repository.AddressRepository
import org.springframework.stereotype.Service
import java.util.Optional

@Service
class AddressService (
    private val addressRepository: AddressRepository
) {

    /**
     * Implemented during F001
     */
    fun saveAddress(
        addressLine: String,
        addressLineAddition: String?,
        zip: String,
        city: String,
        country: String
    ): Address = addressRepository.findByData(addressLine, addressLineAddition.orEmpty(), zip, city, country)
        .or {
            Optional.of<Address>(
                Address(
                    addressLine = addressLine,
                    addressLineAddition = addressLineAddition.orEmpty(),
                    zip = zip,
                    city = city,
                    country = country
                )
            ).map { entity: Address ->
                addressRepository.save(entity)
            }
        }.orElseThrow {
            ApiError.badRequest(
                "Fehler bei der Anlage einer Adresse"
            ).asException()
        }

    fun saveAddress(address: AddressDTO) = saveAddress(
        address.addressLine,
        address.addressLineAddition,
        address.zip,
        address.city,
        address.country
    )
}
