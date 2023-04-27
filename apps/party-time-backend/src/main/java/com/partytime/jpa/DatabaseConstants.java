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

}
