package com.etlabapp.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.etlabapp.backend.model.LoginRequest;
import com.etlabapp.backend.model.StudentProfile;
import com.etlabapp.backend.model.TokenResponse;
import com.etlabapp.backend.security.JwtUtil;
import com.etlabapp.backend.service.EtlabApiService;
import com.etlabapp.backend.exception.AuthenticationException;  // ✅ ADD THIS
import com.etlabapp.backend.exception.EtlabApiException;          // ✅ ADD THIS TOO

@RestController
@RequestMapping("/app")
public class AppController {
    
    private static final Logger logger = LoggerFactory.getLogger(AppController.class);

    @Autowired
    private EtlabApiService etlabApiService;

    @Autowired
    private JwtUtil jwtUtil;
        
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // Validate input
            if (request.getUsername() == null || request.getUsername().trim().isEmpty() ||
                request.getPassword() == null || request.getPassword().trim().isEmpty()) {
                logger.warn("Login attempt with empty username or password");
                return ResponseEntity.status(401).body(Map.of(
                    "error", "Invalid username or password",
                    "message", "Username and password are required"
                ));
            }
            
            // Check for existing valid token first
            String existingToken = etlabApiService.getValidTokenForUser(request.getUsername());
            
            if (existingToken != null && jwtUtil.isTokenValid(existingToken)) {
                TokenResponse tokenResponse = new TokenResponse(
                    existingToken,
                    "Bearer",
                    request.getUsername(),
                    jwtUtil.getExpirationTimeFromToken(existingToken)
                );
                
                logger.info("Returned existing valid token for user: {}", request.getUsername());
                return ResponseEntity.ok(tokenResponse);
            }
            
            // Authenticate with ETLab - THIS WILL THROW AuthenticationException FOR WRONG CREDENTIALS
            String etlabToken = etlabApiService.authenticateWithETLab(request.getUsername(), request.getPassword());
            
            if (etlabToken != null) {
                // Generate JWT token ONLY after successful ETLab auth
                String jwtToken = jwtUtil.generateToken(request.getUsername());
                
                // Create session with the login username
                etlabApiService.createUserSession(request.getUsername(), etlabToken, request.getPassword(), jwtToken);
                
                TokenResponse tokenResponse = new TokenResponse(
                    jwtToken,
                    "Bearer",
                    request.getUsername(),
                    System.currentTimeMillis() + 86400000
                );
                
                logger.info("Successfully authenticated and created new token for user: {}", request.getUsername());
                return ResponseEntity.ok(tokenResponse);
            } else {
                // This shouldn't happen as authenticateWithETLab throws exception on failure
                logger.warn("Authentication failed for user: {} - null token returned", request.getUsername());
                return ResponseEntity.status(401).body(Map.of(
                    "error", "Invalid username or password",
                    "message", "Authentication failed"
                ));
            }
        } catch (AuthenticationException e) {
            logger.warn("Authentication failed for user {}: {}", request.getUsername(), e.getMessage());
            return ResponseEntity.status(401).body(Map.of(
                "error", "Invalid username or password",
                "message", "Please check your credentials and try again"
            ));
        } catch (EtlabApiException e) {
            logger.error("ETLab API error for user {}: {}", request.getUsername(), e.getMessage());
            return ResponseEntity.status(500).body(Map.of(
                "error", "Service temporarily unavailable",
                "message", "Please try again later"
            ));
        } catch (Exception e) {
            logger.error("Unexpected login error for user {}: {}", request.getUsername(), e.getMessage());
            return ResponseEntity.status(500).body(Map.of(
                "error", "Authentication failed",
                "message", "An unexpected error occurred"
            ));
        }
    }


    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        try {
            // Get authenticated user from SecurityContext (automatically set by JWT filter)
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body(Map.of("error", "Authentication required"));
            }

            // The service will automatically get the current user from SecurityContext
            StudentProfile profile = etlabApiService.getStudentProfile();

            Map<String, String> result = new HashMap<>();
            
            // Add null safety checks
            if (profile.getPersonalInfo() != null) {
                result.put("name", profile.getPersonalInfo().getName());
            }
            
            if (profile.getAdditionalInfo() != null) {
                result.put("mobileNumber", profile.getAdditionalInfo().getStudentMobileNo());
            }
            
            if (profile.getAcademicInfo() != null) {
                result.put("srNumber", profile.getAcademicInfo().getSrNumber());
                result.put("universityRegNo", profile.getAcademicInfo().getUniversityRegNo());
            }

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to fetch profile: " + e.getMessage()));
        }
    }
}
