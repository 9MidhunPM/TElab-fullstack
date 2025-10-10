import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchEndSemResultsWithToken } from '../api';
import { useAuth } from '../contexts/AuthContext';

export default function EndSemResultsScreen() {
  const [endSemResults, setEndSemResults] = useState(null);
  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // AbortController for request cancellation
  const [abortController, setAbortController] = useState(null);

  useEffect(() => {
    if (token) {
      fetchEndSemResults();
    }
    
    // Cleanup: abort any pending requests when component unmounts
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [token]);

  const fetchEndSemResults = async () => {
    if (!token) return;

    // Cancel any existing request
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
      // This prevents showing another user's data due to stale tokens.
      console.log('Fetching end-semester results...');
      const endSemResultsData = await fetchEndSemResultsWithToken(token, newAbortController.signal);
      
      console.log(`End-semester results loaded: ${endSemResultsData.length} semesters found`);
      
      // Filter out semesters with empty results arrays
      const nonEmptySemesters = endSemResultsData.filter(semester => 
        semester.grades && 
        semester.grades.results && 
        Array.isArray(semester.grades.results) && 
        semester.grades.results.length > 0
      );
      
      console.log(`Filtered to ${nonEmptySemesters.length} semesters with results`);

      // Only update state if request wasn't cancelled
      if (!newAbortController.signal.aborted) {
        setEndSemResults(endSemResultsData);
        setFilteredSemesters(nonEmptySemesters);
      }
    } catch (error) {
      if (error.name !== 'AbortError' && !newAbortController.signal.aborted) {
        console.error('End-sem results fetch error:', error);
        setError(error.message || 'Failed to fetch end-semester results');
      }
    } finally {
      if (!newAbortController.signal.aborted) {
        setIsLoading(false);
        setAbortController(null);
      }
    }
  };

  const handleRetry = () => {
    fetchEndSemResults();
  };

  const renderCourseItem = ({ item: course }) => (
    <View style={styles.courseCard}>
      <View style={styles.courseHeader}>
        <View style={styles.courseInfo}>
          <Text style={styles.courseCode}>{course["Course Code"]}</Text>
          <Text style={styles.courseName}>{course["Course Name"]}</Text>
          <Text style={styles.courseDetails}>
            Slot: {course.Slot} • Credit: {course.Credit}
          </Text>
        </View>
        <View style={styles.gradeInfo}>
          <Text style={[styles.grade, getGradeColor(course.Grade)]}>{course.Grade}</Text>
          <Text style={[styles.passStatus, getPassStatusColor(course["Pass Status"])]}>
            {course["Pass Status"] || "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderSemesterSection = ({ item: semester }) => (
    <View style={styles.semesterSection}>
      <View style={styles.semesterHeader}>
        <Text style={styles.examTitle}>{semester.exam_title}</Text>
        <View style={styles.semesterInfo}>
          <View style={styles.semesterBadge}>
            <Text style={styles.semesterText}>
              Semester {semester.semester} • {semester.year}
            </Text>
          </View>
          <View style={styles.examTypeBadge}>
            <Text style={styles.examTypeText}>{semester.exam_type}</Text>
          </View>
        </View>
      </View>
      
      <FlatList
        data={semester.grades.results}
        renderItem={renderCourseItem}
        keyExtractor={(course, index) => `${semester.semester}-${course["Course Code"]}-${index}`}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const getGradeColor = (grade) => {
    const gradeValue = grade?.toUpperCase();
    if (['S', 'A+', 'A'].includes(gradeValue)) return { color: '#27ae60' };
    if (['B+', 'B', 'B-'].includes(gradeValue)) return { color: '#3498db' };
    if (['C+', 'C', 'C-'].includes(gradeValue)) return { color: '#f39c12' };
    if (['D+', 'D', 'F'].includes(gradeValue)) return { color: '#e74c3c' };
    if (gradeValue === 'P') return { color: '#9b59b6' };
    return { color: '#666' };
  };

  const getPassStatusColor = (status) => {
    return status?.toLowerCase() === 'passed' ? { color: '#27ae60' } : { color: '#e74c3c' };
  };

  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading end-semester results...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Failed to Load Results</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRetry}
            accessibilityLabel="RetryEndSemResults"
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // No data state - no end-semester results found
  if (endSemResults && filteredSemesters.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.noResultsTitle}>No end-semester results available</Text>
          <Text style={styles.errorText}>No end-semester exam results found for your account.</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRetry}
            accessibilityLabel="RetryEndSemResults"
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Success state - show filtered end-semester results
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>End-Semester Results</Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={handleRetry}
            accessibilityLabel="Refresh end-semester results"
          >
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={filteredSemesters}
          renderItem={renderSemesterSection}
          keyExtractor={(semester, index) => `semester-${semester.semester}-${semester.year}-${index}`}
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
  noResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 20,
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
  listContainer: {
    padding: 16,
  },
  semesterSection: {
    marginBottom: 24,
  },
  semesterHeader: {
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
  examTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },
  semesterInfo: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  semesterBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  semesterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  examTypeBadge: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  examTypeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseInfo: {
    flex: 1,
    marginRight: 12,
  },
  courseCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    lineHeight: 20,
    marginBottom: 4,
  },
  courseDetails: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  gradeInfo: {
    alignItems: 'flex-end',
  },
  grade: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  passStatus: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});