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
import { useAuth } from '../contexts/AuthContext';
import { useAppData } from '../contexts/DataContext';
import styles from '../styles/attendanceScreenStyles';
import commonStyles, { Colors } from '../styles/commonStyles';
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
        <Text style={[styles.tabButtonText, activeTab === 'attendance' && styles.activeTabButtonText]}>
          Attendance
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

  const renderAnalysisContent = () => (
    <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}>
      <Card variant="default" withMargin marginSize="medium">
        <Card.Header>
          <Text style={styles.analysisTitle}>Attendance Projections</Text>
        </Card.Header>
        <Card.Body>
          <Text style={styles.dateLabel}>Target Date:</Text>
          <TouchableOpacity 
            style={styles.dateInput} 
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateInputText}>
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
                      color: skip75.canMaintainTarget ? '#FF6B35' : Colors.danger 
                    }]}>
                      {skip75.canMaintainTarget ? `Can Miss Upto ${skip75.canSkip}` : 'N/A'}
                    </Text>
                    <Text style={styles.detailText}>
                      {skip75.optimalPercentage}%
                    </Text>
                  </View>
                  
                  <View style={styles.skip85Column}>
                    <Text style={[styles.missText, { 
                      color: skip85.canMaintainTarget ? '#FF6B35' : Colors.danger 
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
        <Text style={styles.summaryTitle}>Attendance Summary</Text>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Name:</Text>
          <Text style={styles.summaryValue}>{attendance.name}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Roll No:</Text>
          <Text style={styles.summaryValue}>{attendance.roll_no}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>University Reg:</Text>
          <Text style={styles.summaryValue}>{attendance.university_reg_no}</Text>
        </View>
        
        <View style={styles.totalPercentageContainer}>
          <Text style={styles.totalPercentageLabel}>Overall Attendance</Text>
          <Text style={styles.totalPercentage}>{attendance.total_percentage}</Text>
          <Text style={styles.totalHours}>
            {attendance.total_present_hours} / {attendance.total_hours} hours
          </Text>
        </View>
      </Card>

      <View style={styles.subjectsContainer}>
        <Text style={styles.subjectsTitle}>Subject-wise Attendance</Text>
        
        {subjects.map((subject, index) => (
          <Card 
            key={subject.code} 
            variant="small" 
            withMargin
            onPress={() => {}}
          >
            <View style={styles.subjectHeader}>
              <Text style={styles.subjectCode}>{subject.code}</Text>
              <Text style={[
                styles.subjectPercentage,
                { color: parseFloat(subject.attendance_percentage) >= 75 ? Colors.success : Colors.danger }
              ]}>
                {subject.attendance_percentage}
              </Text>
            </View>
            
            <View style={styles.subjectDetails}>
              <Text style={styles.subjectHours}>
                Present: {subject.present_hours} / {subject.total_hours} hours
              </Text>
            </View>
          </Card>
        ))}
      </View>

      {attendance.note && (
        <Card variant="warning" style={styles.noteContainer}>
          <Text style={styles.noteText}>{attendance.note}</Text>
        </Card>
      )}
      
      <View style={styles.bottomPadding} />
    </ScrollView>
  );

  if (isLoading && !attendance) {
    return (
      <SafeAreaView style={commonStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={commonStyles.loadingText}>Loading attendance...</Text>
      </SafeAreaView>
    );
  }

  if (error && !attendance) {
    return (
      <SafeAreaView style={commonStyles.errorContainer}>
        <Text style={commonStyles.errorText}>Failed to load attendance</Text>
        <Text style={commonStyles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!attendance) {
    return (
      <SafeAreaView style={commonStyles.errorContainer}>
        <Text style={commonStyles.errorText}>No attendance data available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.container}>
        <View style={styles.header}>
          <Text style={commonStyles.headerTitle}>Attendance</Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={handleRefresh}
            accessibilityLabel="Refresh attendance"
          >
            <RefreshIcon size={20} color="#4F46E5" />
          </TouchableOpacity>
        </View>
        
        {renderTabButtons()}
        
        {activeTab === 'attendance' ? renderAttendanceContent() : renderAnalysisContent()}
      </View>
    </SafeAreaView>
  );
}