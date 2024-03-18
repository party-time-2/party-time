package com.partytime.configuration.security

import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.service.AccountService
import com.partytime.service.JwtService
import org.springframework.boot.autoconfigure.security.servlet.PathRequest
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

/**
 * [Configuration] for Spring Security.
 *
 * @param authEntryPointJwt Entry point for the authentication process of protected routes
 * @param properties Used to fetch the url that should be permitted by CORS
 * @constructor Constructs a new [SecurityConfiguration]
 */
@Configuration
@EnableWebSecurity
@EnableConfigurationProperties(PartyTimeConfigurationProperties::class)
class SecurityConfiguration (
    private val authEntryPointJwt: AuthEntryPointJwt,
    private val properties: PartyTimeConfigurationProperties
) {
    /**
     * Allows access to the H2 database console
     * @param http The [HttpSecurity] component to be configured for access
     * @return A [SecurityFilterChain] that can be applied to incoming requests to check for validity
     */
    @Bean
    @Profile("!test")
    @Order(Ordered.HIGHEST_PRECEDENCE)
    fun h2ConsoleSecurityFilterChain(http: HttpSecurity): SecurityFilterChain =
        http.securityMatcher(PathRequest.toH2Console())
            .csrf { it.disable() }
            .headers { headers: HeadersConfigurer<HttpSecurity> ->
                headers.frameOptions { it.sameOrigin() }
            }.build()

    /**
     * General [SecurityFilterChain] configuration that relieves non-protected routes of their auth-requirement.
     *
     * @param http The [HttpSecurity] Component to be configured for access
     * @param jwtAuthenticationFilter Used to check for authentication with Json Web Token
     * @param authenticationProvider Provider of authentication details
     * @return A [SecurityFilterChain] that can be applied to incoming requests to check for validity
     */
    @Bean
    fun securityFilterChain(
        http: HttpSecurity,
        jwtAuthenticationFilter: JwtAuthenticationFilter,
        authenticationProvider: AuthenticationProvider
    ): SecurityFilterChain {
        http.csrf { it.disable() }
            .cors(Customizer.withDefaults())
            .exceptionHandling { it.authenticationEntryPoint(authEntryPointJwt) }
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .authenticationProvider(authenticationProvider)
            .authorizeHttpRequests {
                //swagger configuration
                it.requestMatchers(
                    "/swagger-ui.html", "/swagger-ui/**",
                    "/v3/api-docs", "/v3/api-docs/swagger-config"
                ).permitAll()

                //unprotected routes configuration
                it.requestMatchers(
                    HttpMethod.POST,
                    "/api/auth/login",
                    "/api/account",
                    "/api/auth/verify/**"
                ).permitAll()

                //allow remaining /api/ routes for authenticated users
                it.requestMatchers("/api/**").authenticated()
            }

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)

        return http.build()
    }

    /**
     * Creates an [AuthenticationProvider] that can be used to authenticate users.
     *
     * @param userDetailsService Used to fetch user details (e.g. password hash)
     * @param passwordEncoder Used for encoding asswords (-> compare a provided password with the stored password hash)
     * @return An [AuthenticationProvider] that uses the provided [UserDetailsService] and [PasswordEncoder]
     */
    @Bean
    fun authenticationProvider(
        userDetailsService: UserDetailsService,
        passwordEncoder: PasswordEncoder
    ): AuthenticationProvider = DaoAuthenticationProvider().apply {
        setUserDetailsService(userDetailsService)
        setPasswordEncoder(passwordEncoder)
    }

    /**
     * Provides a [PasswordEncoder] implementation
     *
     * @return A new [PasswordEncoder] for encoding and comparing passwords
     */
    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    /**
     * Provides a [UserDetailsService] for authentication related matters.
     *
     * @param accountService Used by the constructed [PartyTimeUserDetailsService] for account detail fetching
     * @return A new [UserDetailsService] that can be used for authentication related matters.
     */
    @Bean
    fun userDetailsService(accountService: AccountService): UserDetailsService =
        PartyTimeUserDetailsService(accountService)

    /**
     * Provides a [JwtAuthenticationFilter] to filter requests based on Json Web Token authentication.
     *
     * @param jwtService Service implementation that provides JWT authentication
     * @param userDetailsService Used by the [JwtAuthenticationFilter] to fetch user details
     * @return A new [JwtAuthenticationFilter] that can be applied to incoming requests
     */
    @Bean
    fun jwtAuthenticationFilter(
        jwtService: JwtService,
        userDetailsService: UserDetailsService
    ): JwtAuthenticationFilter {
        return JwtAuthenticationFilter(jwtService, userDetailsService)
    }

    /**
     * Provides a [CorsConfigurationSource] that adds an Acces-Control-Allow-Origin header on requests that
     * - stem from the configured frontend URL
     * - are made to routes located under "/api/"
     *
     * @return A new [CorsConfigurationSource] that restricts CORS responses to certain routes
     */
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource =
        UrlBasedCorsConfigurationSource().also {
            val configuration = CorsConfiguration().apply {
                addAllowedOrigin(properties.url)
                addAllowedHeader("content-type")
                addAllowedHeader("authorization")
                addAllowedMethod(HttpMethod.GET)
                addAllowedMethod(HttpMethod.POST)
                addAllowedMethod(HttpMethod.PATCH)
                addAllowedMethod(HttpMethod.DELETE)
                addAllowedMethod(HttpMethod.OPTIONS)
            }

            it.registerCorsConfiguration("/api/**", configuration)
        }
}
