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

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/app")
public class TimetableController {

    private static final Logger logger = LoggerFactory.getLogger(TimetableController.class);
    
    // List of all possible days in the timetable
    private static final List<String> DAYS = Arrays.asList(
        "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
    );
    
    // List of all periods (1-7)
    private static final List<String> PERIODS = Arrays.asList(
        "period-1", "period-2", "period-3", "period-4", 
        "period-5", "period-6", "period-7"
    );

    @Autowired
    private EtlabApiService etlabApiService;

    @GetMapping("/timetable")
    public ResponseEntity<?> getTimetable() {
        try {
            // Verify JWT authentication (optional based on your security config)
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication != null ? authentication.getName() : "anonymous";
            logger.info("Fetching timetable for user: {}", username);

            // Fetch timetable data from EtlabApiService
            JsonNode rawTimetable = etlabApiService.getTimetable();
            
            if (rawTimetable == null) {
                return ResponseEntity.status(500).body("Failed to fetch timetable from external API");
            }

            // Clean and normalize the timetable
            JsonNode cleanedTimetable = cleanAndNormalizeTimetable(rawTimetable);

            logger.info("Successfully processed timetable for user: {}", username);
            return ResponseEntity.ok(cleanedTimetable);

        } catch (RuntimeException e) {
            logger.error("Authentication or API error: {}", e.getMessage());
            return ResponseEntity.status(401).body("Authentication required: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error fetching timetable: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    /**
     * Clean and normalize the timetable data
     * - Remove HTML from teacher and name fields
     * - Ensure all periods 1-7 exist for every day
     * - Set empty periods to have null name and teacher
     */
    private JsonNode cleanAndNormalizeTimetable(JsonNode rawTimetable) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode cleanedTimetable = mapper.createObjectNode();

        // Process each day that exists in the raw data
        for (String day : DAYS) {
            JsonNode dayData = rawTimetable.get(day);
            ObjectNode cleanedDay = mapper.createObjectNode();

            // Ensure all periods 1-7 exist for this day
            for (String period : PERIODS) {
                ObjectNode periodData = mapper.createObjectNode();

                if (dayData != null && dayData.has(period)) {
                    // Period exists in raw data - clean it
                    JsonNode rawPeriod = dayData.get(period);
                    
                    String name = cleanHtml(getStringValue(rawPeriod, "name"));
                    String teacher = cleanHtml(getStringValue(rawPeriod, "teacher"));
                    
                    // Set to null if empty or whitespace only
                    periodData.put("name", isEmptyOrNull(name) ? null : name);
                    periodData.put("teacher", isEmptyOrNull(teacher) ? null : teacher);
                } else {
                    // Period doesn't exist - create empty period
                    periodData.put("name", (String) null);
                    periodData.put("teacher", (String) null);
                }

                cleanedDay.set(period, periodData);
            }

            // Only add the day if it has any non-empty periods or exists in raw data
            if (dayData != null || hasNonEmptyPeriods(cleanedDay)) {
                cleanedTimetable.set(day, cleanedDay);
            }
        }

        return cleanedTimetable;
    }

    /**
     * Clean HTML tags and decode HTML entities from a string
     */
    private String cleanHtml(String input) {
        if (input == null) {
            return null;
        }
        
        // Remove HTML tags
        String cleaned = input.replaceAll("<[^>]*>", "");
        
        // Decode common HTML entities
        cleaned = cleaned.replace("&nbsp;", " ")
                        .replace("&amp;", "&")
                        .replace("&lt;", "<")
                        .replace("&gt;", ">")
                        .replace("&quot;", "\"")
                        .replace("&#39;", "'");
        
        // Trim whitespace
        cleaned = cleaned.trim();
        
        return cleaned;
    }

    /**
     * Check if a string is null, empty, or contains only whitespace
     */
    private boolean isEmptyOrNull(String str) {
        return str == null || str.trim().isEmpty();
    }

    /**
     * Check if a day has any non-empty periods
     */
    private boolean hasNonEmptyPeriods(ObjectNode dayData) {
        for (String period : PERIODS) {
            JsonNode periodData = dayData.get(period);
            if (periodData != null) {
                JsonNode name = periodData.get("name");
                JsonNode teacher = periodData.get("teacher");
                if ((name != null && !name.isNull()) || (teacher != null && !teacher.isNull())) {
                    return true;
                }
            }
        }
        return false;
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