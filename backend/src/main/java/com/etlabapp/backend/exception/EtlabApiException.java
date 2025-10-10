package com.etlabapp.backend.exception;

/**
 * Custom exception for ETLab API related errors
 */
public class EtlabApiException extends RuntimeException {
    private final String userMessage;
    private final String technicalDetails;

    public EtlabApiException(String userMessage) {
        super(userMessage);
        this.userMessage = userMessage;
        this.technicalDetails = null;
    }

    public EtlabApiException(String userMessage, String technicalDetails) {
        super(userMessage + " - " + technicalDetails);
        this.userMessage = userMessage;
        this.technicalDetails = technicalDetails;
    }

    public EtlabApiException(String userMessage, Throwable cause) {
        super(userMessage, cause);
        this.userMessage = userMessage;
        this.technicalDetails = cause.getMessage();
    }

    public String getUserMessage() {
        return userMessage;
    }

    public String getTechnicalDetails() {
        return technicalDetails;
    }
}