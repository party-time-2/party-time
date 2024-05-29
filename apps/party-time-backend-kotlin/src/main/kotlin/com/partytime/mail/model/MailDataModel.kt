package com.partytime.mail.model

import com.partytime.jpa.entity.Event
import com.partytime.mail.MailEventListener
import org.springframework.context.ApplicationEvent

sealed interface MustacheData

class MailEvent(
    source: Any,
    val recipientEmail: String,
    val subject: String,
    val data: MustacheData,
    val icsEvent: Event? = null
): ApplicationEvent(source) {
    val template by lazy {
        when(data) {
            is InvitationData -> MailEventListener.TEMPLATE_INVITATION
            is EventChangeData -> MailEventListener.TEMPLATE_CHANGE
            is CancellationData -> MailEventListener.TEMPLATE_DELETE
            is UninviteData -> MailEventListener.TEMPLATE_UNINVITE
            is VerifyAccountData -> MailEventListener.TEMPLATE_VERIFY_ACCOUNT
        }
    }
}

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
): MustacheData

data class EventChangeData(
    var recipientName: String,
    val event: EventData,
    val homepage: String
): MustacheData

data class CancellationData(
    val event: EventData,
    var recipientName: String,
    val homepage: String
): MustacheData

data class UninviteData(
    val name: String,
    val event: EventData,
    val homepage: String,
): MustacheData

data class VerifyAccountData(
    val homepage: String,
    val name: String,
    val verificationLink: String
): MustacheData
