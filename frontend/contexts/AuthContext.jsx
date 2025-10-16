import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { fetchProfileWithToken, loginApi } from '../api';

const AuthContext = createContext({});

const TOKEN_KEY = 'userToken';
const USER_KEY = 'userData';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use useRef to track active requests for cancellation
  const activeRequestsRef = useRef(new Set());

  // Load stored token and validate it on app startup
  useEffect(() => {
    loadStoredToken();
    
    // Cleanup: cancel all active requests when component unmounts
    return () => {
      activeRequestsRef.current.forEach(controller => {
        controller.abort();
      });
      activeRequestsRef.current.clear();
    };
  }, []);

  const addActiveRequest = (controller) => {
    activeRequestsRef.current.add(controller);
  };

  const removeActiveRequest = (controller) => {
    activeRequestsRef.current.delete(controller);
  };

  const cancelAllRequests = () => {
    activeRequestsRef.current.forEach(controller => {
      controller.abort();
    });
    activeRequestsRef.current.clear();
  };

  const loadStoredToken = async () => {
    const controller = new AbortController();
    addActiveRequest(controller);
    
    try {
      const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      const storedUser = await SecureStore.getItemAsync(USER_KEY);
      
      if (storedToken && storedUser) {
        // Validate the stored token by fetching profile
        try {
          const profileData = await fetchProfileWithToken(storedToken, controller.signal);
          
          // Only update state if request wasn't cancelled
          if (!controller.signal.aborted) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
          }
        } catch (error) {
          if (error.name !== 'AbortError') {
            // Token invalid, clearing storage
            await clearStorage();
          }
        }
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error loading stored token:', error);
      }
    } finally {
      removeActiveRequest(controller);
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  const login = async (username, password) => {
    // Cancel any existing requests to prevent race conditions
    cancelAllRequests();
    
    const controller = new AbortController();
    addActiveRequest(controller);
    
    try {
      setIsLoading(true);
      
      // Step 1: Login to get fresh token
      const loginResponse = await loginApi(username, password, controller.signal);
      
      // Check if request was cancelled
      if (controller.signal.aborted) {
        return { success: false, error: 'Request was cancelled' };
      }
      
      const freshToken = loginResponse.token;
      
      // Step 2: Immediately use the fresh token to fetch profile
      // IMPORTANT: Never use stored token here, always use fresh token from login
      // This ensures we never display stale profile data from old tokens
      const profileData = await fetchProfileWithToken(freshToken, controller.signal);
      
      // Check if request was cancelled
      if (controller.signal.aborted) {
        return { success: false, error: 'Request was cancelled' };
      }
      
      // Step 3: Store the new token and user data (overwriting any old data)
      await SecureStore.setItemAsync(TOKEN_KEY, freshToken);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(profileData));
      
      // Step 4: Update state only if request wasn't cancelled
      if (!controller.signal.aborted) {
        setToken(freshToken);
        setUser(profileData);
      }
      
      return { success: true };
    } catch (error) {
      if (error.name === 'AbortError') {
        return { success: false, error: 'Request was cancelled' };
      }
      
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Login failed. Please check your credentials.' 
      };
    } finally {
      removeActiveRequest(controller);
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  const logout = async () => {
    // Cancel all active requests
    cancelAllRequests();
    
    try {
      setIsLoading(true);
      await clearStorage();
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearStorage = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
  };

  const value = {
    token,
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!token && !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};