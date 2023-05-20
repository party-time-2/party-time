package com.partytime.jpa;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class DatabaseConstants {

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Account {
        public static final String TABLE_NAME = "ACCOUNT";
        public static final String COLUMN_EMAIL = "EMAIL";
        public static final String COLUMN_EMAIL_VERIFIED = "EMAIL_VERIFIED";
        public static final String COLUMN_NAME = "NAME";
        public static final String COLUMN_PW_HASH = "PASSWORD_HASH";
        public static final String COLUMN_EMAIL_VERIFICATION_CODE = "EMAIL_VERIFICATION_CODE";
        public static final String COLUMN_PASSWORD_VERIFICATION_CODE = "PASSWORD_VERIFICATION_CODE";
    }

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Event {
        public static final String TABLE_NAME = "EVENT";
        public static final String COLUMN_ORGANIZER_ID = "ORGANIZER_ID";
        public static final String COLUMN_NAME = "NAME";
        public static final String COLUMN_DATE_TIME = "DATE_TIME";
        public static final String COLUMN_ADDRESS = "ADDRESS_ID";
    }

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class EventParticipant {
        public static final String TABLE_NAME = "EVENT_PARTICIPANT";
        public static final String COLUMN_ACCOUNT_ID = "ACCOUNT_ID";
        public static final String COLUMN_EVENT_ID = "EVENT_ID";
        public static final String COLUMN_STATUS = "STATUS";
    }

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Address {
        public static final String TABLE_NAME = "ADDRESS";
        public static final String COLUMN_ADDRESS_LINE = "ADDRESS_LINE";
        public static final String COLUMN_ZIP = "ZIP";
        public static final String COLUMN_CITY = "CITY";
        public static final String COLUMN_COUNTRY = "COUNTRY";
    }

}
