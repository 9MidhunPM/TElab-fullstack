package com.etlabapp.backend.exception;

/**
 * Custom exception for data processing errors
 */
public class DataProcessingException extends RuntimeException {
    public DataProcessingException(String message) {
        super(message);
    }

    public DataProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}