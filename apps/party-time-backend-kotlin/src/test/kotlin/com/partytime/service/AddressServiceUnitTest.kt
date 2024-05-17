package com.partytime.service

import com.partytime.ADDRESS_LINE
import com.partytime.ADDRESS_LINE_ADDITION
import com.partytime.CITY
import com.partytime.COUNTRY
import com.partytime.ZIP
import com.partytime.api.dto.address.AddressDTO
import com.partytime.jpa.entity.Address
import com.partytime.jpa.repository.AddressRepository
import com.partytime.testAbstraction.UnitTest
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import java.util.Optional

class AddressServiceUnitTest : UnitTest() {
    private val addressRepository = mockk<AddressRepository>()

    private val addressService = AddressService(addressRepository)

    private val address = Address(
        ADDRESS_LINE,
        ADDRESS_LINE_ADDITION,
        ZIP,
        CITY,
        COUNTRY
    )

    @Nested
    inner class SaveAddressTest : UnitTest() {
        @Test
        fun saveAddressAlreadyExistsSuccess() {
            //setup - mock
            every {
                addressRepository.findByData(
                    ADDRESS_LINE,
                    ADDRESS_LINE_ADDITION,
                    ZIP,
                    CITY,
                    COUNTRY
                )
            } returns Optional.of(address)

            //execute
            val result = addressService.saveAddress(ADDRESS_LINE, ADDRESS_LINE_ADDITION, ZIP, CITY, COUNTRY)
            assertEquals(result, address)

            //verify
            verify(exactly = 1) {
                addressRepository.findByData(
                    ADDRESS_LINE,
                    ADDRESS_LINE_ADDITION,
                    ZIP,
                    CITY,
                    COUNTRY
                )
            }
        }

        @Test
        fun saveAddressNewAddressSuccess() {
            //setup - mock
            every {
                addressRepository.findByData(
                    ADDRESS_LINE,
                    ADDRESS_LINE_ADDITION,
                    ZIP,
                    CITY,
                    COUNTRY
                )
            } returns Optional.empty()

            every { addressRepository.save(any()) } answers {
                firstArg<Address>().also {
                    if (it.id == null) it.id = 0L
                }
            }

            //execute
            val result = addressService.saveAddress(ADDRESS_LINE, ADDRESS_LINE_ADDITION, ZIP, CITY, COUNTRY)
            assertEquals(result.addressLine, ADDRESS_LINE)
            assertEquals(result.addressLineAddition, ADDRESS_LINE_ADDITION)
            assertEquals(result.zip, ZIP)
            assertEquals(result.city, CITY)
            assertEquals(result.country, COUNTRY)

            //verify
            verify(exactly = 1) {
                addressRepository.findByData(
                    ADDRESS_LINE,
                    ADDRESS_LINE_ADDITION,
                    ZIP,
                    CITY,
                    COUNTRY
                )
            }
            verify(exactly = 1) { addressRepository.save(any()) }
        }
    }

    @Nested
    inner class SaveAddressWithDTOTest : UnitTest() {
        private val addressDTO = AddressDTO(
            ADDRESS_LINE,
            ADDRESS_LINE_ADDITION,
            ZIP,
            CITY,
            COUNTRY
        )

        @Test
        fun saveAddressWithDTOAlreadyExistsSuccess() {
            //setup - mock
            every {
                addressRepository.findByData(
                    ADDRESS_LINE,
                    ADDRESS_LINE_ADDITION,
                    ZIP,
                    CITY,
                    COUNTRY
                )
            } returns Optional.of(address)

            //execute
            val result = addressService.saveAddress(addressDTO)
            assertEquals(result, address)

            //verify
            verify(exactly = 1) {
                addressRepository.findByData(
                    ADDRESS_LINE,
                    ADDRESS_LINE_ADDITION,
                    ZIP,
                    CITY,
                    COUNTRY
                )
            }
        }

        @Test
        fun saveAddressWithDTONewAddressSuccess() {
            //setup - mock
            every {
                addressRepository.findByData(
                    ADDRESS_LINE,
                    ADDRESS_LINE_ADDITION,
                    ZIP,
                    CITY,
                    COUNTRY
                )
            } returns Optional.empty()

            every { addressRepository.save(any()) } answers {
                firstArg<Address>().also {
                    if (it.id == null) it.id = 0L
                }
            }

            //execute
            val result = addressService.saveAddress(addressDTO)
            assertEquals(result.addressLine, ADDRESS_LINE)
            assertEquals(result.addressLineAddition, ADDRESS_LINE_ADDITION)
            assertEquals(result.zip, ZIP)
            assertEquals(result.city, CITY)
            assertEquals(result.country, COUNTRY)

            //verify
            verify(exactly = 1) {
                addressRepository.findByData(
                    ADDRESS_LINE,
                    ADDRESS_LINE_ADDITION,
                    ZIP,
                    CITY,
                    COUNTRY
                )
            }
            verify(exactly = 1) { addressRepository.save(any()) }
        }
    }

    @Test
    fun testSaveAddress() {
    }
}
