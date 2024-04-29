package com.partytime.configuration

import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder
import java.time.format.DateTimeFormatter

@Deprecated("Jackson uses ISO_INSTANT format by default")
@Configuration
class JacksonConfiguration {
    companion object {
        val dateTimeFormatter: DateTimeFormatter = DateTimeFormatter.ISO_INSTANT
    }

    @Bean
    fun jackson2ObjectMapperBuilderCustomizer(): Jackson2ObjectMapperBuilderCustomizer =
        Jackson2ObjectMapperBuilderCustomizer { builder: Jackson2ObjectMapperBuilder ->
            // deserializers
            //builder.deserializers(LocalDateTimeDeserializer(dateTimeFormatter))

            // serializers
            //builder.serializers(LocalDateTimeSerializer(dateTimeFormatter))
        }
}
