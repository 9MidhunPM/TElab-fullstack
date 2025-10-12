import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchResultsWithToken } from '../api';
import Card from '../components/Card';
import RefreshIcon from '../components/RefreshIcon';
import { useAuth } from '../contexts/AuthContext';
import commonStyles from '../styles/commonStyles';
import styles from '../styles/resultsScreenStyles';

export default function ResultsScreen() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading results...');
  const [showRetryOption, setShowRetryOption] = useState(false);
  const { token } = useAuth();

  // AbortController for request cancellation and timeout tracking
  const [abortController, setAbortController] = useState(null);
  const timeoutRefs = useRef({ fiveSecond: null, twentyFiveSecond: null });

  useEffect(() => {
    if (token) {
      fetchResults();
    }
    
    // Cleanup: abort any pending requests and clear timeouts when component unmounts
    return () => {
      if (abortController) {
        abortController.abort();
      }
      clearTimeouts();
    };
  }, [token]);

  const clearTimeouts = () => {
    if (timeoutRefs.current.fiveSecond) {
      clearTimeout(timeoutRefs.current.fiveSecond);
      timeoutRefs.current.fiveSecond = null;
    }
    if (timeoutRefs.current.twentyFiveSecond) {
      clearTimeout(timeoutRefs.current.twentyFiveSecond);
      timeoutRefs.current.twentyFiveSecond = null;
    }
  };

  const fetchResults = async () => {
    if (!token) return;

    // Cancel any existing request and clear previous timeouts
    if (abortController) {
      abortController.abort();
    }
    clearTimeouts();

    // Create new AbortController for this request
    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    try {
      setIsLoading(true);
      setError(null);
      setLoadingMessage('Fetching results from ETLab...');
      setShowRetryOption(false);


      // CRITICAL: Use the fresh token from AuthContext, never read from SecureStore
      // This ensures we always use the current session token returned by login
      console.log('Fetching results...');
      const resultsData = await fetchResultsWithToken(token, newAbortController.signal);
      // Set timeout for 5 seconds to change message
      console.log(`Results loaded: ${resultsData.length} Exams found`);

      timeoutRefs.current.fiveSecond = setTimeout(() => {
        if (!newAbortController.signal.aborted) {
          setLoadingMessage('This report is taking longer than usual (may take up to 30s).');
        }
      }, 5000);

      // Set timeout for 25 seconds to show retry option
      timeoutRefs.current.twentyFiveSecond = setTimeout(() => {
        if (!newAbortController.signal.aborted) {
          setShowRetryOption(true);
        }
      }, 25000);
      
      // Only update state if request wasn't cancelled
      if (!newAbortController.signal.aborted) {
        setResults(resultsData);
        clearTimeouts();
      }
    } catch (error) {
      if (error.name !== 'AbortError' && !newAbortController.signal.aborted) {
        console.error('Results fetch error:', error);
        setError(error.message || 'Failed to fetch results data');
        clearTimeouts();
      }
    } finally {
      if (!newAbortController.signal.aborted) {
        setIsLoading(false);
        setAbortController(null);
      }
    }
  };

  const handleRetry = () => {
    fetchResults();
  };

  const renderResultItem = ({ item }) => {
    const percentage = ((parseFloat(item.marksObtained) / parseFloat(item.maximumMarks)) * 100);
    
    return (
      <Card variant="small" withMargin onPress={() => {}}>
        <View style={styles.resultHeader}>
          <View style={styles.subjectInfo}>
            <Text style={styles.subjectCode}>{item.subjectCode}</Text>
            <Text style={styles.subjectName}>{item.subjectName}</Text>
          </View>
          <View style={styles.marksInfo}>
            <Text style={styles.marks}>
              {item.marksObtained}/{item.maximumMarks}
            </Text>
            <Text style={styles.percentage}>
              {percentage.toFixed(1)}%
            </Text>
          </View>
        </View>
        <View style={styles.resultFooter}>
          <Text style={styles.semester}>{item.semester}</Text>
          <Text style={styles.exam}>Exam {item.exam}</Text>
        </View>
      </Card>
    );
  };

  // Loading state with progressive messages
  if (isLoading) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={commonStyles.loadingText}>{loadingMessage}</Text>
          
          {showRetryOption && (
            <View style={styles.retryContainer}>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={handleRetry}
                accessibilityLabel="Retry loading results"
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={() => setShowRetryOption(false)}
                accessibilityLabel="Continue waiting for results"
              >
                <Text style={styles.continueButtonText}>Keep Waiting</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error && !results) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.errorContainer}>
          <Text style={commonStyles.errorTitle}>Failed to Load Results</Text>
          <Text style={commonStyles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRetry}
            accessibilityLabel="Retry loading results"
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // No data state
  if (!results || results.length === 0) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.errorContainer}>
          <Text style={commonStyles.errorTitle}>No Results Available</Text>
          <Text style={commonStyles.errorText}>No academic results found for your account.</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRetry}
            accessibilityLabel="Refresh results"
          >
            <Text style={styles.retryButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Success state - show results
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <View style={commonStyles.header}>
          <Text style={commonStyles.headerTitle}>Academic Results</Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={handleRetry}
            accessibilityLabel="Refresh results"
          >
            <RefreshIcon size={20} color="#4F46E5" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={results}
          renderItem={renderResultItem}
          keyExtractor={(item, index) => `${item.subjectCode}-${item.exam}-${index}`}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}