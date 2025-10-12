import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAttendanceWithToken } from '../api';
import Card from '../components/Card';
import RefreshIcon from '../components/RefreshIcon';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/attendanceScreenStyles';
import commonStyles, { Colors } from '../styles/commonStyles';

export default function AttendanceScreen() {
  const [attendance, setAttendance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // AbortController for request cancellation
  const [abortController, setAbortController] = useState(null);

  useEffect(() => {
    if (token) {
      fetchAttendance();
    }
    
    // Cleanup: abort any pending requests when component unmounts
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [token]);

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
      } else {
        setIsLoading(true);
      }
      setError(null);

      // Use the fresh token to fetch attendance
      // IMPORTANT: This ensures we never use stale attendance data
      const attendanceData = await fetchAttendanceWithToken(token, newAbortController.signal);
      setAttendance(attendanceData);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Attendance fetch error:', error);
        setError(error.message || 'Failed to fetch attendance data');
        Alert.alert('Error', 'Failed to fetch attendance data. Please try again.');
      }
    } finally {
      setIsLoading(false);
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
        
        <ScrollView 
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
        >
      {/* Summary Card */}
      <Card 
        variant="default" 
        style={styles.summaryCard}
      >
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

      {/* Subjects List */}
      <View style={styles.subjectsContainer}>
        <Text style={styles.subjectsTitle}>Subject-wise Attendance</Text>
        
        {subjects.map((subject, index) => (
          <Card 
            key={subject.code} 
            variant="small" 
            withMargin
            onPress={() => {
            }}
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

      {/* Note */}
      {attendance.note && (
        <Card 
          variant="warning" 
          style={styles.noteContainer}
        >
          <Text style={styles.noteText}>{attendance.note}</Text>
        </Card>
      )}
      
      <View style={styles.bottomPadding} />
    </ScrollView>
    </View>
    </SafeAreaView>
  );
}