package com.partytime.api;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public final class ApiConstants {

    public static final String REGEX_PASSWORD = "^(?=.*[a-z])(?=.*[A-Z])(?=.+[0-9].+)(?=.*[a-zA-Z]+.*[ ,!\\\"§$%&/()=?{}[\\\\].+]+.*[a-zA-Z]+.*).*$";

}
