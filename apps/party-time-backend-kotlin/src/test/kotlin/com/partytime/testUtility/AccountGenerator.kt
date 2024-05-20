package com.partytime.testUtility

import com.partytime.EMAIL
import com.partytime.NAME
import com.partytime.ORGANIZER_EMAIL
import com.partytime.ORGANIZER_NAME
import com.partytime.ORGANIZER_PASSWORD
import com.partytime.PASSWORD
import com.partytime.jpa.entity.Account
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

private val passwordEncoder = BCryptPasswordEncoder()

data class AdditionalTAccountTestInformation(
    val id: Long,
    val passwordPlainText: String,
    val passwordEncoder: PasswordEncoder
)

data class AccountTestData(
    val account: Account,
    val additionalTAccountTestInformation: AdditionalTAccountTestInformation
)

private var organizerId = 0L
fun generateOrganizerAccount() = (organizerId++).let { currentId ->
    AdditionalTAccountTestInformation(
        currentId,
        "$currentId$ORGANIZER_PASSWORD",
        passwordEncoder
    )
}.let { additionalInfo ->
    AccountTestData(
        Account(
            "${additionalInfo.id}$ORGANIZER_EMAIL",
            true,
            "${additionalInfo.id}$ORGANIZER_NAME",
            passwordEncoder.encode(additionalInfo.passwordPlainText)
        ).apply { id = additionalInfo.id },
        additionalInfo
    )
}

private var participantId = 0L
fun generateParticipantAccount(verified: Boolean) = (participantId++).let { currentId ->
    AdditionalTAccountTestInformation(
        currentId,
        "$currentId$PASSWORD",
        passwordEncoder
    )
}.let { additionalInfo ->
    AccountTestData(
        Account(
            "$additionalInfo$EMAIL",
            verified,
            "$additionalInfo$NAME",
            passwordEncoder.encode(additionalInfo.passwordPlainText)
        ).apply { id = additionalInfo.id },
        additionalInfo
    )
}
