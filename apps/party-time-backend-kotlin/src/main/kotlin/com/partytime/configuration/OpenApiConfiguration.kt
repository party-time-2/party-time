package com.partytime.configuration

import com.partytime.api.error.ApiError
import io.swagger.v3.core.converter.ModelConverters
import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.security.SecurityScheme
import io.swagger.v3.oas.annotations.security.SecuritySchemes
import io.swagger.v3.oas.models.Components
import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.media.Content
import io.swagger.v3.oas.models.media.MediaType
import io.swagger.v3.oas.models.media.Schema
import io.swagger.v3.oas.models.responses.ApiResponse
import org.springdoc.core.customizers.OpenApiCustomizer
import org.springframework.context.annotation.Configuration


@Configuration
@OpenAPIDefinition(
    info = Info(
        title = "Party Type Backend API",
        description = "API Endpoints for Party Time Backend",
        version = "1.0.0"
    ),
    security = [
        SecurityRequirement(
            name = "Authorization"
        )
    ]
)
@SecuritySchemes(
    SecurityScheme(
        name = "Authorization",
        description = "Authenticate to the Platform with an Api Key",
        type = SecuritySchemeType.APIKEY,
        `in` = SecuritySchemeIn.HEADER
    )
)
class OpenApiConfiguration : OpenApiCustomizer {
    override fun customise(openApi: OpenAPI) {
        val components = openApi.components ?: Components().also { openApi.components = it }
        val schemas = components.schemas ?: HashMap<String, Schema<*>>().also { components.schemas = it }
        schemas.putAll(ModelConverters.getInstance().read(ApiError::class.java))


        val errorResponseSchema = Schema<ApiError>()
        errorResponseSchema.name = "ApiError"
        errorResponseSchema.`$ref` = "#/components/schemas/ApiError"

        val errorResponseContent = Content().addMediaType(
            org.springframework.http.MediaType.APPLICATION_JSON_VALUE,
            MediaType().apply { schema = errorResponseSchema }
        )

        openApi.paths.values
            .forEach { pathItem ->
                pathItem.readOperations().forEach { operation ->
                    if (operation.responses.size == 1 && operation.responses.keys.first() == "200") {
                        operation.responses.addApiResponse(
                            "4XX",
                            ApiResponse()
                                .description("Operation failed with Client Error!")
                                .content(errorResponseContent)
                        )
                        operation.responses.addApiResponse(
                            "5XX", ApiResponse()
                                .description("Operation failed with Server Error!")
                                .content(errorResponseContent)
                        )
                    }
                    operation.responses.forEach { key: String, value: ApiResponse ->
                        if (key.length == 3 && key.first().run { isDigit() && digitToInt() in 4..5 }) {
                            value.content = errorResponseContent
                        }
                    }
                }
            }
    }
}
