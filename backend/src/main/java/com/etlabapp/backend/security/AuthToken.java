package com.etlabapp.backend.security;

import java.time.Instant;

public final class AuthToken {
    private final String token;
    private final String username;
    private final Instant expiry;

    public AuthToken(String token, String username, Instant expiry) {
        this.token = token;
        this.username = username;
        this.expiry = expiry;
    }

    public String getToken() { return token; }
    public String getUsername() { return username; }
    public Instant getExpiry() { return expiry; }

    public boolean isExpired() {
        return Instant.now().isAfter(expiry);
    }
}
