import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchResultsWithToken } from '../api';
import { useAuth } from '../contexts/AuthContext';

export default function ResultsScreen() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading results...');
  const [showRetryOption, setShowRetryOption] = useState(false);
  const { token } = useAuth();

  // AbortController for request cancellation and timeout tracking
  const [abortController, setAbortController] = useState(null);
  const timeoutRefs = useRef({ tenSecond: null, twentyFiveSecond: null });

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
    if (timeoutRefs.current.tenSecond) {
      clearTimeout(timeoutRefs.current.tenSecond);
      timeoutRefs.current.tenSecond = null;
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
      setLoadingMessage('Loading results...');
      setShowRetryOption(false);

      // Set timeout for 10 seconds to change message
      timeoutRefs.current.tenSecond = setTimeout(() => {
        if (!newAbortController.signal.aborted) {
          setLoadingMessage('This report is taking longer than usual — still loading (may take up to 30s).');
        }
      }, 10000);

      // Set timeout for 25 seconds to show retry option
      timeoutRefs.current.twentyFiveSecond = setTimeout(() => {
        if (!newAbortController.signal.aborted) {
          setShowRetryOption(true);
        }
      }, 25000);

      // CRITICAL: Use the fresh token from AuthContext, never read from SecureStore
      // This ensures we always use the current session token returned by login
      const resultsData = await fetchResultsWithToken(token, newAbortController.signal);
      
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

  const renderResultItem = ({ item }) => (
    <View style={styles.resultCard}>
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
            {((parseFloat(item.marksObtained) / parseFloat(item.maximumMarks)) * 100).toFixed(1)}%
          </Text>
        </View>
      </View>
      <View style={styles.resultFooter}>
        <Text style={styles.semester}>{item.semester}</Text>
        <Text style={styles.exam}>Exam {item.exam}</Text>
      </View>
    </View>
  );

  // Loading state with progressive messages
  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>{loadingMessage}</Text>
          
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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Failed to Load Results</Text>
          <Text style={styles.errorText}>{error}</Text>
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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>No Results Available</Text>
          <Text style={styles.errorText}>No academic results found for your account.</Text>
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Academic Results</Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={handleRetry}
            accessibilityLabel="Refresh results"
          >
            <Text style={styles.refreshButtonText}>Refresh</Text>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  refreshButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  retryContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  listContainer: {
    padding: 16,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  subjectInfo: {
    flex: 1,
    marginRight: 12,
  },
  subjectCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    lineHeight: 20,
  },
  marksInfo: {
    alignItems: 'flex-end',
  },
  marks: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  percentage: {
    fontSize: 14,
    color: '#666',
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  semester: {
    fontSize: 14,
    color: '#666',
  },
  exam: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});