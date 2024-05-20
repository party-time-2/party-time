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
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.Arguments
import org.junit.jupiter.params.provider.MethodSource
import java.util.Optional
import java.util.stream.Stream

class AddressServiceUnitTest : UnitTest() {
    private val addressRepository = mockk<AddressRepository>()

    private val addressService = AddressService(addressRepository)

    companion object {
        @JvmStatic
        fun addressProvider(): Stream<Arguments> = Stream.of(
            Arguments.of(
                Address(
                    ADDRESS_LINE,
                    ADDRESS_LINE_ADDITION,
                    ZIP,
                    CITY,
                    COUNTRY
                )
            ),
            Arguments.of(
                Address(
                    ADDRESS_LINE,
                    null,
                    ZIP,
                    CITY,
                    COUNTRY
                )
            ),
        )
    }

    private val address = Address(
        ADDRESS_LINE,
        ADDRESS_LINE_ADDITION,
        ZIP,
        CITY,
        COUNTRY
    )

    @Nested
    inner class SaveAddressTest : UnitTest() {
        @ParameterizedTest
        @MethodSource("com.partytime.service.AddressServiceUnitTest#addressProvider")
        fun saveAddressAlreadyExistsSuccess(testAddress: Address) {
            //setup - mock
            every {
                addressRepository.findByData(
                    testAddress.addressLine,
                    testAddress.addressLineAddition,
                    testAddress.zip,
                    testAddress.city,
                    testAddress.country
                )
            } returns Optional.of(testAddress)

            //execute
            val result = addressService.saveAddress(
                testAddress.addressLine,
                testAddress.addressLineAddition,
                testAddress.zip,
                testAddress.city,
                testAddress.country
            )
            assertEquals(testAddress, result)

            //verify
            verify(exactly = 1) {
                addressRepository.findByData(
                    testAddress.addressLine,
                    testAddress.addressLineAddition,
                    testAddress.zip,
                    testAddress.city,
                    testAddress.country
                )
            }
        }

        @ParameterizedTest
        @MethodSource("com.partytime.service.AddressServiceUnitTest#addressProvider")
        fun saveAddressNewAddressSuccess(testAddress: Address) {
            //setup - mock
            every {
                addressRepository.findByData(
                    testAddress.addressLine,
                    testAddress.addressLineAddition,
                    testAddress.zip,
                    testAddress.city,
                    testAddress.country
                )
            } returns Optional.empty()

            every { addressRepository.save(any()) } answers {
                firstArg<Address>().also {
                    if (it.id == null) it.id = 0L
                }
            }

            //execute
            val result = addressService.saveAddress(
                testAddress.addressLine,
                testAddress.addressLineAddition,
                testAddress.zip,
                testAddress.city,
                testAddress.country
            )
            assertEquals(testAddress.addressLine, result.addressLine)
            assertEquals(testAddress.addressLineAddition, result.addressLineAddition)
            assertEquals(testAddress.zip, result.zip)
            assertEquals(testAddress.city, result.city)
            assertEquals(testAddress.country, result.country)

            //verify
            verify(exactly = 1) {
                addressRepository.findByData(
                    testAddress.addressLine,
                    testAddress.addressLineAddition,
                    testAddress.zip,
                    testAddress.city,
                    testAddress.country
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
}
