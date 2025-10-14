import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabBar, TabView } from 'react-native-tab-view';
import { fetchTimetableWithToken } from '../api';
import Card from '../components/Card';
import RefreshIcon from '../components/RefreshIcon';
import { useAuth } from '../contexts/AuthContext';
import { useAppData } from '../contexts/DataContext';
import commonStyles from '../styles/commonStyles';
import styles from '../styles/timetableScreenStyles';
import { getSubjectClassesFromAttendance, getSubjectClassesPerWeek, getSubjectClassesUpToDate, getTimetableSummary } from '../utils/timetableAnalysis';

export default function TimetableScreen() {
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('timetable'); // 'timetable' or 'analysis'
  const [dayTabIndex, setDayTabIndex] = useState(0); // For day tabs in timetable
  const layout = useWindowDimensions();
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

  // Check if entire timetable is empty (excluding Saturday)
  const isTimetableEmpty = () => {
    if (!timetable) return true;
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']; // Removed Saturday
    return days.every(day => isDayFree(timetable[day]));
  };

  // Get period timing
  const getPeriodTiming = (periodNumber) => {
    const timings = {
      1: "9:00 - 10:00 AM",
      2: "10:00 - 10:45 AM", 
      3: "11:00 - 12:00 PM",
      4: "12:00 - 12:45 PM",
      5: "1:30 - 2:30 PM",
      6: "2:30 - 3:30 PM",
      7: "3:45 - 4:20 PM"
    };
    return timings[periodNumber] || "Time not set";
  };

  // Render individual period card
  const renderPeriodCard = (period) => {
    const isFree = !period.data?.name || period.data.name.toLowerCase().includes('free');
    const timing = getPeriodTiming(period.number);
    
    return (
      <Card key={period.number} variant="default" withMargin={true} marginSize="default" style={styles.periodCard}>
        <Card.Body>
          <View style={styles.periodCardHeader}>
            <Text style={styles.periodLabel}>{period.label}</Text>
            <Text style={[styles.periodStatus, isFree && styles.freeStatus]}>
              {isFree ? 'Free' : 'Class'}
            </Text>
          </View>
          
          <Text style={[styles.periodSubject, isFree && styles.freeSubject]}>
            {period.data?.name || 'Free Period'}
          </Text>
          
          {!isFree && (
            <Text style={styles.periodTeacher}>
              {period.data?.teacher || 'Teacher not assigned'}
            </Text>
          )}
          
          <View style={styles.periodCardFooter}>
            <Text style={styles.periodTiming}>{timing}</Text>
          </View>
        </Card.Body>
      </Card>
    );
  };

  // Render day content for TabView
  const renderDayContent = (dayData) => {
    const periods = getPeriodsForDay(dayData);
    
    return (
      <ScrollView 
        style={styles.dayScrollView}
        contentContainerStyle={styles.dayScrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {periods.map(renderPeriodCard)}
      </ScrollView>
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

  // Success state - show timetable (excluding Saturday)
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  
  // Calculate timetable analysis
  const weeklyClasses = getSubjectClassesPerWeek(timetable);
  const attendance = appData.attendance; // Get attendance data
  const today = new Date();
  
  // Use attendance data for total classes if available, otherwise calculate from timetable
  const classesUpToToday = attendance 
    ? getSubjectClassesFromAttendance(timetable, attendance)
    : getSubjectClassesUpToDate(timetable, today);
    
  const summary = getTimetableSummary(timetable, attendance, today);

  // Render tab buttons
  const renderTabButtons = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'timetable' && styles.activeTabButton]}
        onPress={() => setActiveTab('timetable')}
      >
        <Text style={[styles.tabButtonText, activeTab === 'timetable' && styles.activeTabButtonText]}>
          Timetable
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'analysis' && styles.activeTabButton]}
        onPress={() => setActiveTab('analysis')}
      >
        <Text style={[styles.tabButtonText, activeTab === 'analysis' && styles.activeTabButtonText]}>
          Analysis
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Create day tab routes
  const dayRoutes = days.map(day => ({
    key: day,
    title: day.charAt(0).toUpperCase() + day.slice(1)
  }));

  // Custom scene renderer that doesn't use SceneMap to avoid indicator issues
  const renderScene = ({ route }) => {
    return renderDayContent(timetable[route.key]);
  };

  // Custom TabBar for day tabs
  const renderDayTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.dayTabIndicator}
      style={styles.dayTabBar}
      labelStyle={styles.dayTabLabel}
      activeColor="#4F46E5"
      inactiveColor="#64748B"
      scrollEnabled={true}
      tabStyle={styles.dayTab}
      pressColor="rgba(79, 70, 229, 0.1)"
      bounces={false}
    />
  );

  // Render timetable content with swipeable day tabs
  const renderTimetableContent = () => (
    <View style={styles.timetableContainer}>
      <TabView
        navigationState={{ index: dayTabIndex, routes: dayRoutes }}
        renderScene={renderScene}
        onIndexChange={setDayTabIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderDayTabBar}
      />
    </View>
  );

  // Render analysis content with table
  const renderAnalysisContent = () => {
    // Combine data for table display
    const subjects = Object.keys(weeklyClasses);
    
    return (
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Card variant="default" withMargin marginSize="large">
          <Card.Header>
            <Text style={styles.dayTitle}>Class Analysis</Text>
          </Card.Header>
          
          <Card.Body>
            {/* Summary Stats */}
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>
                {summary.totalSubjects} subjects • {summary.totalWeeklyClasses} classes per week
              </Text>
              <Text style={[styles.summaryText, { fontSize: 12, marginTop: 4, fontStyle: 'italic' }]}>
                Total classes: {attendance ? 'from attendance records' : 'calculated from timetable'}
              </Text>
            </View>

            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.subjectColumn]}>Subject</Text>
              <Text style={[styles.tableHeaderText, styles.weeklyColumn]}>Per Week</Text>
              <Text style={[styles.tableHeaderText, styles.totalColumn]}>
                {attendance ? 'Total Hours' : 'Total (est.)'}
              </Text>
            </View>

            {/* Table Rows */}
            {subjects.map((subject, index) => (
              <View key={subject} style={[styles.tableRow, index % 2 === 0 && styles.evenRow]}>
                <Text style={[styles.tableCellText, styles.subjectColumn]} numberOfLines={2}>
                  {subject}
                </Text>
                <Text style={[styles.tableCellText, styles.weeklyColumn, styles.numberText]}>
                  {weeklyClasses[subject]}
                </Text>
                <Text style={[styles.tableCellText, styles.totalColumn, styles.numberText]}>
                  {classesUpToToday[subject] || 0}
                </Text>
              </View>
            ))}

            {/* Table Footer with Total */}
            <View style={styles.tableFooter}>
              <Text style={[styles.tableFooterText, styles.subjectColumn]}>Total</Text>
              <Text style={[styles.tableFooterText, styles.weeklyColumn, styles.numberText]}>
                {summary.totalWeeklyClasses}
              </Text>
              <Text style={[styles.tableFooterText, styles.totalColumn, styles.numberText]}>
                {summary.totalClassesUpToDate}
              </Text>
            </View>
          </Card.Body>
        </Card>
      </ScrollView>
    );
  };
  
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <View style={commonStyles.header}>
          <Text style={commonStyles.headerTitle}>Timetable</Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={handleRetry}
            accessibilityLabel="Refresh timetable"
          >
            <RefreshIcon size={20} color="#4F46E5" />
          </TouchableOpacity>
        </View>
        
        {/* Tab Buttons */}
        {renderTabButtons()}
        
        {/* Tab Content */}
        {activeTab === 'timetable' ? renderTimetableContent() : renderAnalysisContent()}
      </View>
    </SafeAreaView>
  );
}