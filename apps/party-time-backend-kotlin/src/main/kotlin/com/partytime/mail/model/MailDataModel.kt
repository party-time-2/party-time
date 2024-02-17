package com.partytime.mail.model

data class EventData(
    val organizerName: String,
    val eventName: String,
    val location: String,
    val startTime: String
)

data class IcsEventData(
    val event: EventData,
    val website: String,
    val generatedTimestamp: String,
    val organizerEmail: String,
    val uid: String
)

data class InvitationData(
    var recipientName: String,
    val event: EventData,
    val acceptLink: String,
    val declineLink: String,
    val homepage: String
)

data class EventChangeData(
    var recipientName: String,
    val event: EventData,
    val homepage: String
)

data class CancellationData(
    val event: EventData,
    var recipientName: String,
    val homepage: String
)

data class UninviteData(
    val name: String,
    val event: EventData,
    val homepage: String,
)

data class VerifyAccountModel(
    val homepage: String,
    val name: String,
    val verificationLink: String
)
