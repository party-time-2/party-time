package com.partytime.jpa

object DatabaseConstants {
    object Account {
        const val TABLE_NAME: String = "ACCOUNT"
        const val COLUMN_EMAIL: String = "EMAIL"
        const val COLUMN_EMAIL_VERIFIED: String = "EMAIL_VERIFIED"
        const val COLUMN_NAME: String = "NAME"
        const val COLUMN_PW_HASH: String = "PASSWORD_HASH"
        const val COLUMN_EMAIL_VERIFICATION_CODE: String = "EMAIL_VERIFICATION_CODE"
        const val COLUMN_PASSWORD_VERIFICATION_CODE: String = "PASSWORD_VERIFICATION_CODE"
    }

    object Event {
        const val TABLE_NAME: String = "EVENT"
        const val COLUMN_ORGANIZER_ID: String = "ORGANIZER_ID"
        const val COLUMN_NAME: String = "NAME"
        const val COLUMN_DATE_TIME: String = "DATE_TIME"
        const val COLUMN_ADDRESS: String = "ADDRESS_ID"
    }

    object EventParticipant {
        const val TABLE_NAME: String = "EVENT_PARTICIPANT"
        const val COLUMN_ACCOUNT_ID: String = "ACCOUNT_ID"
        const val COLUMN_EVENT_ID: String = "EVENT_ID"
        const val COLUMN_STATUS: String = "STATUS"
    }

    object Address {
        const val TABLE_NAME: String = "ADDRESS"
        const val COLUMN_ADDRESS_LINE: String = "ADDRESS_LINE"
        const val COLUMN_ADDRESS_LINE_ADDITION: String = "ADDRESS_LINE_ADDITION"
        const val COLUMN_ZIP: String = "ZIP"
        const val COLUMN_CITY: String = "CITY"
        const val COLUMN_COUNTRY: String = "COUNTRY"
    }
}
