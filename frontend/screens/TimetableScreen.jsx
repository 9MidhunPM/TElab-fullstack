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
import {
    BookIcon,
    CalendarIcon,
    ChartIcon,
    CheckCircleIcon,
    ClockIcon,
    InfoIcon,
    TeacherIcon,
    TimeIcon
} from '../components/icons/SvgIcons';
import { useAuth } from '../contexts/AuthContext';
import { useAppData } from '../contexts/DataContext';
import { useTheme } from '../hooks/useTheme';
import { getSubjectClassesFromAttendance, getSubjectClassesPerWeek, getSubjectClassesUpToDate, getTimetableSummary } from '../utils/timetableAnalysis';


export default function TimetableScreen() {
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('timetable'); // 'timetable' or 'analysis'
  const [dayTabIndex, setDayTabIndex] = useState(0); // For day tabs in timetable
  const layout = useWindowDimensions();
  const { token } = useAuth();
  const { appData, dataLoadingStatus, updateData, isDataAvailable, hasDataError, getDataError } = useAppData();
  const { Colors, commonStyles, timetableScreenStyles: styles } = useTheme();

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
            <View style={[commonStyles.iconTextRow, { alignItems: 'center' }]}>
              <TimeIcon 
                size={16} 
                color={isFree ? Colors.textSecondary : Colors.primary} 
                outline={isFree}
              />
              <Text style={[styles.periodLabel, { marginLeft: 4 }]}>{period.label}</Text>
            </View>
            <View style={[commonStyles.iconTextRow, { alignItems: 'center' }]}>
              {isFree ? (
                <CheckCircleIcon size={14} color={Colors.success} />
              ) : (
                <BookIcon size={14} color={Colors.primary} />
              )}
              <Text style={[styles.periodStatus, isFree && styles.freeStatus, { marginLeft: 4 }]}>
                {isFree ? 'Free' : 'Class'}
              </Text>
            </View>
          </View>
          
          <View style={[commonStyles.iconTextRow, { marginTop: 8, marginBottom: 4 }]}>
            <View style={commonStyles.iconContainer}>
              <BookIcon size={16} color={isFree ? Colors.textSecondary : Colors.primary} />
            </View>
            <Text style={[styles.periodSubject, isFree && styles.freeSubject]}>
              {period.data?.name || 'Free Period'}
            </Text>
          </View>
          
          {!isFree && (
            <View style={[commonStyles.iconTextRow, { marginBottom: 8 }]}>
              <View style={commonStyles.iconContainer}>
                <TeacherIcon size={14} color={Colors.textSecondary} />
              </View>
              <Text style={styles.periodTeacher}>
                {period.data?.teacher || 'Teacher not assigned'}
              </Text>
            </View>
          )}
          
          <View style={styles.periodCardFooter}>
            <View style={[commonStyles.iconTextRow, { alignItems: 'center' }]}>
              <ClockIcon size={12} color={Colors.accent} />
              <Text style={[styles.periodTiming, { marginLeft: 4 }]}>{timing}</Text>
            </View>
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
      <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
        <View style={commonStyles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.spinner} />
          <Text style={commonStyles.loadingText}>Loading timetable...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
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
      <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
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
        <View style={[commonStyles.iconTextRow, { alignItems: 'center' }]}>
          <CalendarIcon 
            size={16} 
            color={activeTab === 'timetable' ? Colors.white : Colors.textSecondary}
            outline={activeTab !== 'timetable'}
          />
          <Text style={[styles.tabButtonText, activeTab === 'timetable' && styles.activeTabButtonText, { marginLeft: 6 }]}>
            Timetable
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'analysis' && styles.activeTabButton]}
        onPress={() => setActiveTab('analysis')}
      >
        <View style={[commonStyles.iconTextRow, { alignItems: 'center' }]}>
          <ChartIcon 
            size={16} 
            color={activeTab === 'analysis' ? Colors.white : Colors.textSecondary}
          />
          <Text style={[styles.tabButtonText, activeTab === 'analysis' && styles.activeTabButtonText, { marginLeft: 6 }]}>
            Analysis
          </Text>
        </View>
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
      activeColor={Colors.timetablePrimary}
      inactiveColor={Colors.timetableInactive}
      scrollEnabled={true}
      tabStyle={styles.dayTab}
      pressColor={Colors.timetablePressOverlay}
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
            <View style={[commonStyles.iconTextRow, { alignItems: 'center' }]}>
              <View style={commonStyles.iconContainer}>
                <ChartIcon size={20} color={Colors.primary} />
              </View>
              <Text style={styles.dayTitle}>Class Analysis</Text>
            </View>
          </Card.Header>
          
          <Card.Body>
            {/* Summary Stats */}
            <View style={styles.summaryContainer}>
              <View style={[commonStyles.iconTextRow, { marginBottom: 4 }]}>
                <View style={commonStyles.iconContainer}>
                  <InfoIcon size={16} color={Colors.info} />
                </View>
                <Text style={styles.summaryText}>
                  {summary.totalSubjects} subjects • {summary.totalWeeklyClasses} classes per week
                </Text>
              </View>
              <Text style={[styles.summaryText, { fontSize: 12, marginTop: 4, fontStyle: 'italic', marginLeft: 24 }]}>
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
                <View style={[styles.subjectColumn, commonStyles.iconTextRow]}>
                  <View style={commonStyles.iconContainer}>
                    <BookIcon size={14} color={Colors.primary} />
                  </View>
                  <Text style={[styles.tableCellText, { flex: 1 }]} numberOfLines={2}>
                    {subject}
                  </Text>
                </View>
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
    <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
      <View style={commonStyles.container}>
        <View style={commonStyles.header}>
          <View style={[commonStyles.iconTextRow, { flex: 1 }]}>
            <View style={commonStyles.iconContainer}>
              <CalendarIcon size={24} color={Colors.primary} />
            </View>
            <Text style={commonStyles.headerTitle}>Timetable</Text>
          </View>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={handleRetry}
            accessibilityLabel="Refresh timetable"
          >
            <RefreshIcon size={20} color={Colors.primary} />
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