package com.partytime.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.temporal.TemporalUnit;

@Data
@ConfigurationProperties(prefix = "party-time")
public class PartyTimeConfigurationProperties {

    private Jwt jwt;
    private Mail mail = new Mail();
    private String url;

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

    @Data
    public static class Mail {
        private boolean enabled = false;
    }

}
