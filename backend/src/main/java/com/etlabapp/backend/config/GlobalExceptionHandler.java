package com.etlabapp.backend.config;

import com.etlabapp.backend.exception.AuthenticationException;
import com.etlabapp.backend.exception.DataProcessingException;
import com.etlabapp.backend.exception.EtlabApiException;
import com.etlabapp.backend.model.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.context.request.WebRequest;

/**
 * Global exception handler for all controllers
 * Ensures clean, structured JSON responses for all errors
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Handle ETLab API specific exceptions
     */
    @ExceptionHandler(EtlabApiException.class)
    public ResponseEntity<ErrorResponse> handleEtlabApiException(EtlabApiException ex, WebRequest request) {
        logger.warn("ETLab API Error: {} - Technical details: {}", ex.getUserMessage(), ex.getTechnicalDetails());
        
        ErrorResponse errorResponse = new ErrorResponse(
            ex.getUserMessage(),
            getRequestPath(request),
            HttpStatus.BAD_REQUEST.value()
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle authentication related exceptions
     */
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException ex, WebRequest request) {
        logger.warn("Authentication Error: {}", ex.getMessage());
        
        ErrorResponse errorResponse = new ErrorResponse(
            "Authentication failed. Please check your credentials and try again.",
            getRequestPath(request),
            HttpStatus.UNAUTHORIZED.value()
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    /**
     * Handle data processing exceptions
     */
    @ExceptionHandler(DataProcessingException.class)
    public ResponseEntity<ErrorResponse> handleDataProcessingException(DataProcessingException ex, WebRequest request) {
        logger.warn("Data Processing Error: {}", ex.getMessage());
        
        ErrorResponse errorResponse = new ErrorResponse(
            "Failed to process data. Please try again later.",
            getRequestPath(request),
            HttpStatus.INTERNAL_SERVER_ERROR.value()
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Handle HTTP client errors (4xx) from external APIs
     */
    @ExceptionHandler(HttpClientErrorException.class)
    public ResponseEntity<ErrorResponse> handleHttpClientErrorException(HttpClientErrorException ex, WebRequest request) {
        logger.warn("External API Client Error: {} - Status: {}", ex.getMessage(), ex.getStatusCode());
        
        String userMessage = switch (ex.getStatusCode().value()) {
            case 401 -> "Authentication failed with external service. Please login again.";
            case 403 -> "Access denied. You don't have permission to access this resource.";
            case 404 -> "Requested data not found.";
            case 429 -> "Too many requests. Please try again later.";
            default -> "External service error. Please try again later.";
        };
        
        ErrorResponse errorResponse = new ErrorResponse(
            userMessage,
            getRequestPath(request),
            HttpStatus.BAD_REQUEST.value()
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle HTTP server errors (5xx) from external APIs
     */
    @ExceptionHandler(HttpServerErrorException.class)
    public ResponseEntity<ErrorResponse> handleHttpServerErrorException(HttpServerErrorException ex, WebRequest request) {
        logger.error("External API Server Error: {} - Status: {}", ex.getMessage(), ex.getStatusCode());
        
        ErrorResponse errorResponse = new ErrorResponse(
            "External service is temporarily unavailable. Please try again later.",
            getRequestPath(request),
            HttpStatus.SERVICE_UNAVAILABLE.value()
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.SERVICE_UNAVAILABLE);
    }

    /**
     * Handle network/connectivity issues
     */
    @ExceptionHandler(ResourceAccessException.class)
    public ResponseEntity<ErrorResponse> handleResourceAccessException(ResourceAccessException ex, WebRequest request) {
        logger.error("Network/Connectivity Error: {}", ex.getMessage());
        
        ErrorResponse errorResponse = new ErrorResponse(
            "Network connection error. Please check your connection and try again.",
            getRequestPath(request),
            HttpStatus.SERVICE_UNAVAILABLE.value()
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.SERVICE_UNAVAILABLE);
    }

    /**
     * Handle IllegalArgumentException
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
        logger.warn("Invalid Argument: {}", ex.getMessage());
        
        ErrorResponse errorResponse = new ErrorResponse(
            "Invalid request parameters. Please check your input and try again.",
            getRequestPath(request),
            HttpStatus.BAD_REQUEST.value()
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle NullPointerException
     */
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ErrorResponse> handleNullPointerException(NullPointerException ex, WebRequest request) {
        logger.error("Null Pointer Error in request: {}", getRequestPath(request));
        
        ErrorResponse errorResponse = new ErrorResponse(
            "Internal processing error. Please try again later.",
            getRequestPath(request),
            HttpStatus.INTERNAL_SERVER_ERROR.value()
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Handle all other RuntimeExceptions
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex, WebRequest request) {
        logger.error("Runtime Error: {} in request: {}", ex.getMessage(), getRequestPath(request));
        
        ErrorResponse errorResponse = new ErrorResponse(
            "An unexpected error occurred. Please try again later.",
            getRequestPath(request),
            HttpStatus.INTERNAL_SERVER_ERROR.value()
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Handle all other unexpected exceptions
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex, WebRequest request) {
        logger.error("Unexpected Error: {} in request: {}", ex.getMessage(), getRequestPath(request));
        
        ErrorResponse errorResponse = new ErrorResponse(
            "An unexpected error occurred. Please try again later.",
            getRequestPath(request),
            HttpStatus.INTERNAL_SERVER_ERROR.value()
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Extract request path from WebRequest
     */
    private String getRequestPath(WebRequest request) {
        try {
            return request.getDescription(false).replace("uri=", "");
        } catch (Exception e) {
            return "unknown";
        }
    }
}