import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchTimetableWithToken } from '../api';
import Card from '../components/Card';
import RefreshIcon from '../components/RefreshIcon';
import { useAuth } from '../contexts/AuthContext';
import { useAppData } from '../contexts/DataContext';
import commonStyles from '../styles/commonStyles';
import styles from '../styles/timetableScreenStyles';

export default function TimetableScreen() {
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const { appData, dataLoadingStatus, updateData, isDataAvailable, hasDataError, getDataError } = useAppData();

  // Get timetable data from context
  const timetable = appData.timetable;
  const isLoading = dataLoadingStatus.timetable === 'pending';

  // AbortController for request cancellation to prevent race conditions
  const [abortController, setAbortController] = useState(null);

  useEffect(() => {
    // Set error state based on context data
    if (hasDataError('timetable')) {
      setError(getDataError('timetable'));
    } else {
      setError(null);
    }
  }, [hasDataError, getDataError]);

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
      setError(null);

      // IMPORTANT: use freshToken returned by /app/login here — do NOT read SecureStore for this first fetch.
      // This ensures timetable matches the logged-in user and prevents stale-token leakage.
      const timetableData = await fetchTimetableWithToken(token, newAbortController.signal);
      
      // Only update state if request wasn't cancelled
      if (!newAbortController.signal.aborted) {
        // Update centralized data store
        updateData('timetable', timetableData, 'success');
      }
    } catch (error) {
      if (error.name !== 'AbortError' && !newAbortController.signal.aborted) {
        console.error('Timetable fetch error:', error);
        const errorMessage = error.message || 'Failed to fetch timetable';
        setError(errorMessage);
        
        // Update centralized data store with error
        updateData('timetable', { error: errorMessage }, 'error');
      }
    } finally {
      if (!newAbortController.signal.aborted) {
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
    const variant = 'default';
    
    return (
      <Card key={dayName} variant={variant} withMargin marginSize="large" onPress={() => {}}>
        <Card.Header>
          <View style={commonStyles.rowBetween}>
            <Text style={styles.dayTitle}>{dayName.charAt(0).toUpperCase() + dayName.slice(1)}</Text>
            {isFree && (
              <View style={commonStyles.badge}>
                <Text style={[commonStyles.badgeText, commonStyles.badgeSuccessText]}>Free Day</Text>
              </View>
            )}
          </View>
        </Card.Header>
        
        <Card.Body>
          {periods.map(renderPeriod)}
        </Card.Body>
      </Card>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={commonStyles.loadingText}>Loading timetable...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.errorContainer}>
          <Text style={commonStyles.errorTitle}>Failed to Load Timetable</Text>
          <Text style={commonStyles.errorText}>{error}</Text>
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
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.errorContainer}>
          <Text style={styles.noDataTitle}>No timetable available</Text>
          <Text style={commonStyles.errorText}>No schedule found for your account.</Text>
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
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <View style={commonStyles.header}>
          <Text style={commonStyles.headerTitle}>Weekly Timetable</Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={handleRetry}
            accessibilityLabel="Refresh timetable"
          >
            <RefreshIcon size={20} color="#4F46E5" />
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