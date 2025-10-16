/**
 * AI API utility functions
 * Handles all communication with the AI service
 */

import Constants from 'expo-constants';

// Get AI API base URL from app.json extra config
const AI_BASE_URL = Constants.expoConfig?.extra?.aiBaseUrl || 'https://etlab-plus-ai-api.onrender.com';

// Validate that AI_BASE_URL is configured
if (!AI_BASE_URL) {
  console.error('ERROR: AI Base URL is not configured!');
  throw new Error('AI API URL not configured. Please set aiBaseUrl in app.json extra config.');
}

/**
 * Prepare attendance data by filtering metadata and converting to list
 * @param {Object} attendanceData - Raw attendance data from context
 * @returns {Array} List of subject objects
 */
export const prepareAttendanceData = (attendanceData) => {
  if (!attendanceData) return [];
  
  // Metadata fields to exclude
  const excludeKeys = [
    'name', 
    'roll_no', 
    'university_reg_no', 
    'total_percentage', 
    'total_present_hours', 
    'total_hours', 
    'note'
  ];
  
  // Convert attendance object to list of subject objects
  const subjectsList = Object.entries(attendanceData)
    .filter(([key]) => !excludeKeys.includes(key))
    .map(([subjectCode, subjectData]) => ({
      subject_code: subjectCode,
      ...subjectData
    }));
  
  return subjectsList;
};

/**
 * Prepare results data (already in list format)
 * @param {Array} resultsData - Raw results data from context
 * @returns {Array} List of exam objects
 */
export const prepareResultsData = (resultsData) => {
  return resultsData || [];
};

/**
 * Prepare data based on query type
 * @param {string} type - Type of data ('attendance' or 'results')
 * @param {Object} appData - Application data from context
 * @returns {Array} Prepared data list
 */
export const prepareDataForAI = (type, appData) => {
  if (type === 'attendance') {
    return prepareAttendanceData(appData.attendance);
  } else if (type === 'results') {
    return prepareResultsData(appData.results);
  }
  return [];
};

/**
 * Parse Gemini API response format
 * @param {Object} result - API response object
 * @returns {string} Extracted text response
 */
export const parseAIResponse = (result) => {
  // Try to parse Gemini API response format
  if (result.candidates && result.candidates.length > 0) {
    const candidate = result.candidates[0];
    if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
      return candidate.content.parts[0].text || 'No response received';
    }
  }
  
  // Fallback for other response formats
  if (result.response) {
    return result.response;
  }
  
  return 'No response received';
};

/**
 * Send request to AI API
 * @param {string} query - User's query or summary request
 * @param {string} queryType - Type of query ('attendance' or 'results')
 * @param {Object} appData - Application data from context
 * @returns {Promise<string>} AI response text
 * @throws {Error} If request fails
 */
export const sendAIRequest = async (query, queryType, appData) => {
  try {
    // Prepare data based on query type
    const data = prepareDataForAI(queryType, appData);
    
    const requestBody = {
      data: data,
      query: query
    };

    // Log request details for debugging
    // Uncomment for debugging:
    // console.log('AI Request:', { url: `${AI_BASE_URL}/api/ai-query`, queryType, dataCount: data.length });

    // Make API request
    const response = await fetch(`${AI_BASE_URL}/api/ai-query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    // Response received successfully

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse response
    const result = await response.json();
    // Uncomment for debugging: console.log('AI Response:', result);
    
    // Extract text from response
    const responseText = parseAIResponse(result);
    
    return responseText;
  } catch (error) {
    console.error('AI Request Error:', error);
    throw error;
  }
};
