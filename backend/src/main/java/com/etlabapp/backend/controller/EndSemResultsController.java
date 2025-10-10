package com.etlabapp.backend.controller;

import com.etlabapp.backend.service.EtlabApiService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
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
public class EndSemResultsController {

    private static final Logger logger = LoggerFactory.getLogger(EndSemResultsController.class);

    @Autowired
    private EtlabApiService etlabApiService;

    @GetMapping("/end-sem-results")
    public ResponseEntity<?> getEndSemResults() {
        try {
            // Verify JWT authentication (optional based on your security config)
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication != null ? authentication.getName() : "anonymous";
            logger.info("Fetching end semester results for user: {}", username);

            // Fetch end semester results data from EtlabApiService
            JsonNode rawEndSemResults = etlabApiService.getEndSemResults();
            
            if (rawEndSemResults == null) {
                return ResponseEntity.status(500).body("Failed to fetch end semester results from external API");
            }

            // Process and merge the data
            JsonNode mergedResults = mergeEndSemResultsWithGrades(rawEndSemResults);

            logger.info("Successfully processed end semester results for user: {}", username);
            return ResponseEntity.ok(mergedResults);

        } catch (RuntimeException e) {
            logger.error("Authentication or API error: {}", e.getMessage());
            return ResponseEntity.status(401).body("Authentication required: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error fetching end semester results: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    /**
     * Merge end_semester_exams with corresponding results from available_links using list order
     * First exam matches first link, second exam matches second link, etc.
     */
    private JsonNode mergeEndSemResultsWithGrades(JsonNode rawData) {
        ObjectMapper mapper = new ObjectMapper();
        ArrayNode mergedResults = mapper.createArrayNode();

        // Get the two main arrays from the raw data
        JsonNode endSemesterExams = rawData.get("end_semester_exams");
        JsonNode availableLinks = rawData.get("available_links");

        if (endSemesterExams == null || !endSemesterExams.isArray()) {
            logger.warn("end_semester_exams not found or not an array");
            return mergedResults; // Return empty array
        }

        // Process each end semester exam by index
        for (int i = 0; i < endSemesterExams.size(); i++) {
            JsonNode exam = endSemesterExams.get(i);
            ObjectNode mergedExam = mapper.createObjectNode();

            // Copy all exam information (admission_batch, exam_title, semester, year, etc.)
            copyExamInfo(exam, mergedExam);

            // Find corresponding grades by index (order-based matching)
            JsonNode grades = findGradesByIndex(i, availableLinks, mapper);
            mergedExam.set("grades", grades);

            mergedResults.add(mergedExam);
        }

        return mergedResults;
    }

    /**
     * Copy all fields from the exam object to the merged exam object
     */
    private void copyExamInfo(JsonNode sourceExam, ObjectNode targetExam) {
        sourceExam.fieldNames().forEachRemaining(fieldName -> {
            targetExam.set(fieldName, sourceExam.get(fieldName));
        });
    }

    /**
     * Find grades for a specific exam by index (order-based matching)
     * Returns the results object from the corresponding available_links item, or an error object if not found/failed
     */
    private JsonNode findGradesByIndex(int index, JsonNode availableLinks, ObjectMapper mapper) {
        // Check if availableLinks exists and has enough items
        if (availableLinks == null || !availableLinks.isArray() || index >= availableLinks.size()) {
            return createErrorGrades("Results not available - no corresponding link found", null, mapper);
        }

        JsonNode link = availableLinks.get(index);
        if (link == null) {
            return createErrorGrades("Results not available - link is null", null, mapper);
        }

        // Check if the link has a results object
        JsonNode results = link.get("results");
        if (results == null) {
            return createErrorGrades("Results not available - no results in link", link, mapper);
        }

        // Check if the results contain an error
        if (hasError(results)) {
            String errorMessage = getStringValue(results, "message");
            if (errorMessage == null || errorMessage.trim().isEmpty()) {
                errorMessage = "Results contain an error";
            }
            return createErrorGrades(errorMessage, results, mapper);
        }

        // Return the valid results
        return results;
    }

    /**
     * Create an error grades object with appropriate message and original data
     */
    private JsonNode createErrorGrades(String message, JsonNode originalData, ObjectMapper mapper) {
        ObjectNode errorGrades = mapper.createObjectNode();
        errorGrades.put("error", true);
        errorGrades.put("message", message);
        
        if (originalData != null) {
            errorGrades.set("original_response", originalData);
        }
        
        return errorGrades;
    }

    /**
     * Check if the grades object contains an error
     */
    private boolean hasError(JsonNode grades) {
        // Check for common error indicators
        JsonNode error = grades.get("error");
        if (error != null && (error.isBoolean() && error.asBoolean() || 
                             error.isTextual() && !error.asText().isEmpty())) {
            return true;
        }
        
        // Check for error message
        JsonNode message = grades.get("message");
        if (message != null && message.isTextual()) {
            String msg = message.asText().toLowerCase();
            if (msg.contains("error") || msg.contains("failed") || msg.contains("not found")) {
                return true;
            }
        }
        
        // Check for common error status codes or indicators
        JsonNode status = grades.get("status");
        if (status != null && status.isTextual()) {
            String statusText = status.asText().toLowerCase();
            if (statusText.contains("error") || statusText.contains("fail")) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Helper method to safely extract string values from JsonNode
     */
    private String getStringValue(JsonNode node, String fieldName) {
        if (node == null) {
            return null;
        }
        JsonNode fieldNode = node.get(fieldName);
        if (fieldNode == null || fieldNode.isNull()) {
            return null;
        }
        return fieldNode.asText();
    }
}