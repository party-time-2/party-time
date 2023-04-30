package com.partytime.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "party-time")
public class PartyTimeConfigurationProperties {

    private Jwt jwt;
    private Mail mail = new Mail();
    private String url;

    @Data
    public static class Jwt {
        private String secret;
    }

    @Data
    public static class Mail {
        private boolean enabled = false;
    }

}
