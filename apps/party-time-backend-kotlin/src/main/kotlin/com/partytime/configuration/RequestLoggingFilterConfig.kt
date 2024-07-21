package com.partytime.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.filter.CommonsRequestLoggingFilter

/**
 * Filter configuration for request logging.
 */
@Configuration
class RequestLoggingFilterConfig {

    /**
     * Configures a filter that logs requests to console.
     */
    @Bean
    fun logFilter(): CommonsRequestLoggingFilter = CommonsRequestLoggingFilter().apply {
        setIncludeQueryString(true)
        setIncludePayload(true)
        setMaxPayloadLength(10000)
        setIncludeHeaders(true)
        setAfterMessagePrefix("REQUEST DATA: ")
    }
}
