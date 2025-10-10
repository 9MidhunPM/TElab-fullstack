package com.etlabapp.backend.controller;

import com.etlabapp.backend.service.EtlabApiService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/app")
public class AttendanceController {

    private static final Logger logger = LoggerFactory.getLogger(AttendanceController.class);

    @Autowired
    private EtlabApiService etlabApiService;

    @GetMapping("/attendance")
    public ResponseEntity<?> getAttendance() {
        try {
            // Verify JWT authentication
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body("Unauthorized: Valid JWT token required");
            }

            String username = authentication.getName();
            logger.info("Fetching attendance for authenticated user: {}", username);

            // Fetch attendance data from EtlabApiService
            JsonNode attendanceData = etlabApiService.getAttendance();
            
            if (attendanceData == null) {
                return ResponseEntity.status(500).body("Failed to fetch attendance from external API");
            }

            // Create the response structure
            ObjectMapper mapper = new ObjectMapper();
            ObjectNode response = mapper.createObjectNode();

            // Process subject-wise attendance data
            if (attendanceData.isObject()) {
                attendanceData.fieldNames().forEachRemaining(fieldName -> {
                    JsonNode fieldValue = attendanceData.get(fieldName);
                    
                    // Check if this is a subject code (not metadata fields)
                    if (!isMetadataField(fieldName) && fieldValue.isObject()) {
                        ObjectNode subjectData = mapper.createObjectNode();
                        subjectData.put("attendance_percentage", getStringValue(fieldValue, "attendance_percentage"));
                        subjectData.put("present_hours", getStringValue(fieldValue, "present_hours"));
                        subjectData.put("total_hours", getStringValue(fieldValue, "total_hours"));
                        response.set(fieldName, subjectData);
                    }
                });
            }

            // Add metadata fields
            response.put("roll_no", getStringValue(attendanceData, "roll_no"));
            response.put("total_hours", getStringValue(attendanceData, "total_hours"));
            response.put("total_present_hours", getStringValue(attendanceData, "total_present_hours"));
            response.put("total_percentage", getStringValue(attendanceData, "total_percentage"));
            response.put("university_reg_no", getStringValue(attendanceData, "university_reg_no"));
            response.put("name", getStringValue(attendanceData, "name"));
            response.put("note", "ETLab attendance displays current semester subjects only, not filtered by requested semester");

            logger.info("Successfully processed attendance data for user: {}", username);
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            logger.error("Authentication error: {}", e.getMessage());
            return ResponseEntity.status(401).body("Authentication required: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error fetching attendance: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    /**
     * Helper method to safely extract string values from JsonNode
     */
    private String getStringValue(JsonNode node, String fieldName) {
        JsonNode fieldNode = node.get(fieldName);
        if (fieldNode == null || fieldNode.isNull()) {
            return null;
        }
        return fieldNode.asText();
    }

    /**
     * Helper method to identify metadata fields vs subject codes
     */
    private boolean isMetadataField(String fieldName) {
        return fieldName.equals("roll_no") || 
               fieldName.equals("total_hours") || 
               fieldName.equals("total_present_hours") || 
               fieldName.equals("total_percentage") || 
               fieldName.equals("university_reg_no") || 
               fieldName.equals("name") || 
               fieldName.equals("note");
    }
}