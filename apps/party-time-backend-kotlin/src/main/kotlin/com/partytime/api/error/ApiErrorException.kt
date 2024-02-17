package com.partytime.api.error

class ApiErrorException: RuntimeException {
    val apiError: ApiError

    constructor(apiError: ApiError, t: Throwable) : super(apiError.message, t) {
        this.apiError = apiError
    }

    constructor(apiError: ApiError): super(apiError.message) {
        this.apiError = apiError
    }
}

fun ApiError.asException() = ApiErrorException(this)
