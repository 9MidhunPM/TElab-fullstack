package com.etlabapp.backend.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.etlabapp.backend.model.*;
import com.etlabapp.backend.exception.EtlabApiException;
import com.etlabapp.backend.exception.AuthenticationException;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
public class EtlabApiService {
    private static final Logger logger = LoggerFactory.getLogger(EtlabApiService.class);
    
    @Value("${app.etlab.api-base-url}")
    private String apiBaseUrl;
    
    private final RestTemplate restTemplate = new RestTemplate();
    
    // Thread-safe map to store user-specific ETLab tokens
    private final Map<String, UserSession> userSessions = new ConcurrentHashMap<>();
    
    /**
     * Inner class to hold user session data
     */
    private static class UserSession {
        private String etlabToken;
        private String username;
        private String password;
        private String jwtToken; 
        private long lastActivity;
        
        public UserSession(String etlabToken, String username, String password, String jwtToken) {
            this.etlabToken = etlabToken;
            this.username = username;
            this.password = password;
            this.jwtToken = jwtToken;
            this.lastActivity = System.currentTimeMillis();
        }

        public void updateActivity() {
            this.lastActivity = System.currentTimeMillis();
        }
        
        // Getters
        public String getEtlabToken() { return etlabToken; }
        public String getUsername() { return username; }
        public String getPassword() { return password; }
        public long getLastActivity() { return lastActivity; }
        public String getJwtToken() { return jwtToken; }
        
        // Setters
        public void setEtlabToken(String etlabToken) { this.etlabToken = etlabToken; }
    }
    /**
     * Get valid JWT token for user if exists
     */
    public String getValidTokenForUser(String username) {
        UserSession session = userSessions.get(username);
        if (session != null && session.getJwtToken() != null) {
            return session.getJwtToken();
        }
        return null;
    }

    /**
     * Updated createUserSession to store JWT token
     */
    public void createUserSession(String jwtUsername, String etlabToken, String password, String jwtToken) {
        UserSession session = new UserSession(etlabToken, jwtUsername, password, jwtToken);
        userSessions.put(jwtUsername, session);
        logger.info("Created user session with JWT token for user: {}", jwtUsername);
    }

    /**
     * Invalidate user session (for logout)
     */
    public void invalidateUserSession(String username) {
        userSessions.remove(username);
        logger.info("Invalidated session for user: {}", username);
    }
    /**
     * Get the current authenticated username from JWT context
     */
    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AuthenticationException("No authenticated user found");
        }
        return authentication.getName();
    }

    /**
     * Get the current user's ETLab session
     */
    private UserSession getCurrentUserSession() {
        String username = getCurrentUsername();
        UserSession session = userSessions.get(username);
        
        if (session == null) {
            throw new AuthenticationException("No ETLab session found for user. Please login first.");
        }
        
        session.updateActivity();
        return session;
    }

    /**
     * Login method - stores credentials and ETLab token for the current user
     */
    public String login(String username, String password) {
        try {
            LoginRequest loginRequest = new LoginRequest();
            loginRequest.setUsername(username);
            loginRequest.setPassword(password);

            TokenResponse response = restTemplate.postForObject(
                apiBaseUrl + "/login",
                loginRequest,
                TokenResponse.class
            );

            if (response != null && response.getToken() != null) {
                // Store the ETLab token and credentials for this user
                String currentJwtUsername = getCurrentUsername();
                UserSession session = new UserSession(response.getToken(), username, password, null);
                userSessions.put(currentJwtUsername, session);
                
                logger.info("Successfully authenticated user {} with ETLab API", currentJwtUsername);
                return response.getToken();
            } else {
                throw new AuthenticationException("Invalid credentials or empty response from login service");
            }
        } catch (HttpClientErrorException e) {
            logger.warn("Login failed for user {} with client error: {}", username, e.getStatusCode());
            throw new AuthenticationException("Invalid username or password");
        } catch (HttpServerErrorException e) {
            logger.error("Login failed with server error: {}", e.getStatusCode());
            throw new EtlabApiException("Login service temporarily unavailable", "Server error: " + e.getStatusCode());
        } catch (ResourceAccessException e) {
            logger.error("Login failed with network error: {}", e.getMessage());
            throw new EtlabApiException("Unable to connect to login service", e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error during login: {}", e.getMessage());
            throw new EtlabApiException("Login failed due to unexpected error", e.getMessage());
        }
    }

    /**
     * Authenticate with ETLab API without JWT context (for login)
     */
    public String authenticateWithETLab(String username, String password) {
        try {
            // Validate input parameters
            if (username == null || username.trim().isEmpty()) {
                logger.warn("Authentication attempt with empty username");
                throw new AuthenticationException("Username cannot be empty");
            }
            if (password == null || password.trim().isEmpty()) {
                logger.warn("Authentication attempt with empty password for user: {}", username);
                throw new AuthenticationException("Password cannot be empty");
            }
            
            LoginRequest loginRequest = new LoginRequest();
            loginRequest.setUsername(username.trim());
            loginRequest.setPassword(password);

            logger.info("Attempting authentication with ETLab API for user: {}", username);
            
            TokenResponse response = restTemplate.postForObject(
                apiBaseUrl + "/login",
                loginRequest,
                TokenResponse.class
            );

            logger.info("ETLab API response received for user {}: {}", username, 
                       response != null ? "response received" : "null response");

            if (response != null && response.getToken() != null && !response.getToken().trim().isEmpty()) {
                String token = response.getToken().trim();
                
                // ADDITIONAL VALIDATION: Test the token by making a test API call
                try {
                    HttpHeaders testHeaders = new HttpHeaders();
                    testHeaders.set("Authorization", "Bearer " + token);
                    HttpEntity<String> testEntity = new HttpEntity<>(testHeaders);
                    
                    logger.info("Validating received token for user {} by testing with profile endpoint", username);
                    
                    // Try to fetch profile with the received token to validate it's actually valid
                    ResponseEntity<Object> testResponse = restTemplate.exchange(
                        apiBaseUrl + "/profile",
                        HttpMethod.GET,
                        testEntity,
                        Object.class
                    );
                    
                    if (testResponse.getStatusCode().is2xxSuccessful()) {
                        logger.info("Token validation successful for user {} - credentials are valid", username);
                        return token;
                    } else {
                        logger.warn("Token validation failed for user {} - received token is invalid", username);
                        throw new AuthenticationException("Invalid username or password");
                    }
                    
                } catch (HttpClientErrorException testError) {
                    if (testError.getStatusCode().value() == 401) {
                        logger.warn("Token validation failed for user {} - received token is invalid (401)", username);
                        throw new AuthenticationException("Invalid username or password");
                    } else {
                        logger.warn("Token validation error for user {}: {}", username, testError.getStatusCode());
                        throw new AuthenticationException("Invalid username or password");
                    }
                } catch (Exception testError) {
                    logger.warn("Token validation failed for user {} due to error: {}", username, testError.getMessage());
                    throw new AuthenticationException("Invalid username or password");
                }
            } else {
                logger.warn("ETLab API returned empty or null token for user: {}", username);
                throw new AuthenticationException("Invalid username or password");
            }
        } catch (HttpClientErrorException e) {
            // Handle specific HTTP client errors (401, 403, etc.)
            logger.warn("HTTP client error for user {}: Status={}, Body={}", username, e.getStatusCode(), e.getResponseBodyAsString());
            
            if (e.getStatusCode().value() == 401) {
                logger.warn("Authentication failed for user {} - Invalid credentials: {}", username, e.getStatusCode());
                throw new AuthenticationException("Invalid username or password");
            } else if (e.getStatusCode().value() == 403) {
                logger.warn("Authentication failed for user {} - Access forbidden: {}", username, e.getStatusCode());
                throw new AuthenticationException("Access denied");
            } else if (e.getStatusCode().value() == 429) {
                logger.warn("Authentication failed for user {} - Too many requests: {}", username, e.getStatusCode());
                throw new EtlabApiException("Too many login attempts. Please try again later.", "Rate limit exceeded");
            } else {
                logger.warn("Authentication failed for user {} with client error: {}", username, e.getStatusCode());
                throw new AuthenticationException("Invalid username or password");
            }
        } catch (HttpServerErrorException e) {
            logger.error("ETLab API server error during authentication for user {}: {}", username, e.getStatusCode());
            throw new EtlabApiException("Authentication service temporarily unavailable", "Server error: " + e.getStatusCode());
        } catch (ResourceAccessException e) {
            logger.error("Network error during authentication for user {}: {}", username, e.getMessage());
            throw new EtlabApiException("Unable to connect to authentication service", e.getMessage());
        } catch (AuthenticationException e) {
            // Re-throw our custom authentication exceptions
            throw e;
        } catch (EtlabApiException e) {
            // Re-throw our custom API exceptions
            throw e;
        } catch (Exception e) {
            logger.error("Unexpected error during ETLab authentication for user {}: {}", username, e.getMessage());
            throw new EtlabApiException("Authentication failed due to unexpected error", e.getMessage());
        }
    }
    /**
     * Automatically re-authenticate if ETLab token is invalid
     */
    private void reAuthenticateIfNeeded(UserSession session) {
        try {
            // Try to re-login with stored credentials
            LoginRequest loginRequest = new LoginRequest();
            loginRequest.setUsername(session.getUsername());
            loginRequest.setPassword(session.getPassword());

            TokenResponse response = restTemplate.postForObject(
                apiBaseUrl + "/login",
                loginRequest,
                TokenResponse.class
            );

            if (response != null && response.getToken() != null) {
                session.setEtlabToken(response.getToken());
                logger.info("Successfully re-authenticated user {}", getCurrentUsername());
            } else {
                throw new AuthenticationException("Re-authentication failed");
            }
        } catch (Exception e) {
            logger.error("Re-authentication failed for user {}: {}", getCurrentUsername(), e.getMessage());
            throw new AuthenticationException("Session expired and re-authentication failed. Please login again.");
        }
    }
    /**
     * Execute authenticated API call with automatic re-authentication
     */
    private <T> ResponseEntity<T> executeAuthenticatedCall(String endpoint, Class<T> responseType) {
        UserSession session = getCurrentUserSession();
        
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + session.getEtlabToken());
            HttpEntity<String> entity = new HttpEntity<>(headers);

            return restTemplate.exchange(
                apiBaseUrl + endpoint,
                HttpMethod.GET,
                entity,
                responseType
            );
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().value() == 401) {
                logger.info("ETLab token expired for user {}, attempting re-authentication", getCurrentUsername());
                // Try to re-authenticate once
                reAuthenticateIfNeeded(session);
                
                // Retry the call with new token
                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization", "Bearer " + session.getEtlabToken());
                HttpEntity<String> entity = new HttpEntity<>(headers);

                return restTemplate.exchange(
                    apiBaseUrl + endpoint,
                    HttpMethod.GET,
                    entity,
                    responseType
                );
            }
            throw e;
        }
    }

    public StudentProfile getStudentProfile() {
        try {
            ResponseEntity<StudentProfile> response = executeAuthenticatedCall("/profile", StudentProfile.class);
            
            if (response.getBody() != null) {
                return response.getBody();
            } else {
                throw new EtlabApiException("Profile data not available", "Empty response from profile service");
            }
        } catch (HttpClientErrorException e) {
            throw new EtlabApiException("Failed to fetch profile data", "Client error: " + e.getStatusCode());
        } catch (HttpServerErrorException e) {
            throw new EtlabApiException("Profile service temporarily unavailable", "Server error: " + e.getStatusCode());
        } catch (ResourceAccessException e) {
            throw new EtlabApiException("Unable to connect to profile service", e.getMessage());
        }
    }

    public JsonNode getResults() {
        try {
            ResponseEntity<JsonNode> response = executeAuthenticatedCall("/results", JsonNode.class);
            return response.getBody();
        } catch (HttpClientErrorException e) {
            throw new EtlabApiException("Failed to fetch results data", "Client error: " + e.getStatusCode());
        } catch (HttpServerErrorException e) {
            throw new EtlabApiException("Results service temporarily unavailable", "Server error: " + e.getStatusCode());
        } catch (ResourceAccessException e) {
            throw new EtlabApiException("Unable to connect to results service", e.getMessage());
        }
    }

    public JsonNode getAttendance() {
        try {
            ResponseEntity<JsonNode> response = executeAuthenticatedCall("/attendance", JsonNode.class);
            return response.getBody();
        } catch (HttpClientErrorException e) {
            throw new EtlabApiException("Failed to fetch attendance data", "Client error: " + e.getStatusCode());
        } catch (HttpServerErrorException e) {
            throw new EtlabApiException("Attendance service temporarily unavailable", "Server error: " + e.getStatusCode());
        } catch (ResourceAccessException e) {
            throw new EtlabApiException("Unable to connect to attendance service", e.getMessage());
        }
    }

    public JsonNode getTimetable() {
        try {
            ResponseEntity<JsonNode> response = executeAuthenticatedCall("/timetable", JsonNode.class);
            return response.getBody();
        } catch (HttpClientErrorException e) {
            throw new EtlabApiException("Failed to fetch timetable data", "Client error: " + e.getStatusCode());
        } catch (HttpServerErrorException e) {
            throw new EtlabApiException("Timetable service temporarily unavailable", "Server error: " + e.getStatusCode());
        } catch (ResourceAccessException e) {
            throw new EtlabApiException("Unable to connect to timetable service", e.getMessage());
        }
    }

    public JsonNode getEndSemResults() {
        try {
            ResponseEntity<JsonNode> response = executeAuthenticatedCall("/end-semester-results", JsonNode.class);
            return response.getBody();
        } catch (HttpClientErrorException e) {
            throw new EtlabApiException("Failed to fetch end semester results", "Client error: " + e.getStatusCode());
        } catch (HttpServerErrorException e) {
            throw new EtlabApiException("End semester results service temporarily unavailable", "Server error: " + e.getStatusCode());
        } catch (ResourceAccessException e) {
            throw new EtlabApiException("Unable to connect to end semester results service", e.getMessage());
        }
    }

    /**
     * Logout method - removes user session
     */
    public void logout() {
        String username = getCurrentUsername();
        userSessions.remove(username);
        logger.info("User {} logged out and session cleaned", username);
    }

    /**
     * Clean up expired sessions (can be called by a scheduled task)
     */
    public void cleanupExpiredSessions() {
        long currentTime = System.currentTimeMillis();
        long sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours

        userSessions.entrySet().removeIf(entry -> {
            boolean expired = (currentTime - entry.getValue().getLastActivity()) > sessionTimeout;
            if (expired) {
                logger.info("Cleaned up expired session for user: {}", entry.getKey());
            }
            return expired;
        });
    }

    /**
     * Get session info for debugging (admin only)
     */
    public Map<String, Object> getSessionInfo() {
        String username = getCurrentUsername();
        UserSession session = userSessions.get(username);
        
        if (session == null) {
            return Map.of("authenticated", false);
        }
        
        return Map.of(
            "authenticated", true,
            "username", username,
            "etlabUsername", session.getUsername(),
            "lastActivity", session.getLastActivity(),
            "sessionCount", userSessions.size()
        );
    }
}