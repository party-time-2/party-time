package com.partytime.api.error;

import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Base Api Error Model
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiError implements Serializable {

    private HttpStatus status;
    private LocalDateTime timestamp;
    private String message;

    @JsonIgnore
    private Throwable parent;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Map<String, Object>> additionalInformation;

    public static ApiError notFound(String message) {
        return notFound(message, null);
    }

    public static ApiError notFound(String message, Throwable parent) {
        return status(message, HttpStatus.NOT_FOUND, parent);
    }

    public static ApiError badRequest(String message) {
        return badRequest(message, null);
    }

    public static ApiError badRequest(String message, Throwable parent) {
        return status(message, HttpStatus.BAD_REQUEST, parent);
    }

    public static ApiError status(String message, HttpStatus status, Throwable parent) {
        return ApiError.builder()
            .status(status)
            .timestamp(LocalDateTime.now())
            .message(message)
            .parent(parent)
            .build();
    }

    /**
     * Builds a default unauthorized Error
     *
     * @return a default unauthorized Api Error
     */
    public static ApiError unauthorized() {
        return ApiError.builder()
            .status(HttpStatus.UNAUTHORIZED)
            .message("Die Anfrage konnte nicht bearbeitet werden, da keine gültigen Authentifizierungsdaten für die angeforderte Ressource vorliegen!")
            .timestamp(LocalDateTime.now())
            .build();
    }

    /**
     * Builds a default forbidden Error
     *
     * @return a default forbidden Api Error
     */
    public static ApiError forbidden() {
        return forbidden(null);
    }

    /**
     * Builds a default forbidden Error
     *
     * @param parent The original Exception
     * @return a default forbidden Api Error
     */
    public static ApiError forbidden(Throwable parent) {
        return ApiError.builder()
            .status(HttpStatus.FORBIDDEN)
            .message("Die Anfrage konnte nicht bearbeitet werden, da Sie für die angeforderte Resource keine ausreichenden Berechtigungen besitzen!")
            .timestamp(LocalDateTime.now())
            .parent(parent)
            .build();
    }

    public void throwNow() throws ApiErrorException {
        throw new ApiErrorException(this);
    }

    public void throwNow(Throwable throwable) throws ApiErrorException {
        throw new ApiErrorException(this, throwable);
    }

    public ApiError withAdditionalInformation(Map<String, Object> additionalInformation) {
        if (this.additionalInformation == null) {
            this.additionalInformation = new ArrayList<>();
        }
        this.additionalInformation.add(additionalInformation);
        return this;
    }

    public ApiErrorException asException() {
        return new ApiErrorException(this);
    }


}
