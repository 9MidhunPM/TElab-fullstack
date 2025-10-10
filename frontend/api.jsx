/**
 * API module for authentication, profile management, attendance, and results
 * Base URL configured via environment variable
 */

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://etlabapp-backendv1.onrender.com';

/**
 * Login API function
 * @param {string} username - User's username (e.g., "224789")
 * @param {string} password - User's password
 * @param {AbortSignal} signal - Optional AbortController signal for cancellation
 * @returns {Promise<Object>} - Returns login response with token
 */
export const loginApi = async (username, password, signal) => {
  try {
    const response = await fetch(`${BASE_URL}/app/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
      signal, // Support for request cancellation
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Login failed: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Login request was cancelled');
      throw new Error('Login request was cancelled');
    }
    console.error('Login API error:', error);
    throw error;
  }
};

/**
 * Fetch user profile using token
 * IMPORTANT: Always use a fresh token from login response, never from storage
 * @param {string} token - Bearer token from login response
 * @param {AbortSignal} signal - Optional AbortController signal for cancellation
 * @returns {Promise<Object>} - Returns user profile data
 */
export const fetchProfileWithToken = async (token, signal) => {
  try {
    const response = await fetch(`${BASE_URL}/app/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      signal, // Support for request cancellation
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Profile fetch failed: ${response.status} - ${errorData}`);
    }

    const profileData = await response.json();
    return profileData;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Profile fetch request was cancelled');
      throw new Error('Profile fetch request was cancelled');
    }
    console.error('Profile fetch error:', error);
    throw error;
  }
};

/**
 * Fetch user attendance using token
 * IMPORTANT: Always use a fresh token from login response, never from storage for first fetch
 * @param {string} token - Bearer token from login response or stored token
 * @param {AbortSignal} signal - Optional AbortController signal for cancellation
 * @returns {Promise<Object>} - Returns attendance data with subjects and summary
 */
export const fetchAttendanceWithToken = async (token, signal) => {
  try {
    const response = await fetch(`${BASE_URL}/app/attendance`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      signal, // Support for request cancellation
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Attendance fetch failed: ${response.status} - ${errorData}`);
    }

    const attendanceData = await response.json();
    return attendanceData;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Attendance fetch request was cancelled');
      throw new Error('Attendance fetch request was cancelled');
    }
    console.error('Attendance fetch error:', error);
    throw error;
  }
};

/**
 * Fetch user results using token
 * IMPORTANT: Always use a fresh token from login response, never from storage for first fetch
 * WARNING: This endpoint is slow and typically takes ~25 seconds to respond
 * @param {string} token - Bearer token from login response or stored token
 * @param {AbortSignal} signal - Optional AbortController signal for cancellation
 * @returns {Promise<Array>} - Returns results array with subject grades
 */
export const fetchResultsWithToken = async (token, signal) => {
  try {
    const response = await fetch(`${BASE_URL}/app/results`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      signal, // Support for request cancellation
    });

    if (!response.ok) {
      const errorData = await response.text().catch(() => null);
      throw new Error(`Results fetch failed: ${response.status} ${errorData || response.statusText}`);
    }

    const resultsData = await response.json();
    return resultsData;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Results fetch request was cancelled');
      throw new Error('Results fetch request was cancelled');
    }
    console.error('Results fetch error:', error);
    throw error;
  }
};

/**
 * Fetch end-semester results using token
 * IMPORTANT: Always use a fresh token from login response, never from storage for first fetch
 * @param {string} token - Bearer token from login response or stored token
 * @param {AbortSignal} signal - Optional AbortController signal for cancellation
 * @returns {Promise<Array>} - Returns array of semester objects with grades
 */
export const fetchEndSemResultsWithToken = async (token, signal) => {
  try {
    // Try the specific endpoint first, fall back to regular results if needed
    const response = await fetch(`${BASE_URL}/app/end-sem-results`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      signal, // Support for request cancellation
    });

    if (!response.ok) {
      const errorData = await response.text().catch(() => null);
      throw new Error(`End-sem results fetch failed: ${response.status} ${errorData || response.statusText}`);
    }

    const endSemResultsData = await response.json();
    return endSemResultsData;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('End-sem results fetch request was cancelled');
      throw new Error('End-sem results fetch request was cancelled');
    }
    console.error('End-sem results fetch error:', error);
    throw error;
  }
};

/**
 * Fetch timetable using token
 * IMPORTANT: Always use a fresh token from login response, never from storage for first fetch
 * @param {string} token - Bearer token from login response or stored token
 * @param {AbortSignal} signal - Optional AbortController signal for cancellation
 * @returns {Promise<Object>} - Returns timetable data object with days and periods
 */
export const fetchTimetableWithToken = async (token, signal) => {
  try {
    const response = await fetch(`${BASE_URL}/app/timetable`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      signal, // Support for request cancellation
    });

    if (!response.ok) {
      const errorData = await response.text().catch(() => null);
      throw new Error(`Timetable fetch failed: ${response.status} ${errorData || response.statusText}`);
    }

    const timetableData = await response.json();
    return timetableData;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Timetable fetch request was cancelled');
      throw new Error('Timetable fetch request was cancelled');
    }
    console.error('Timetable fetch error:', error);
    throw error;
  }
};