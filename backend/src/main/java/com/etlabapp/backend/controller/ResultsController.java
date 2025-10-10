package com.etlabapp.backend.controller;

import com.etlabapp.backend.model.SessionalExam;
import com.etlabapp.backend.service.EtlabApiService;
import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/app")
public class ResultsController {

    private static final Logger logger = LoggerFactory.getLogger(ResultsController.class);

    @Autowired
    private EtlabApiService etlabApiService;

    @GetMapping("/results")
    public ResponseEntity<?> getSessionalResults() {
        try {
            // Verify JWT authentication
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body("Unauthorized: Valid JWT token required");
            }

            String username = authentication.getName();
            logger.info("Fetching results for authenticated user: {}", username);

            // Fetch full results from EtlabApiService
            JsonNode fullResults = etlabApiService.getResults();
            
            if (fullResults == null) {
                return ResponseEntity.status(500).body("Failed to fetch results from external API");
            }

            // Extract sessional_exams array
            JsonNode sessionalExamsNode = fullResults.get("sessional_exams");
            
            if (sessionalExamsNode == null || !sessionalExamsNode.isArray()) {
                logger.warn("sessional_exams not found or not an array in API response");
                return ResponseEntity.ok(new ArrayList<SessionalExam>()); // Return empty list
            }

            // Convert JsonNode array to List<SessionalExam>
            List<SessionalExam> sessionalExams = new ArrayList<>();
            
            for (JsonNode examNode : sessionalExamsNode) {
                SessionalExam exam = new SessionalExam();
                
                // Map JSON fields to DTO fields (handle potential null values)
                exam.setSubjectName(getStringValue(examNode, "subject_name"));
                exam.setSubjectCode(getStringValue(examNode, "subject_code"));
                exam.setSemester(getStringValue(examNode, "semester"));
                exam.setMarksObtained(getStringValue(examNode, "marks_obtained"));
                exam.setMaximumMarks(getStringValue(examNode, "maximum_marks"));
                exam.setExam(getStringValue(examNode, "exam"));
                
                sessionalExams.add(exam);
            }

            logger.info("Successfully processed {} sessional exams for user: {}", sessionalExams.size(), username);
            return ResponseEntity.ok(sessionalExams);

        } catch (RuntimeException e) {
            logger.error("Authentication error: {}", e.getMessage());
            return ResponseEntity.status(401).body("Authentication required: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error fetching sessional results: {}", e.getMessage(), e);
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
}