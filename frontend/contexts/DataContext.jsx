import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

/**
 * DataContext provides centralized storage for all app data
 * This allows any component to access loaded data without re-fetching
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

  // Clear all data when user logs out
  useEffect(() => {
    if (!user || !token) {
      clearAllData();
    }
  }, [user, token]);

  // Update data for a specific endpoint
  const updateData = (endpoint, data, status = 'success') => {
    setAppData(prev => ({
      ...prev,
      [endpoint]: data
    }));
    
    setDataLoadingStatus(prev => ({
      ...prev,
      [endpoint]: status
    }));

    setLastUpdated(prev => ({
      ...prev,
      [endpoint]: new Date()
    }));
  };

  // Clear all data (useful for logout)
  const clearAllData = () => {
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

  const value = {
    // Data state
    appData,
    dataLoadingStatus,
    lastUpdated,
    
    // Actions
    updateData,
    clearAllData,
    
    // Helper functions
    isDataAvailable,
    hasDataError,
    getDataError,
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