package com.partytime.jpa.entity

import com.partytime.jpa.DatabaseConstants
import com.partytime.jpa.factory.EntityWithLongId
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Size

@Entity
@Table(name = DatabaseConstants.Address.TABLE_NAME)
class Address(
    @field:NotEmpty
    @field:Size(min = 4, max = 25)
    @Column(name = DatabaseConstants.Address.COLUMN_ADDRESS_LINE)
    var addressLine: String,
    @Column(name = DatabaseConstants.Address.COLUMN_ADDRESS_LINE_ADDITION)
    var addressLineAddition: String?,
    @field:NotEmpty
    @field:Size(min = 5, max = 5)
    @Column(name = DatabaseConstants.Address.COLUMN_ZIP)
    var zip: String,
    @field:NotEmpty
    @field:Size(min = 3, max = 20)
    @Column(name = DatabaseConstants.Address.COLUMN_CITY)
    var city: String,
    @field:NotEmpty
    @field:Size(min = 3, max = 20)
    @Column(name = DatabaseConstants.Address.COLUMN_COUNTRY)
    var country: String
): EntityWithLongId()
