package com.partytime.configuration

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "party-time")
data class PartyTimeConfigurationProperties(
    val jwt: Jwt,
    val mail: Mail = Mail(),
    val url: String
)

data class Jwt(
    val secret: String
)

data class Mail(
    val enabled: Boolean = false
)
