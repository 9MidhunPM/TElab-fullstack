import { createContext, useContext, useEffect, useState } from 'react';
import CacheManager from '../utils/cacheManager';
import { useAuth } from './AuthContext';

/**
 * DataContext provides centralized storage for all app data
 * Now with AsyncStorage caching for offline support and performance
 */
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [appData, setAppData] = useState({
    attendance: null,
    results: null,
    endSemResults: null,
    timetable: null,
  });

  const [dataLoadingStatus, setDataLoadingStatus] = useState({
    attendance: 'pending',
    results: 'pending', 
    endSemResults: 'pending',
    timetable: 'pending',
  });

  const [lastUpdated, setLastUpdated] = useState({
    attendance: null,
    results: null,
    endSemResults: null,
    timetable: null,
  });

  const [cacheStatus, setCacheStatus] = useState({
    attendance: { isCached: false, isFresh: false },
    results: { isCached: false, isFresh: false },
    endSemResults: { isCached: false, isFresh: false },
    timetable: { isCached: false, isFresh: false },
  });

  // Track if we've ever had a user (to distinguish logout from initial load)
  const [hasHadUser, setHasHadUser] = useState(false);
  
  // Track if cache is currently loading
  const [isCacheLoading, setIsCacheLoading] = useState(false);
  
  // Track if cache has been loaded at least once (prevents race condition)
  const [cacheLoadComplete, setCacheLoadComplete] = useState(false);

  // Load cached data when user logs in
  useEffect(() => {
    if (user && token && !cacheLoadComplete) {
      console.log('[DataContext] User authenticated, loading cache...');
      setHasHadUser(true);
      setIsCacheLoading(true);
      loadCachedData();
    } else if (!user || !token) {
      // Reset on logout
      setCacheLoadComplete(false);
    }
  }, [user, token, cacheLoadComplete]);

  // Clear all data ONLY when user explicitly logs out (not on initial load)
  useEffect(() => {
    // Only clear if we previously had a user and now we don't (logout scenario)
    if (hasHadUser && (!user || !token)) {
      console.log('[DataContext] User logged out, clearing cache...');
      clearAllData();
      setHasHadUser(false);
    }
  }, [user, token, hasHadUser]);

  // Load cached data from AsyncStorage
  const loadCachedData = async () => {
    console.log('[DataContext] 🔍 Starting cache load...', { isCacheLoading });
    setIsCacheLoading(true);
    
    try {
      // Load results and endSemResults from cache (not attendance or timetable)
      const results = await CacheManager.getResults();
      const endSemResults = await CacheManager.getEndSemResults();
      
      console.log('[DataContext] Cache results:', {
        results: {
          found: !!results,
          hasData: results?.data ? 'yes' : 'no',
          isExpired: results?.isExpired,
        },
        endSemResults: {
          found: !!endSemResults,
          hasData: endSemResults?.data ? 'yes' : 'no',
          isExpired: endSemResults?.isExpired,
        }
      });
      
      // Check freshness
      const resultsFresh = results ? await CacheManager.isFresh(CacheManager.KEYS.RESULTS) : false;
      const endSemResultsFresh = endSemResults ? await CacheManager.isFresh(CacheManager.KEYS.END_SEM_RESULTS) : false;

      // Mark attendance and timetable as not cached (we'll load from API)
      setCacheStatus(prev => ({ 
        ...prev, 
        attendance: { isCached: false, isFresh: false },
        timetable: { isCached: false, isFresh: false },
      }));

      // Process results cache
      if (results) {
        console.log('[DataContext] ✅ Processing cached results...');
        // Extract actual data from cache wrapper
        let resultsData = results.data || results;
        
        // Convert object with numeric keys back to array if needed
        if (resultsData && typeof resultsData === 'object' && !Array.isArray(resultsData)) {
          const keys = Object.keys(resultsData);
          const hasNumericKeys = keys.some(k => !isNaN(k));
          if (hasNumericKeys) {
            resultsData = Object.keys(resultsData)
              .filter(k => !isNaN(k))
              .sort((a, b) => Number(a) - Number(b))
              .map(k => resultsData[k]);
          }
        }
        
        setAppData(prev => ({ ...prev, results: resultsData }));
        setDataLoadingStatus(prev => ({ ...prev, results: 'success' }));
        setLastUpdated(prev => ({ ...prev, results: new Date(results.timestamp) }));
        setCacheStatus(prev => ({ 
          ...prev, 
          results: { isCached: true, isFresh: resultsFresh }
        }));
      } else {
        setCacheStatus(prev => ({ 
          ...prev, 
          results: { isCached: false, isFresh: false }
        }));
      }
      
      // Process endSemResults cache SEPARATELY
      if (endSemResults) {
        console.log('[DataContext] ✅ Processing cached endSemResults...');
        let endSemResultsData = endSemResults.data || endSemResults;
        
        // Convert object with numeric keys back to array if needed
        if (endSemResultsData && typeof endSemResultsData === 'object' && !Array.isArray(endSemResultsData)) {
          const keys = Object.keys(endSemResultsData);
          const hasNumericKeys = keys.some(k => !isNaN(k));
          if (hasNumericKeys) {
            endSemResultsData = Object.keys(endSemResultsData)
              .filter(k => !isNaN(k))
              .sort((a, b) => Number(a) - Number(b))
              .map(k => endSemResultsData[k]);
          }
        }
        
        setAppData(prev => ({ ...prev, endSemResults: endSemResultsData }));
        setDataLoadingStatus(prev => ({ ...prev, endSemResults: 'success' }));
        setLastUpdated(prev => ({ ...prev, endSemResults: new Date(endSemResults.timestamp) }));
        setCacheStatus(prev => ({ 
          ...prev, 
          endSemResults: { isCached: true, isFresh: endSemResultsFresh }
        }));
      } else {
        setCacheStatus(prev => ({ 
          ...prev, 
          endSemResults: { isCached: false, isFresh: false }
        }));
      }
    } catch (error) {
      console.error('[DataContext] ❌ Error loading cached data:', error);
    } finally {
      console.log('[DataContext] ✅ Cache load complete, setting isCacheLoading = false');
      setIsCacheLoading(false);
      setCacheLoadComplete(true);
    }
  };

  // Update data for a specific endpoint (now with caching)
  const updateData = async (endpoint, data, status = 'success') => {
    console.log(`[DataContext] 📝 updateData called:`, {
      endpoint,
      status,
      hasData: !!data,
      isArray: Array.isArray(data),
      length: data?.length
    });
    
    // Update state immediately
    setAppData(prev => ({
      ...prev,
      [endpoint]: data
    }));
    
    setDataLoadingStatus(prev => ({
      ...prev,
      [endpoint]: status
    }));

    const now = new Date();
    setLastUpdated(prev => ({
      ...prev,
      [endpoint]: now
    }));

    // Save to cache if data is valid (results and endSemResults separately)
    if (status === 'success' && data && !data.error) {
      if (endpoint === 'results') {
        console.log('[DataContext] 💾 Attempting to cache results...');
        try {
          await CacheManager.saveResults(data);
          console.log('[DataContext] ✅ Results cached successfully!');
          setCacheStatus(prev => ({
            ...prev,
            results: { isCached: true, isFresh: true }
          }));
        } catch (error) {
          console.error('[DataContext] ❌ Failed to cache results:', error);
        }
      } else if (endpoint === 'endSemResults') {
        console.log('[DataContext] 💾 Attempting to cache endSemResults...');
        try {
          await CacheManager.saveEndSemResults(data);
          console.log('[DataContext] ✅ EndSemResults cached successfully!');
          setCacheStatus(prev => ({
            ...prev,
            endSemResults: { isCached: true, isFresh: true }
          }));
        } catch (error) {
          console.error('[DataContext] ❌ Failed to cache endSemResults:', error);
        }
      }
    } else {
      console.log('[DataContext] ⏭️ Skipping cache:', {
        isSuccess: status === 'success',
        hasData: !!data,
        noError: !data?.error,
        endpoint
      });
    }
  };

  // Clear all data (useful for logout) - now also clears cache
  const clearAllData = async () => {
    setAppData({
      attendance: null,
      results: null,
      endSemResults: null,
      timetable: null,
    });

    setDataLoadingStatus({
      attendance: 'pending',
      results: 'pending',
      endSemResults: 'pending',
      timetable: 'pending',
    });

    setLastUpdated({
      attendance: null,
      results: null,
      endSemResults: null,
      timetable: null,
    });

    setCacheStatus({
      attendance: { isCached: false, isFresh: false },
      results: { isCached: false, isFresh: false },
      endSemResults: { isCached: false, isFresh: false },
      timetable: { isCached: false, isFresh: false },
    });

    // Clear all cached data (except theme preference)
    try {
      await CacheManager.remove(CacheManager.KEYS.ATTENDANCE);
      await CacheManager.remove(CacheManager.KEYS.RESULTS);
      await CacheManager.remove(CacheManager.KEYS.END_SEM_RESULTS);
      await CacheManager.remove(CacheManager.KEYS.TIMETABLE);
      console.log('[DataContext] Cleared all cached data');
    } catch (error) {
      console.error('[DataContext] Error clearing cache:', error);
    }
  };

  // Check if data is available and not in error state
  const isDataAvailable = (endpoint) => {
    return appData[endpoint] && 
           dataLoadingStatus[endpoint] === 'success' && 
           !appData[endpoint].error;
  };

  // Check if data has an error
  const hasDataError = (endpoint) => {
    return appData[endpoint] && 
           (dataLoadingStatus[endpoint] === 'error' || appData[endpoint].error);
  };

  // Get error message for an endpoint
  const getDataError = (endpoint) => {
    if (hasDataError(endpoint)) {
      return appData[endpoint].error || 'Unknown error occurred';
    }
    return null;
  };

  // Force refresh data (invalidates cache and sets to pending)
  const forceRefresh = async (endpoint) => {
    console.log(`[DataContext] Force refreshing ${endpoint}...`);
    
    // Clear cache for this endpoint
    try {
      switch (endpoint) {
        case 'attendance':
          await CacheManager.remove(CacheManager.KEYS.ATTENDANCE);
          break;
        case 'results':
          await CacheManager.remove(CacheManager.KEYS.RESULTS);
          break;
        case 'endSemResults':
          await CacheManager.remove(CacheManager.KEYS.END_SEM_RESULTS);
          break;
        case 'timetable':
          await CacheManager.remove(CacheManager.KEYS.TIMETABLE);
          break;
      }
    } catch (error) {
      console.error(`[DataContext] Error removing cache for ${endpoint}:`, error);
    }

    // Clear the actual data and reset to pending state to trigger refetch
    setAppData(prev => ({
      ...prev,
      [endpoint]: null
    }));
    
    setDataLoadingStatus(prev => ({
      ...prev,
      [endpoint]: 'pending'
    }));

    setCacheStatus(prev => ({
      ...prev,
      [endpoint]: { isCached: false, isFresh: false }
    }));
  };

  // Check if cache is fresh for an endpoint
  const isCacheFresh = (endpoint) => {
    return cacheStatus[endpoint]?.isFresh || false;
  };

  // Get cache info for debugging
  const getCacheInfo = async () => {
    try {
      const status = await CacheManager.getStatus();
      console.log('[DataContext] Cache Status:', status);
      return status;
    } catch (error) {
      console.error('[DataContext] Error getting cache status:', error);
      return null;
    }
  };

  const value = {
    // Data state
    appData,
    dataLoadingStatus,
    lastUpdated,
    cacheStatus,
    isCacheLoading,
    cacheLoadComplete,
    
    // Actions
    updateData,
    clearAllData,
    forceRefresh,
    loadCachedData,
    
    // Helper functions
    isDataAvailable,
    hasDataError,
    getDataError,
    isCacheFresh,
    getCacheInfo,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useAppData must be used within a DataProvider');
  }
  return context;
};