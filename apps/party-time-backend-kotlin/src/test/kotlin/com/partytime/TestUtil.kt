package com.partytime

import com.partytime.api.error.ApiErrorException
import org.junit.jupiter.api.Assertions.assertEquals

fun assertApiErrorExceptionEquals(expected: ApiErrorException, thrown: ApiErrorException) {
    assertEquals(expected.message, thrown.message)
    assertEquals(expected.apiError.status, thrown.apiError.status)
    assertEquals(expected.apiError.message, thrown.apiError.message)
}
