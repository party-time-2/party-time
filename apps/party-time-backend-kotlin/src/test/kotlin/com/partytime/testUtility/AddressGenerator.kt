package com.partytime.testUtility

import com.partytime.ADDRESS_LINE
import com.partytime.ADDRESS_LINE_ADDITION
import com.partytime.CITY
import com.partytime.COUNTRY
import com.partytime.ZIP
import com.partytime.jpa.entity.Address

fun generateAddress(withAddressLineAddition: Boolean): Address = Address(
    ADDRESS_LINE,
    if (withAddressLineAddition) ADDRESS_LINE_ADDITION else null,
    ZIP,
    CITY,
    COUNTRY
)

