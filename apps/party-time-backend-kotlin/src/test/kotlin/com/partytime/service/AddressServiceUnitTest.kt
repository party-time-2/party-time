package com.partytime.service

import com.partytime.api.dto.address.AddressDTO
import com.partytime.jpa.entity.Address
import com.partytime.jpa.repository.AddressRepository
import com.partytime.testAbstraction.UnitTest
import com.partytime.testUtility.generateAddress
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
                generateAddress(true)
            ),
            Arguments.of(
                generateAddress(false)
            ),
        )
    }

    private val address = generateAddress(true)

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
            address.addressLine,
            address.addressLineAddition,
            address.zip,
            address.city,
            address.country
        )

        @Test
        fun saveAddressWithDTOAlreadyExistsSuccess() {
            //setup - mock
            every {
                addressRepository.findByData(
                    address.addressLine,
                    address.addressLineAddition,
                    address.zip,
                    address.city,
                    address.country
                )
            } returns Optional.of(address)

            //execute
            val result = addressService.saveAddress(addressDTO)
            assertEquals(result, address)

            //verify
            verify(exactly = 1) {
                addressRepository.findByData(
                    address.addressLine,
                    address.addressLineAddition,
                    address.zip,
                    address.city,
                    address.country
                )
            }
        }

        @Test
        fun saveAddressWithDTONewAddressSuccess() {
            //setup - mock
            every {
                addressRepository.findByData(
                    address.addressLine,
                    address.addressLineAddition,
                    address.zip,
                    address.city,
                    address.country
                )
            } returns Optional.empty()

            every { addressRepository.save(any()) } answers {
                firstArg<Address>().also {
                    if (it.id == null) it.id = 0L
                }
            }

            //execute
            val result = addressService.saveAddress(addressDTO)
            assertEquals(address.addressLine, result.addressLine)
            assertEquals(address.addressLineAddition, result.addressLineAddition)
            assertEquals(address.zip, result.zip)
            assertEquals(address.city, result.city)
            assertEquals(address.country, result.country)

            //verify
            verify(exactly = 1) {
                addressRepository.findByData(
                    address.addressLine,
                    address.addressLineAddition,
                    address.zip,
                    address.city,
                    address.country
                )
            }
            verify(exactly = 1) { addressRepository.save(any()) }
        }
    }
}
