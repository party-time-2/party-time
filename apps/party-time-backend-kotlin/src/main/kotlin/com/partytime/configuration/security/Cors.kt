package com.partytime.configuration.security

import com.partytime.configuration.PartyTimeConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Component
class Cors(
    val properties: PartyTimeConfigurationProperties
) {
    @Bean
    fun addCORSConfiguration(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/api/**").allowedOrigins(properties.url)
            }
        }
    }
}
