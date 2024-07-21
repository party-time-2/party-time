package com.partytime.configuration

import org.springframework.boot.context.properties.ConfigurationProperties

/**
 * Configuration properties to be loaded and instantiated with the resources yaml files.
 *
 * @param jwt Json Web Token configuration property
 * @param mail Configuration for mail
 * @param url Url used for the server e.g. in Email communication
 */
@ConfigurationProperties(prefix = "party-time")
data class PartyTimeConfigurationProperties(
    val jwt: Jwt,
    val mail: Mail = Mail(),
    val url: String
)

/**
 * Json Web Token configuration properties
 *
 * @param secret Secret used to sign issued Json Web Token
 */
data class Jwt(
    val secret: String
)

/**
 * Mail configuration properties.
 *
 * @param enabled Whether actual mail sending should be enabled. If disabled server prints mail content to console.
 */
data class Mail(
    val enabled: Boolean = false
)
