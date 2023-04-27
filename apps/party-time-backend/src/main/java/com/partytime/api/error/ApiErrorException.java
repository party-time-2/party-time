package com.partytime.api.error;

/**
 * Base Exception Class for handleable Api Errors </br>
 * See {@link ApiErrorExceptionHandler} for Handling
 */
public class ApiErrorException extends RuntimeException {

    private final ApiError apiError;

    ApiErrorException(ApiError apiError) {
        super(apiError.getMessage());
        this.apiError = apiError;
    }

    ApiErrorException(ApiError apiError, Throwable t) {
        super(apiError.getMessage(), t);
        this.apiError = apiError;
    }

    public ApiError getApiError() {
        return apiError;
    }

}
