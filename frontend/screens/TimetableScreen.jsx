import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchTimetableWithToken } from '../api';
import { useAuth } from '../contexts/AuthContext';

export default function TimetableScreen() {
  const [timetable, setTimetable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // AbortController for request cancellation to prevent race conditions
  const [abortController, setAbortController] = useState(null);

  useEffect(() => {
    if (token) {
      fetchTimetable();
    }
    
    // Cleanup: abort any pending requests when component unmounts
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [token]);

  const fetchTimetable = async () => {
    if (!token) return;

    // Cancel any existing request to avoid race conditions
    if (abortController) {
      abortController.abort();
    }

    // Create new AbortController for this request
    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    try {
      setIsLoading(true);
      setError(null);

      // IMPORTANT: use freshToken returned by /app/login here — do NOT read SecureStore for this first fetch.
      // This ensures timetable matches the logged-in user and prevents stale-token leakage.
      const timetableData = await fetchTimetableWithToken(token, newAbortController.signal);
      
      // Only update state if request wasn't cancelled
      if (!newAbortController.signal.aborted) {
        setTimetable(timetableData);
      }
    } catch (error) {
      if (error.name !== 'AbortError' && !newAbortController.signal.aborted) {
        console.error('Timetable fetch error:', error);
        setError(error.message || 'Failed to fetch timetable');
      }
    } finally {
      if (!newAbortController.signal.aborted) {
        setIsLoading(false);
        setAbortController(null);
      }
    }
  };

  const handleRetry = () => {
    fetchTimetable();
  };

  // Normalize period keys (accept both "period-1" and "period1")
  const normalizePeriodKey = (period) => {
    if (period.startsWith('period-')) return period;
    if (period.startsWith('period')) return period.replace('period', 'period-');
    return period;
  };

  // Get periods for a day, handling various key formats
  const getPeriodsForDay = (dayData) => {
    if (!dayData) return [];
    
    const periods = [];
    for (let i = 1; i <= 7; i++) {
      const key1 = `period-${i}`;
      const key2 = `period${i}`;
      const periodData = dayData[key1] || dayData[key2] || null;
      periods.push({
        number: i,
        label: `Period ${i}`,
        data: periodData
      });
    }
    return periods;
  };

  // Check if a day is entirely free
  const isDayFree = (dayData) => {
    const periods = getPeriodsForDay(dayData);
    return periods.every(period => 
      !period.data || 
      !period.data.name || 
      period.data.name.toLowerCase().includes('free')
    );
  };

  // Check if entire timetable is empty
  const isTimetableEmpty = () => {
    if (!timetable) return true;
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days.every(day => isDayFree(timetable[day]));
  };

  const renderPeriod = (period) => (
    <View key={period.number} style={styles.periodRow}>
      <Text style={styles.periodLabel}>{period.label}</Text>
      <View style={styles.periodContent}>
        <Text style={[
          styles.subjectName, 
          (!period.data?.name || period.data.name.toLowerCase().includes('free')) && styles.freeSubject
        ]}>
          {period.data?.name || 'Free Period'}
        </Text>
        <Text style={styles.teacherName}>
          Teacher: {period.data?.teacher || '—'}
        </Text>
      </View>
    </View>
  );

  const renderDayCard = (dayName, dayData) => {
    const periods = getPeriodsForDay(dayData);
    const isFree = isDayFree(dayData);
    
    return (
      <View key={dayName} style={styles.dayCard}>
        <View style={styles.dayHeader}>
          <Text style={styles.dayTitle}>{dayName.charAt(0).toUpperCase() + dayName.slice(1)}</Text>
          {isFree && <View style={styles.freeDayBadge}>
            <Text style={styles.freeDayText}>Free Day</Text>
          </View>}
        </View>
        
        <View style={styles.periodsContainer}>
          {periods.map(renderPeriod)}
        </View>
      </View>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading timetable...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Failed to Load Timetable</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRetry}
            accessibilityLabel="RetryTimetable"
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // No data state
  if (!timetable || isTimetableEmpty()) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.noDataTitle}>No timetable available</Text>
          <Text style={styles.errorText}>No schedule found for your account.</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRetry}
            accessibilityLabel="RetryTimetable"
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Success state - show timetable
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Weekly Timetable</Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={handleRetry}
            accessibilityLabel="Refresh timetable"
          >
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {days.map(day => renderDayCard(day, timetable[day]))}
        </ScrollView>
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
  noDataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  freeDayBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  freeDayText: {
    fontSize: 12,
    color: '#27ae60',
    fontWeight: '600',
  },
  periodsContainer: {
    padding: 16,
  },
  periodRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  periodLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 80,
    marginTop: 2,
  },
  periodContent: {
    flex: 1,
    marginLeft: 12,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 20,
    marginBottom: 4,
  },
  freeSubject: {
    color: '#999',
    fontStyle: 'italic',
    fontWeight: 'normal',
  },
  teacherName: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
});