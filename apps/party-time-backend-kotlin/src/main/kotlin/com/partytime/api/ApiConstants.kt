package com.partytime.api

class ApiConstants {
    companion object {
        const val REGEX_PASSWORD: String =
            "^(?=.*[a-z])(?=.*[A-Z])(?=.+[0-9].+)(?=.*[a-zA-Z]+.*[ ,!\\\"§$%&/()=?{}[\\\\].+]+.*[a-zA-Z]+.*).*$"
    }
}
