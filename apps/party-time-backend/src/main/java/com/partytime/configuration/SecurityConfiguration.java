package com.partytime.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
// TODO https://github.com/ali-bouali/spring-boot-3-jwt-security/tree/main/src/main/java/com/alibou/security/config
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // @formatter:off
        http.csrf().disable()
            .authorizeHttpRequests()
                .requestMatchers("/swagger-ui.html", "/swagger-ui/**",
                                 "/v3/api-docs", "/v3/api-docs/swagger-config")
                    .permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/login", "/api/auth/register")
                    .permitAll()
                .anyRequest()
                    .authenticated();

        http.sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // @formatter:on

        return http.build();
    }

}
