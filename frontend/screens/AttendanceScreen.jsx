import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAttendanceWithToken } from '../api';
import { useAuth } from '../contexts/AuthContext';

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
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading attendance...</Text>
      </SafeAreaView>
    );
  }

  if (error && !attendance) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load attendance</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!attendance) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>No attendance data available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
      {/* Summary Card */}
      <View style={styles.summaryCard}>
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
      </View>

      {/* Subjects List */}
      <View style={styles.subjectsContainer}>
        <Text style={styles.subjectsTitle}>Subject-wise Attendance</Text>
        
        {subjects.map((subject, index) => (
          <View key={subject.code} style={styles.subjectCard}>
            <View style={styles.subjectHeader}>
              <Text style={styles.subjectCode}>{subject.code}</Text>
              <Text style={[
                styles.subjectPercentage,
                { color: parseFloat(subject.attendance_percentage) >= 75 ? '#27ae60' : '#e74c3c' }
              ]}>
                {subject.attendance_percentage}
              </Text>
            </View>
            
            <View style={styles.subjectDetails}>
              <Text style={styles.subjectHours}>
                Present: {subject.present_hours} / {subject.total_hours} hours
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Note */}
      {attendance.note && (
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>{attendance.note}</Text>
        </View>
      )}
      
      <View style={styles.bottomPadding} />
    </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  totalPercentageContainer: {
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalPercentageLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  totalPercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  totalHours: {
    fontSize: 14,
    color: '#999',
  },
  subjectsContainer: {
    margin: 16,
    marginTop: 0,
  },
  subjectsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginLeft: 4,
  },
  subjectCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  subjectPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subjectDetails: {
    marginTop: 4,
  },
  subjectHours: {
    fontSize: 14,
    color: '#666',
  },
  noteContainer: {
    backgroundColor: '#fff3cd',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  noteText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 20,
  },
});