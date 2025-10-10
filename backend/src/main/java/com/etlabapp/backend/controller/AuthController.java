package com.etlabapp.backend.controller;

import com.etlabapp.backend.model.LoginRequest;
import com.etlabapp.backend.model.TokenResponse;
import com.etlabapp.backend.security.JwtUtil;
import com.etlabapp.backend.service.EtlabApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EtlabApiService etlabApiService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // For now, use simple authentication with the etlab service
            // In a real application, you'd authenticate against a user database
            String result = etlabApiService.login(loginRequest.getUsername(), loginRequest.getPassword());
            
            if (result != null && !result.contains("error")) {
                // Generate JWT token
                String token = jwtUtil.generateToken(loginRequest.getUsername());
                
                TokenResponse tokenResponse = new TokenResponse(
                    token,
                    "Bearer",
                    loginRequest.getUsername(),
                    System.currentTimeMillis() + 86400000 // 24 hours
                );
                
                return ResponseEntity.ok(tokenResponse);
            } else {
                return ResponseEntity.badRequest().body("Invalid credentials");
            }
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Authentication failed: " + e.getMessage());
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                if (jwtUtil.validateToken(token)) {
                    String username = jwtUtil.extractUsername(token);
                    return ResponseEntity.ok().body("Token is valid for user: " + username);
                }
            }
            return ResponseEntity.badRequest().body("Invalid token");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Token validation failed: " + e.getMessage());
        }
    }
}