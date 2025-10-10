package com.etlabapp.backend.model;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Standardized error response structure for all API endpoints
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {
    private boolean error;
    private String message;
    private String timestamp;
    private String path;
    private Integer status;

    public ErrorResponse() {
        this.error = true;
        this.timestamp = java.time.Instant.now().toString();
    }

    public ErrorResponse(String message) {
        this();
        this.message = message;
    }

    public ErrorResponse(String message, String path, Integer status) {
        this(message);
        this.path = path;
        this.status = status;
    }

    // Getters and Setters
    public boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}