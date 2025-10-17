import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Platform,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAttendanceWithToken } from '../api';
import Card from '../components/Card';
import RefreshIcon from '../components/RefreshIcon';
import {
    BookIcon,
    CalendarIcon,
    CardIcon,
    ChartIcon,
    CheckCircleIcon,
    ClockIcon,
    InfoIcon,
    PercentIcon,
    SchoolIcon,
    UserIcon,
    WarningIcon
} from '../components/icons/SvgIcons';
import { Colors } from '../constants/colors';
import { useAuth } from '../contexts/AuthContext';
import { useAppData } from '../contexts/DataContext';
import styles from '../styles/attendanceScreenStyles';
import commonStyles from '../styles/commonStyles';
import { formatDateToDDMMYY, getComprehensiveAnalysis } from '../utils/attendanceAnalysis';

export default function AttendanceScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('attendance');
  const [targetDate, setTargetDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const { token } = useAuth();
  const { appData, dataLoadingStatus, updateData, isDataAvailable, hasDataError, getDataError } = useAppData();

  // Get attendance data from context
  const attendance = appData.attendance;
  const isLoading = dataLoadingStatus.attendance === 'pending';

  // AbortController for request cancellation
  const [abortController, setAbortController] = useState(null);

  useEffect(() => {
    // Set error state based on context data
    if (hasDataError('attendance')) {
      setError(getDataError('attendance'));
    } else {
      setError(null);
    }
  }, [hasDataError, getDataError]);

  const fetchAttendance = async (isRefresh = false) => {
    if (!token) return;

    // Cancel any existing request
    if (abortController) {
      abortController.abort();
    }

    // Create new AbortController for this request
    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    try {
      if (isRefresh) {
        setIsRefreshing(true);
      }
      setError(null);

      // Use the fresh token to fetch attendance
      // IMPORTANT: This ensures we never use stale attendance data
      const attendanceData = await fetchAttendanceWithToken(token, newAbortController.signal);
      
      // Update centralized data store
      updateData('attendance', attendanceData, 'success');
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Attendance fetch error:', error);
        const errorMessage = error.message || 'Failed to fetch attendance data';
        setError(errorMessage);
        
        // Update centralized data store with error
        updateData('attendance', { error: errorMessage }, 'error');
        
        Alert.alert('Error', 'Failed to fetch attendance data. Please try again.');
      }
    } finally {
      setIsRefreshing(false);
      setAbortController(null);
    }
  };

  const handleRefresh = () => {
    fetchAttendance(true);
  };

  // Extract subjects from attendance data (exclude summary fields)
  const getSubjects = () => {
    if (!attendance) return [];
    
    const excludeKeys = ['roll_no', 'total_hours', 'total_present_hours', 'total_percentage', 'university_reg_no', 'name', 'note'];
    
    return Object.entries(attendance)
      .filter(([key]) => !excludeKeys.includes(key))
      .map(([code, data]) => ({ code, ...data }));
  };

  // Get subject name from timetable or results data
  const getSubjectName = (subjectCode) => {
    // First try to find in timetable
    if (appData.timetable) {
      const timetable = appData.timetable;
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      
      for (const day of days) {
        const dayData = timetable[day];
        if (!dayData) continue;
        
        for (let i = 1; i <= 7; i++) {
          const periodData = dayData[`period-${i}`] || dayData[`period${i}`];
          if (periodData && periodData.code === subjectCode && periodData.name) {
            return periodData.name;
          }
        }
      }
    }
    
    // Then try to find in results
    if (appData.results && Array.isArray(appData.results)) {
      const result = appData.results.find(r => r.subjectCode === subjectCode);
      if (result && result.subjectName) {
        return result.subjectName;
      }
    }
    
    // Return null if no match found
    return null;
  };

  const subjects = getSubjects();

  const handleAnalyze = () => {
    if (!targetDate || !attendance || !appData.timetable) {
      Alert.alert('Error', 'Please select a valid date and ensure data is loaded');
      return;
    }

    try {
      const analysis = getComprehensiveAnalysis(attendance, appData.timetable, targetDate);
      setAnalysisData(analysis);
    } catch (error) {
      Alert.alert('Error', 'Failed to analyze data. Please try again.');
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || targetDate;
    setShowDatePicker(Platform.OS === 'ios');
    setTargetDate(currentDate);
  };

  const renderTabButtons = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'attendance' && styles.activeTabButton]}
        onPress={() => setActiveTab('attendance')}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <PercentIcon size={16} color={activeTab === 'attendance' ? Colors.white : Colors.textSecondary} />
          <Text style={[styles.tabButtonText, activeTab === 'attendance' && styles.activeTabButtonText, { marginLeft: 6 }]}>
            Attendance
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'analysis' && styles.activeTabButton]}
        onPress={() => setActiveTab('analysis')}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ChartIcon size={16} color={activeTab === 'analysis' ? Colors.white : Colors.textSecondary} />
          <Text style={[styles.tabButtonText, activeTab === 'analysis' && styles.activeTabButtonText, { marginLeft: 6 }]}>
            Analysis
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderAnalysisContent = () => (
    <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}>
      <Card variant="default" withMargin marginSize="medium">
        <Card.Header>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ width: 24, alignItems: 'center', marginRight: 8, marginTop: 2 }}>
              <ChartIcon size={20} color={Colors.primary} />
            </View>
            <Text style={styles.analysisTitle}>Attendance Projections</Text>
          </View>
        </Card.Header>
        <Card.Body>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
            <View style={{ width: 20, alignItems: 'center', marginRight: 6, marginTop: 2 }}>
              <CalendarIcon size={16} color={Colors.textSecondary} outline />
            </View>
            <Text style={styles.dateLabel}>Target Date:</Text>
          </View>
          <TouchableOpacity 
            style={styles.dateInput} 
            onPress={() => setShowDatePicker(true)}
          >
            <CalendarIcon size={18} color={Colors.primary} outline />
            <Text style={[styles.dateInputText, { marginLeft: 8 }]}>
              {formatDateToDDMMYY(targetDate)}
            </Text>
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={targetDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
          
          <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyze}>
            <Text style={styles.analyzeButtonText}>Analyze</Text>
          </TouchableOpacity>
        </Card.Body>
      </Card>

      {analysisData && (
        <Card variant="default" withMargin marginSize="medium">
          <Card.Header>
            <Text style={styles.analysisTitle}>Attendance Analysis</Text>
          </Card.Header>
          
          <Card.Body>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>
                Analysis for: {formatDateToDDMMYY(analysisData.targetDate)}
              </Text>
            </View>

            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.subjectColumn]}>Subject</Text>
              <Text style={[styles.tableHeaderText, styles.perfectColumn]}>Perfect</Text>
              <Text style={[styles.tableHeaderText, styles.skip75Column]}>75% Target</Text>
              <Text style={[styles.tableHeaderText, styles.skip85Column]}>85% Target</Text>
            </View>

            {/* Table Rows */}
            {Object.keys(analysisData.perfectAttendance).map((code, index) => {
              const perfect = analysisData.perfectAttendance[code];
              const skip75 = analysisData.skip75[code];
              const skip85 = analysisData.skip85[code];
              
              return (
                <View key={code} style={[styles.tableRow, index % 2 === 0 && styles.evenRow]}>
                  <View style={styles.subjectColumn}>
                    <Text style={styles.tableCellText} numberOfLines={1}>{code}</Text>
                    <Text style={styles.currentStats}>
                      Current: {perfect.currentPresent}/{perfect.currentTotal} ({perfect.currentPercentage}%)
                    </Text>
                  </View>
                  
                  <View style={styles.perfectColumn}>
                    <Text style={[styles.percentageText, { 
                      color: perfect.projectedPercentage >= 75 ? Colors.success : Colors.danger 
                    }]}>
                      {perfect.projectedPercentage}%
                    </Text>
                    <Text style={styles.detailText}>
                      +{perfect.additionalClasses} = {perfect.projectedPresent}/{perfect.projectedTotal}
                    </Text>
                  </View>
                  
                  <View style={styles.skip75Column}>
                    <Text style={[styles.missText, { 
                      color: skip75.canMaintainTarget ? Colors.warningOrange : Colors.danger 
                    }]}>
                      {skip75.canMaintainTarget ? `Can Miss Upto ${skip75.canSkip}` : 'N/A'}
                    </Text>
                    <Text style={styles.detailText}>
                      {skip75.optimalPercentage}%
                    </Text>
                  </View>
                  
                  <View style={styles.skip85Column}>
                    <Text style={[styles.missText, { 
                      color: skip85.canMaintainTarget ? Colors.warningOrange : Colors.danger 
                    }]}>
                      {skip85.canMaintainTarget ? `Can Miss Upto ${skip85.canSkip}` : 'N/A'}
                    </Text>
                    <Text style={styles.detailText}>
                      {skip85.optimalPercentage}%
                    </Text>
                  </View>
                </View>
              );
            })}
          </Card.Body>
        </Card>
      )}
      
      <View style={styles.bottomPadding} />
    </ScrollView>
  );

  const renderAttendanceContent = () => (
    <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}>
      <Card variant="default" style={styles.summaryCard}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
          <View style={{ width: 24, alignItems: 'center', marginRight: 8, marginTop: 2 }}>
            <UserIcon size={20} color={Colors.primary} />
          </View>
          <Text style={styles.summaryTitle}>Attendance Summary</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ width: 20, alignItems: 'center', marginRight: 6, marginTop: 2 }}>
              <UserIcon size={14} color={Colors.textSecondary} />
            </View>
            <Text style={styles.summaryLabel}>Name:</Text>
          </View>
          <Text style={styles.summaryValue}>{attendance.name}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ width: 20, alignItems: 'center', marginRight: 6, marginTop: 2 }}>
              <CardIcon size={14} color={Colors.textSecondary} />
            </View>
            <Text style={styles.summaryLabel}>Roll No:</Text>
          </View>
          <Text style={styles.summaryValue}>{attendance.roll_no}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ width: 20, alignItems: 'center', marginRight: 6, marginTop: 2 }}>
              <SchoolIcon size={14} color={Colors.textSecondary} />
            </View>
            <Text style={styles.summaryLabel}>University Reg:</Text>
          </View>
          <Text style={styles.summaryValue}>{attendance.university_reg_no}</Text>
        </View>
        
        <View style={styles.totalPercentageContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
            <View style={{ width: 22, alignItems: 'center', marginRight: 8, marginTop: 2 }}>
              <PercentIcon size={18} color={Colors.primary} />
            </View>
            <Text style={styles.totalPercentageLabel}>Overall Attendance</Text>
          </View>
          <Text style={styles.totalPercentage}>{attendance.total_percentage}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', marginTop: 4 }}>
            <View style={{ width: 18, alignItems: 'center', marginRight: 6, marginTop: 2 }}>
              <ClockIcon size={14} color={Colors.textSecondary} />
            </View>
            <Text style={styles.totalHours}>
              {attendance.total_present_hours} / {attendance.total_hours} hours
            </Text>
          </View>
        </View>
      </Card>

      <View style={styles.subjectsContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
          <View style={{ width: 22, alignItems: 'center', marginRight: 8, marginTop: 2 }}>
            <BookIcon size={18} color={Colors.textPrimary} />
          </View>
          <Text style={styles.subjectsTitle}>Subject-wise Attendance</Text>
        </View>
        
        {subjects.map((subject, index) => {
          const percentage = parseFloat(subject.attendance_percentage);
          const isGood = percentage >= 75;
          const subjectName = getSubjectName(subject.code);
          
          return (
            <Card 
              key={subject.code} 
              variant="small" 
              withMargin
              onPress={() => {}}
            >
              <View style={styles.subjectHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
                  <View style={{ width: 20, alignItems: 'center', marginRight: 8, marginTop: 2 }}>
                    <BookIcon size={16} color={isGood ? Colors.success : Colors.danger} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.subjectCode}>{subject.code}</Text>
                    {subjectName && (
                      <Text style={styles.subjectName} numberOfLines={2}>
                        {subjectName}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View style={{ width: 20, alignItems: 'center', marginRight: 6, marginTop: 2 }}>
                    {isGood ? (
                      <CheckCircleIcon size={16} color={Colors.success} />
                    ) : (
                      <WarningIcon size={16} color={Colors.danger} />
                    )}
                  </View>
                  <Text style={[
                    styles.subjectPercentage,
                    { color: isGood ? Colors.success : Colors.danger }
                  ]}>
                    {subject.attendance_percentage}
                  </Text>
                </View>
              </View>
              
              <View style={styles.subjectDetails}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View style={{ width: 18, alignItems: 'center', marginRight: 6, marginTop: 2 }}>
                    <CalendarIcon size={14} color={Colors.textSecondary} outline />
                  </View>
                  <Text style={styles.subjectHours}>
                    Present: {subject.present_hours} / {subject.total_hours} hours
                  </Text>
                </View>
              </View>
            </Card>
          );
        })}
      </View>

      {attendance.note && (
        <Card variant="warning" style={styles.noteContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ width: 22, alignItems: 'center', marginRight: 8, marginTop: 2 }}>
              <InfoIcon size={18} color={Colors.warning} />
            </View>
            <Text style={[styles.noteText, { flex: 1 }]}>{attendance.note}</Text>
          </View>
        </Card>
      )}
      
      <View style={styles.bottomPadding} />
    </ScrollView>
  );

  if (isLoading && !attendance) {
    return (
      <SafeAreaView style={commonStyles.loadingContainer} edges={['top']}>
        <ActivityIndicator size="large" color={Colors.spinner} />
        <Text style={commonStyles.loadingText}>Loading attendance...</Text>
      </SafeAreaView>
    );
  }

  if (error && !attendance) {
    return (
      <SafeAreaView style={commonStyles.errorContainer} edges={['top']}>
        <Text style={commonStyles.errorText}>Failed to load attendance</Text>
        <Text style={commonStyles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!attendance) {
    return (
      <SafeAreaView style={commonStyles.errorContainer} edges={['top']}>
        <Text style={commonStyles.errorText}>No attendance data available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
      <View style={commonStyles.container}>
        <View style={styles.header}>
          <Text style={commonStyles.headerTitle}>Attendance</Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={handleRefresh}
            accessibilityLabel="Refresh attendance"
          >
            <RefreshIcon size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        
        {renderTabButtons()}
        
        {activeTab === 'attendance' ? renderAttendanceContent() : renderAnalysisContent()}
      </View>
    </SafeAreaView>
  );
}