package com.partytime.api

/**
 * Class containing constant values for the API
 */
class ApiConstants {
    companion object {

        /**
         * Regex string used for password validation
         */
        const val REGEX_PASSWORD: String =
            "^(?=.*[a-z])(?=.*[A-Z])(?=.+[0-9].+)(?=.*[a-zA-Z]+.*[ ,!\\\"§$%&/()=?{}[\\\\].+]+.*[a-zA-Z]+.*).*$"
    }
}
