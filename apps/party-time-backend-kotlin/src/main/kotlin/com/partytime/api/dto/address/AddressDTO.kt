package com.partytime.api.dto.address

import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Size

/**
 * Data transfer object used for address data
 *
 * @param addressLine First line of the address
 * @param addressLineAddition (Optional) second line of the address
 * @param zip Zip/PLZ of the city
 * @param city Name of the city
 * @param country Country name of the address
 */
data class AddressDTO(
    @field:Size(min = 4, max = 25)
    val addressLine: String,
    val addressLineAddition: String?,
    @field:NotEmpty
    @field:Size(min = 5, max = 5)
    val zip: String,
    @field:Size(min = 3, max = 20)
    @field:NotEmpty
    val city: String,
    @field:Size(min = 3, max = 20)
    @field:NotEmpty
    val country: String
)
