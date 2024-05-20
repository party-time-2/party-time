package com.partytime.jpa.repository

import com.partytime.jpa.entity.Address
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface AddressRepository : JpaRepository<Address, Long> {

    @Query(
        "select a from Address a " +
                "where a.addressLine = ?1 " +
                "and a.addressLineAddition = ?2 " +
                "and a.zip = ?3 " +
                "and a.city = ?4 " +
                "and a.country = ?5"
    )
    fun findByData(
        addressLine: String,
        addressLineAddition: String?,
        zip: String,
        city: String,
        country: String
    ): Optional<Address>
}
