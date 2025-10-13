/**
 * Configuration for API loading order and behavior
 * Modify this file to customize how data is loaded in the app
 */

import {
    fetchAttendanceWithToken,
    fetchEndSemResultsWithToken,
    fetchResultsWithToken,
    fetchTimetableWithToken
} from '../api';

/**
 * Define the order and configuration for API endpoint loading
 * 
 * Each endpoint configuration includes:
 * - name: Key used in DataContext to store the data
 * - displayName: User-friendly name shown during loading
 * - apiFunction: The API function to call
 * - priority: (optional) Higher number = higher priority
 * - timeout: (optional) Custom timeout in milliseconds
 * - retryCount: (optional) Number of retry attempts on failure
 */
export const API_LOAD_CONFIG = [
  {
    name: 'attendance',
    displayName: 'Attendance Data',
    apiFunction: fetchAttendanceWithToken,
    priority: 4, // Highest priority - loads first
    timeout: 10000, // 10 seconds
    retryCount: 2,
  },
  {
    name: 'timetable',
    displayName: 'Timetable Data',
    apiFunction: fetchTimetableWithToken,
    priority: 3,
    timeout: 10000,
    retryCount: 2,
  },
  {
    name: 'results',
    displayName: 'Results Data',
    apiFunction: fetchResultsWithToken,
    priority: 1,
    timeout: 35000, // 35 seconds (this endpoint is slow)
    retryCount: 1,
  },
  {
    name: 'endSemResults',
    displayName: 'End Semester Results',
    apiFunction: fetchEndSemResultsWithToken,
    priority: 2, // Lowest priority - loads last
    timeout: 15000,
    retryCount: 2,
  },
];

/**
 * General loading configuration
 */
export const LOADING_CONFIG = {
  // Delay between API calls (in milliseconds)
  delayBetweenCalls: 500,
  
  // Whether to continue loading other endpoints if one fails
  continueOnError: true,
  
  // Whether to show detailed error messages to users
  showDetailedErrors: true,
  
  // Maximum concurrent loading operations (set to 1 for sequential loading)
  maxConcurrentLoads: 1,
};

/**
 * Get API load order sorted by priority (highest first)
 * You can also manually reorder this array to override priority-based sorting
 */
export const getLoadOrder = () => {
  return API_LOAD_CONFIG.sort((a, b) => (b.priority || 0) - (a.priority || 0));
};

/**
 * Alternative predefined load orders for different scenarios
 */
export const LOAD_ORDER_PRESETS = {
  // Default order (by priority)
  default: () => getLoadOrder(),
  
  // Academic focus - prioritize results first
  academic: () => [
    API_LOAD_CONFIG.find(c => c.name === 'results'),
    API_LOAD_CONFIG.find(c => c.name === 'endSemResults'),
    API_LOAD_CONFIG.find(c => c.name === 'attendance'),
    API_LOAD_CONFIG.find(c => c.name === 'timetable'),
  ].filter(Boolean),
  
  // Daily planning focus - prioritize timetable and attendance
  daily: () => [
    API_LOAD_CONFIG.find(c => c.name === 'timetable'),
    API_LOAD_CONFIG.find(c => c.name === 'attendance'),
    API_LOAD_CONFIG.find(c => c.name === 'results'),
    API_LOAD_CONFIG.find(c => c.name === 'endSemResults'),
  ].filter(Boolean),
  
  // Fast loading only - skip slow endpoints
  fast: () => [
    API_LOAD_CONFIG.find(c => c.name === 'attendance'),
    API_LOAD_CONFIG.find(c => c.name === 'timetable'),
  ].filter(Boolean),
};

/**
 * Get load order by preset name
 * @param {string} presetName - Name of the preset ('default', 'academic', 'daily', 'fast')
 * @returns {Array} Array of API configurations in the specified order
 */
export const getLoadOrderByPreset = (presetName = 'default') => {
  const preset = LOAD_ORDER_PRESETS[presetName];
  return preset ? preset() : LOAD_ORDER_PRESETS.default();
};