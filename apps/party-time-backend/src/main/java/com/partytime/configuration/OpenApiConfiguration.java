package com.partytime.configuration;

import com.partytime.api.error.ApiError;
import io.swagger.v3.core.converter.ModelConverters;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.security.SecuritySchemes;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.responses.ApiResponse;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "Party Type Backend API",
        description = "API Endpoints for Party Time Backend",
        version = "1.0.0"
    ),
    servers = {
        @Server(
            description = "Local Host",
            url = "http://localhost:8080"
        )
    },
    security = {
        @SecurityRequirement(
            name = "Authorization"
        )
    }
)
@SecuritySchemes(
    @SecurityScheme(
        name = "Authorization",
        description = "Authenticate to the Platform with an Api Key",
        type = SecuritySchemeType.APIKEY,
        in = SecuritySchemeIn.HEADER
    )
)
public class OpenApiConfiguration implements OpenApiCustomizer {

    @Override
    public void customise(OpenAPI openApi) {
        if (openApi.getComponents() == null) {
            openApi.setComponents(new Components());
        }
        if (openApi.getComponents().getSchemas() == null) {
            openApi.getComponents().setSchemas(new HashMap<>());
        }

        openApi.getComponents().getSchemas().putAll(ModelConverters.getInstance().read(ApiError.class));

        Schema errorResponseSchema = new Schema();
        errorResponseSchema.setName("ApiError");
        errorResponseSchema.set$ref("#/components/schemas/ApiError");

        openApi.getPaths().values()
            .forEach(pathItem -> pathItem.readOperations()
                .forEach(operation -> {
                    if (operation.getResponses().size() == 1 && operation.getResponses().keySet().stream()
                        .allMatch("200"::equals)) {
                        operation.getResponses().addApiResponse("4XX", new ApiResponse()
                            .description("Operation failed with Client Error!")
                            .content(buildErrorResponse(errorResponseSchema)));
                        operation.getResponses().addApiResponse("5XX", new ApiResponse()
                            .description("Operation failed with Server Error!")
                            .content(buildErrorResponse(errorResponseSchema)));
                    }

                    operation.getResponses().forEach((key, value) -> {
                        if (key.length() == 3 && (key.startsWith("4") || key.startsWith("5"))) {
                            buildErrorResponse(errorResponseSchema);
                            value.setContent(buildErrorResponse(errorResponseSchema));
                        }
                    });
                }));
    }

    private static Content buildErrorResponse(Schema errorResponseSchema) {
        MediaType mediaType = new MediaType();
        mediaType.setSchema(errorResponseSchema);
        return new Content()
            .addMediaType(org.springframework.http.MediaType.APPLICATION_JSON_VALUE, mediaType);
    }

}
