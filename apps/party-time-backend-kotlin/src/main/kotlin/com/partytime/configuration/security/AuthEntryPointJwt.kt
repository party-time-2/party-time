package com.partytime.configuration.security

import com.fasterxml.jackson.databind.ObjectMapper
import com.partytime.api.error.ApiError
import io.github.oshai.kotlinlogging.KotlinLogging
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component

private val authLogger = KotlinLogging.logger {}
@Component
class AuthEntryPointJwt (
    private val objectMapper: ObjectMapper
): AuthenticationEntryPoint {


    override fun commence(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authException: AuthenticationException
    ) {
        authLogger.error { "Unauthorized error: ${authException.message}" }
        response.apply {
            status = HttpStatus.UNAUTHORIZED.value()
            addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)

            val error = ApiError.unauthorized()
            val json = objectMapper.writeValueAsString(error)
            writer.write(json)
            writer.flush()
        }
    }
}
