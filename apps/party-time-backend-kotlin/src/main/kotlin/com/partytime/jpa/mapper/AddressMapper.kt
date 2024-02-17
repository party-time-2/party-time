package com.partytime.jpa.mapper

import com.partytime.api.dto.address.AddressDTO
import com.partytime.jpa.entity.Address

fun Address.map(): AddressDTO = AddressDTO(
    addressLine,
    addressLineAddition,
    zip,
    city,
    country
)

fun AddressDTO.map(): Address = Address(
    addressLine = addressLine,
    addressLineAddition = addressLineAddition,
    zip = zip,
    city = city,
    country = country
)

fun Address.prettyPrint(): String = listOfNotNull(
    addressLine,
    addressLineAddition?.let { "\n$it" },
    "$zip $city",
    country
).joinToString("\n")
