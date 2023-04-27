package com.partytime.api.error;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice(annotations = RestController.class)
@Slf4j
@RequiredArgsConstructor
public class ApiErrorExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        ApiError apiError = ApiError.status("Validation failed for Parameter '" + ex.getParameter().getParameterName() + "'", HttpStatus.CONFLICT, ex);
        for (FieldError fieldError : ex.getFieldErrors()) {
            Map<String, Object> additionalInfo = new HashMap<>();
            additionalInfo.put("name", fieldError.getField());
            additionalInfo.put("rejectedValue", fieldError.getRejectedValue());
            additionalInfo.put("message", fieldError.getDefaultMessage());
            apiError = apiError.withAdditionalInformation(additionalInfo);
        }
        return handleApiError(apiError);
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
        return handleApiError(ApiError.status(ex.getMessage(), HttpStatus.valueOf(statusCode.value()), ex));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDenied(AccessDeniedException exception, WebRequest webRequest) {
        return handleApiError(ApiError.forbidden(exception));
    }

    @ExceptionHandler(ApiErrorException.class)
    public ResponseEntity<Object> handleApiErrorException(ApiErrorException exception, WebRequest webRequest) {
        return handleApiError(exception.getApiError());
    }

    /**
     * Builds a {@link ResponseEntity} with the given http Status and the Object from api error
     *
     * @param apiError The Error to return
     * @return the built response entity
     */
    public ResponseEntity<Object> handleApiError(ApiError apiError) {
        if (apiError.getParent() == null) {
            log.error(apiError.getMessage());
        } else {
            log.error(apiError.getMessage(), apiError.getParent());
        }
        return ResponseEntity.status(apiError.getStatus())
            .body(apiError);
    }

}
