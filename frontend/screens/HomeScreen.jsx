import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import LogoutIcon from '../components/LogoutIcon';
import { getLoadOrderByPreset, LOADING_CONFIG } from '../config/dataLoadingConfig';
import { useAuth } from '../contexts/AuthContext';
import { useAppData } from '../contexts/DataContext';
import commonStyles from '../styles/commonStyles';
import styles from '../styles/homeScreenStyles';

export default function HomeScreen() {
  const { user, logout, isLoading, token } = useAuth();
  const { appData, dataLoadingStatus, updateData, clearAllData, isDataAvailable, hasDataError } = useAppData();
  
  // State for managing data loading
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState({ current: 0, total: 0, currentTask: '' });
  const [dataLoadError, setDataLoadError] = useState(null);
  
  // Ref to track if component is mounted
  const isMountedRef = useRef(true);
  
  // Get the API load order from configuration
  // You can change the preset here: 'default', 'academic', 'daily', 'fast'
  const API_LOAD_ORDER = getLoadOrderByPreset('default');

  // Load all data sequentially when component mounts and user is authenticated
  useEffect(() => {
    if (user && token && !isLoading) {
      loadAllDataSequentially();
    }
    
    // Cleanup function to mark component as unmounted
    return () => {
      isMountedRef.current = false;
    };
  }, [user, token, isLoading]);

  // Clear data when user logs out
  useEffect(() => {
    if (!user || !token) {
      clearAllData();
    }
  }, [user, token, clearAllData]);

  const loadAllDataSequentially = async () => {
    if (!token || isLoadingData) return;
    
    setIsLoadingData(true);
    setDataLoadError(null);
    setLoadingProgress({ current: 0, total: API_LOAD_ORDER.length, currentTask: '' });
    
    try {
      for (let i = 0; i < API_LOAD_ORDER.length; i++) {
        // Check if component is still mounted
        if (!isMountedRef.current) return;
        
        const apiConfig = API_LOAD_ORDER[i];
        
        // Update progress
        setLoadingProgress({
          current: i + 1,
          total: API_LOAD_ORDER.length,
          currentTask: apiConfig.displayName
        });
        
        try {
          console.log(`Loading ${apiConfig.displayName}...`);
          const data = await apiConfig.apiFunction(token);
          
          // Only update state if component is still mounted
          if (isMountedRef.current) {
            updateData(apiConfig.name, data, 'success');
          }
          
          console.log(`✓ Successfully loaded ${apiConfig.displayName}`);
          
          // Small delay between requests to avoid overwhelming the server
          await new Promise(resolve => setTimeout(resolve, LOADING_CONFIG.delayBetweenCalls));
          
        } catch (error) {
          console.error(`Error loading ${apiConfig.displayName}:`, error);
          
          // Store the error but continue with other endpoints
          if (isMountedRef.current) {
            updateData(apiConfig.name, { error: error.message }, 'error');
          }
        }
      }
      
      console.log('All data loading completed');
      
    } catch (error) {
      console.error('Critical error during data loading:', error);
      if (isMountedRef.current) {
        setDataLoadError(error.message);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoadingData(false);
        setLoadingProgress({ current: 0, total: 0, currentTask: '' });
      }
    }
  };

  const handleRetryDataLoad = () => {
    loadAllDataSequentially();
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={commonStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={commonStyles.loadingText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={commonStyles.errorContainer}>
        <Text style={commonStyles.errorText}>No user data available</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      {/* Header with Welcome text and Logout button */}
      <View style={styles.header}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.nameText}>{user.name}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutIconButton}
          onPress={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#EF4444" size="small" />
          ) : (
            <LogoutIcon size={24} color="#EF4444" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.container} contentContainerStyle={styles.contentContainer}>
        {/* Data Loading Progress */}
        {isLoadingData && (
          <Card variant="default" withMargin marginSize="medium">
            <Card.Header>
              <Text style={commonStyles.cardTitle}>Loading Your Data</Text>
            </Card.Header>
            
            <Card.Body>
              <View style={styles.loadingProgressContainer}>
                <ActivityIndicator size="large" color="#4F46E5" style={styles.loadingSpinner} />
                <Text style={styles.loadingProgressText}>
                  {loadingProgress.currentTask}
                </Text>
                <Text style={styles.loadingProgressSubtext}>
                  Step {loadingProgress.current} of {loadingProgress.total}
                </Text>
                
                {/* Progress bar */}
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { width: `${(loadingProgress.current / loadingProgress.total) * 100}%` }
                    ]} 
                  />
                </View>
              </View>
            </Card.Body>
          </Card>
        )}

        {/* Data Loading Error */}
        {dataLoadError && !isLoadingData && (
          <Card variant="error" withMargin marginSize="medium">
            <Card.Header>
              <Text style={commonStyles.cardTitle}>Data Loading Error</Text>
            </Card.Header>
            
            <Card.Body>
              <Text style={styles.errorText}>{dataLoadError}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={handleRetryDataLoad}>
                <Text style={styles.retryButtonText}>Retry Loading</Text>
              </TouchableOpacity>
            </Card.Body>
          </Card>
        )}

        {/* Compact Profile Information */}
        <Card variant="default" withMargin marginSize="medium">
          <Card.Header>
            <Text style={commonStyles.cardTitle}>Profile Information</Text>
          </Card.Header>
          
          <Card.Body>
            <View style={styles.compactInfoRow}>
              <Text style={styles.compactInfoLabel}>SR Number:</Text>
              <Text style={styles.compactInfoValue}>{user.srNumber}</Text>
            </View>

            <View style={styles.compactInfoRow}>
              <Text style={styles.compactInfoLabel}>Mobile:</Text>
              <Text style={styles.compactInfoValue}>{user.mobileNumber}</Text>
            </View>

            <View style={styles.compactInfoRow}>
              <Text style={styles.compactInfoLabel}>University Reg No:</Text>
              <Text style={styles.compactInfoValue}>{user.universityRegNo}</Text>
            </View>
          </Card.Body>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}