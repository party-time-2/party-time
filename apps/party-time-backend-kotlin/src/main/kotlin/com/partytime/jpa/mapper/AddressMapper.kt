package com.partytime.jpa.mapper

import com.partytime.api.dto.address.AddressDTO
import com.partytime.jpa.entity.Address

/**
 * Transforms an [Address] entity into a (serializable) [AddressDTO]
 *
 * @receiver transformation subject
 * @return transformation result, ready for serialization and transmission to the client
 */
fun Address.toAddressDTO(): AddressDTO = AddressDTO(
    addressLine,
    addressLineAddition,
    zip,
    city,
    country
)

/**
 * Formats an [Address] entity in a human-readable format.
 *
 * @receiver formatting subject
 * @return address block
 */
fun Address.toMultiLineString(): String = listOfNotNull(
    addressLine,
    addressLineAddition?.let { "\n$it" },
    "$zip $city",
    country
).joinToString("\n")
