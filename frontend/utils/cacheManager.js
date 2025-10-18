import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * CacheManager - Handles local storage with TTL (Time To Live)
 * Stores data with timestamps and manages automatic expiration
 */

const CACHE_KEYS = {
  THEME: '@etlabapp_theme_mode',
  TIMETABLE: '@etlabapp_timetable',
  ATTENDANCE: '@etlabapp_attendance',
  RESULTS: '@etlabapp_results',
  END_SEM_RESULTS: '@etlabapp_end_sem_results',
  PROFILE: '@etlabapp_profile',
  AI_CHAT_HISTORY: '@etlabapp_ai_chat',
};

// Cache durations in milliseconds for consistency
const CACHE_DURATION = {
  THEME: null, // Never expires (permanent)
  ATTENDANCE: 60 * 60 * 1000, // 1 hour
  RESULTS: 24 * 60 * 60 * 1000, // 24 hours (results rarely change)
  END_SEM_RESULTS: 24 * 60 * 60 * 1000, // 24 hours (same as results)
  END_SEM_RESULTS: 24 * 60 * 60 * 1000, // 24 hours
  TIMETABLE: 7 * 24 * 60 * 60 * 1000, // 7 days (timetable rarely changes)
  PROFILE: 12 * 60 * 60 * 1000, // 12 hours
  AI_CHAT_HISTORY: 7 * 24 * 60 * 60 * 1000, // 7 days
};

/**
 * Save data to cache with timestamp
 * @param {string} key - Cache key from CACHE_KEYS
 * @param {any} data - Data to cache
 * @param {number|null} ttlMs - Time to live in milliseconds (null = permanent)
 */
const set = async (key, data, ttlMs = null) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl: ttlMs, // Already in milliseconds
    };
    await AsyncStorage.setItem(key, JSON.stringify(cacheData));
    console.log(`[CacheManager] ✅ Saved ${key} (TTL: ${ttlMs ? (ttlMs/1000/60).toFixed(0) + 'min' : 'permanent'})`);
    return true;
  } catch (error) {
    console.error(`[CacheManager] ❌ Error saving ${key}:`, error);
    return false;
  }
};

/**
 * Get data from cache if not expired
 * @param {string} key - Cache key from CACHE_KEYS
 * @param {boolean} ignoreExpiry - Return data even if expired
 * @returns {object|null} { data, isExpired, age } or null if not found
 */
const get = async (key, ignoreExpiry = false) => {
  try {
    const cached = await AsyncStorage.getItem(key);
    if (!cached) {
      console.log(`[CacheManager] ❌ No cache for ${key}`);
      return null;
    }

    const cacheData = JSON.parse(cached);
    const now = Date.now();
    const age = now - cacheData.timestamp;
    
    // Check if expired
    const isExpired = cacheData.ttl && age > cacheData.ttl;

    if (isExpired && !ignoreExpiry) {
      console.log(`[CacheManager] ⏰ Expired ${key} (age: ${Math.floor(age/1000/60)}min)`);
      // Auto-delete expired cache
      await remove(key);
      return null;
    }

    console.log(`[CacheManager] ✅ Found ${key} (${isExpired ? 'stale' : 'fresh'}, ${Math.floor(age/1000)}s old)`);
    
    return {
      data: cacheData.data,
      isExpired,
      age: Math.floor(age / 1000), // Age in seconds
      timestamp: cacheData.timestamp,
    };
  } catch (error) {
    console.error(`[CacheManager] ❌ Error reading ${key}:`, error);
    return null;
  }
};

/**
 * Remove specific cache entry
 */
const remove = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[CacheManager] Error removing ${key}:`, error);
    return false;
  }
};

/**
 * Clear all app cache
 */
const clearAll = async () => {
  try {
    const keys = Object.values(CACHE_KEYS);
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (error) {
    console.error('[CacheManager] Error clearing all cache:', error);
    return false;
  }
};

/**
 * Get cache status for all keys
 * Useful for debugging or showing cache info to user
 */
const getStatus = async () => {
  const status = {};
  
  for (const [name, key] of Object.entries(CACHE_KEYS)) {
    const cached = await get(key, true); // Ignore expiry to get info
    if (cached) {
      status[name] = {
        exists: true,
        isExpired: cached.isExpired,
        ageMinutes: Math.floor(cached.age / 60),
        timestamp: new Date(cached.timestamp).toLocaleString(),
      };
    } else {
      status[name] = { exists: false };
    }
  }
  
  return status;
};

/**
 * Check if cache exists and is fresh
 */
const isFresh = async (key) => {
  const cached = await get(key);
  return cached !== null && !cached.isExpired;
};

/**
 * Get data with fallback to expired cache
 * Useful for offline scenarios
 */
const getWithFallback = async (key) => {
  // Try fresh data first
  const fresh = await get(key);
  if (fresh) return { ...fresh, isFallback: false };

  // Fall back to expired data
  const stale = await get(key, true);
  if (stale) return { ...stale, isFallback: true };

  return null;
};

/**
 * Preset save functions for each data type
 */
const saveTheme = (themeMode) => set(CACHE_KEYS.THEME, themeMode);
const saveTimetable = (data) => set(CACHE_KEYS.TIMETABLE, data, CACHE_DURATION.TIMETABLE);
const saveAttendance = (data) => set(CACHE_KEYS.ATTENDANCE, data, CACHE_DURATION.ATTENDANCE);
const saveResults = (data) => set(CACHE_KEYS.RESULTS, data, CACHE_DURATION.RESULTS);
const saveEndSemResults = (data) => set(CACHE_KEYS.END_SEM_RESULTS, data, CACHE_DURATION.END_SEM_RESULTS);
const saveProfile = (data) => set(CACHE_KEYS.PROFILE, data, CACHE_DURATION.PROFILE);
const saveAIChatHistory = (data) => set(CACHE_KEYS.AI_CHAT_HISTORY, data, CACHE_DURATION.AI_CHAT_HISTORY);

/**
 * Preset get functions for each data type
 */
const getTheme = () => get(CACHE_KEYS.THEME);
const getTimetable = () => getWithFallback(CACHE_KEYS.TIMETABLE);
const getAttendance = () => getWithFallback(CACHE_KEYS.ATTENDANCE);
const getResults = () => getWithFallback(CACHE_KEYS.RESULTS);
const getEndSemResults = () => getWithFallback(CACHE_KEYS.END_SEM_RESULTS);
const getProfile = () => getWithFallback(CACHE_KEYS.PROFILE);
const getAIChatHistory = () => getWithFallback(CACHE_KEYS.AI_CHAT_HISTORY);

export const CacheManager = {
  // Core functions
  set,
  get,
  remove,
  clearAll,
  getStatus,
  isFresh,
  getWithFallback,
  
  // Keys
  KEYS: CACHE_KEYS,
  
  // Preset save functions
  saveTheme,
  saveTimetable,
  saveAttendance,
  saveResults,
  saveEndSemResults,
  saveProfile,
  saveAIChatHistory,
  
  // Preset get functions
  getTheme,
  getTimetable,
  getAttendance,
  getResults,
  getEndSemResults,
  getProfile,
  getAIChatHistory,
};

export default CacheManager;
