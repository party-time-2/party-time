package com.partytime.api.error

import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.security.access.AccessDeniedException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

private val apiErrorLogger = KotlinLogging.logger {}

@RestControllerAdvice(annotations = [RestController::class])
class ApiErrorExceptionHandler : ResponseEntityExceptionHandler() {


    override fun handleMethodArgumentNotValid(
        ex: MethodArgumentNotValidException,
        headers: HttpHeaders,
        status: HttpStatusCode,
        request: WebRequest
    ): ResponseEntity<Any>? = ex.fieldErrors.map { fieldError ->
        buildMap {
            this["name"] = fieldError.field
            this["rejectedValue"] = fieldError.rejectedValue as Any
            this["message"] = fieldError.defaultMessage as Any
        }
    }.let { fullAdditionalInfo ->
        ApiError.conflict(
            "Validation failed for Parameter '${ex.parameter.parameterName}'",
            ex,
            fullAdditionalInfo
        )
    }.let(::handleApiError)

    override fun handleExceptionInternal(
        ex: Exception,
        body: Any?,
        headers: HttpHeaders,
        statusCode: HttpStatusCode,
        request: WebRequest
    ): ResponseEntity<Any>? =
        handleApiError(ApiError.arbitraryCode(HttpStatus.valueOf(statusCode.value()), ex.message.orEmpty(), ex))

    @ExceptionHandler(AccessDeniedException::class)
    fun handleAccessDenied(exception: AccessDeniedException, webRequest: WebRequest): ResponseEntity<Any> =
        handleApiError(ApiError.forbidden(exception))

    @ExceptionHandler(ApiErrorException::class)
    fun handleApiErrorException(exception: ApiErrorException, webRequest: WebRequest): ResponseEntity<Any> =
        handleApiError(exception.apiError)


    /**
     * Builds a [ResponseEntity] with the given http Status and the Object from api error
     *
     * @param apiError The Error to return
     * @return the built response entity
     */
    fun handleApiError(apiError: ApiError): ResponseEntity<Any> {
        when (val t = apiError.parent) {
            null -> apiErrorLogger.error(apiError::message)
            else -> apiErrorLogger.error(t, apiError::message)
        }

        return ResponseEntity.status(apiError.status).body(apiError)
    }
}
