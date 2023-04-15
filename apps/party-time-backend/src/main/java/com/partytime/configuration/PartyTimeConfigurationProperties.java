package com.partytime.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.temporal.TemporalUnit;

@Data
@ConfigurationProperties(prefix = "party-time")
public class PartyTimeConfigurationProperties {

    private Jwt jwt;

    @Data
    public static class Jwt {
        private String secret;
        private Expiration tokenValidity;
        private Expiration refreshValidity;
    }

    @Data
    public static class Expiration {
        private TemporalUnit unit;
        private long amount;
    }

}
