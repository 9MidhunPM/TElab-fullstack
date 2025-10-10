package com.etlabapp.backend.model;

public class TokenResponse {
    private String token;
    private String type;
    private String username;
    private long expiresAt;

    public TokenResponse() {}

    public TokenResponse(String token, String type, String username, long expiresAt) {
        this.token = token;
        this.type = type;
        this.username = username;
        this.expiresAt = expiresAt;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public long getExpiresAt() { return expiresAt; }
    public void setExpiresAt(long expiresAt) { this.expiresAt = expiresAt; }
}
