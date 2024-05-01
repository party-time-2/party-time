package com.partytime.api.error

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonInclude
import org.springframework.http.HttpStatus
import java.io.Serializable
import java.time.ZoneOffset
import java.time.ZonedDateTime


class ApiError private constructor(
    val status: HttpStatus,
    val message: String,
    @JsonIgnore
    val parent: Throwable? = null,
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    val additionalInformation: List<Map<String, Any>>? = null
) : Serializable {
    companion object {

        fun notFound(
            message: String,
            parent: Throwable? = null,
        ) = ApiError(
            HttpStatus.NOT_FOUND,
            message,
            parent
        )

        fun badRequest(message: String, parent: Throwable? = null) = ApiError(
            HttpStatus.BAD_REQUEST,
            message,
            parent
        )

        fun unauthorized(message: String? = null) = ApiError(
            HttpStatus.UNAUTHORIZED,
            message
                ?: "Die Anfrage konnte nicht bearbeitet werden, da keine gültigen Authentifizierungsdaten für die angeforderte Ressource vorliegen!",
        )

        fun forbidden(parent: Throwable? = null) = ApiError(
            HttpStatus.FORBIDDEN,
            "Die Anfrage konnte nicht bearbeitet werden, da Sie für die angeforderte Resource keine ausreichenden Berechtigungen besitzen!",
            parent
        )

        fun conflict(message: String, parent: Throwable, additionalInformation: List<Map<String, Any>>) = ApiError(
            HttpStatus.CONFLICT,
            message,
            parent,
            additionalInformation
        )

        fun arbitraryCode(status: HttpStatus, message: String, parent: Throwable) = ApiError(
            status,
            message,
            parent
        )

    }

    val timeStamp: ZonedDateTime = ZonedDateTime.now(ZoneOffset.UTC)
}
