package com.partytime.api.error

/**
 * A [RuntimeException] based on an [ApiError]
 */
class ApiErrorException: RuntimeException {
    /** The underlying instance of [ApiError] */
    val apiError: ApiError

    /**
     * Constructor for [ApiErrorException] inheriting the [ApiError.message] and [ApiError.parent].
     *
     * @param apiError The underlying [ApiError] that caused this exception
     * @param t the Throwable that should be passed tho the [RuntimeException]
     */
    constructor(apiError: ApiError, t: Throwable) : super(apiError.message, t) {
        this.apiError = apiError
    }

    /**
     * Constructor for [ApiErrorException] inheriting just the [ApiError.message]
     *
     * @param apiError The underlying [ApiError] that caused this exception
     */
    constructor(apiError: ApiError): super(apiError.message) {
        this.apiError = apiError
    }
}

/**
 * Converter function that turns an [ApiError] into an [ApiErrorException].
 * [ApiErrorException] can be thrown and handled by Kotlins/Springs exception handling.
 *
 * @receiver The underlying [ApiError] of the to-be-created exception
 * @return An exception based on the [ApiError]
 */
fun ApiError.asException() = parent?.let { throwable -> ApiErrorException(this, throwable) } ?: ApiErrorException(this)
