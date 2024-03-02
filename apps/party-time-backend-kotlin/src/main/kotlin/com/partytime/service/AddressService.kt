package com.partytime.service

import com.partytime.api.dto.address.AddressDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.asException
import com.partytime.jpa.entity.Address
import com.partytime.jpa.repository.AddressRepository
import org.springframework.stereotype.Service
import java.util.Optional

/**
 * A [Service] class for address related functionality.
 *
 * @param addressRepository A repository where addresses can be stored
 * @constructor Constructs a new [AddressService]
 */
@Service
class AddressService (
    private val addressRepository: AddressRepository
) {

    /**
     * Implemented during F001
     *
     * Saves a new address to the database if it has not been saved before.
     *
     * @param addressLine Address line containing the street name and house number
     * @param addressLineAddition Additional (optional) address line
     * @param zip Postal code of the city
     * @param city Name of the city
     * @param country Name of the country
     * @return A newly stored [Address] or a matching [Address] that has been stored before
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

    /**
     * Saves the address stored in an [AddressDTO].
     *
     * @param address Address information to be saved
     * @return A newly stored [Address] or a matching [Address] that has been stored before
     */
    fun saveAddress(address: AddressDTO) = saveAddress(
        address.addressLine,
        address.addressLineAddition,
        address.zip,
        address.city,
        address.country
    )
}
