import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchEndSemResultsWithToken } from '../api';
import Card from '../components/Card';
import RefreshIcon from '../components/RefreshIcon';
import { useAuth } from '../contexts/AuthContext';
import { useAppData } from '../contexts/DataContext';
import commonStyles, { Colors } from '../styles/commonStyles';
import styles from '../styles/endSemResultsScreenStyles';

export default function EndSemResultsScreen() {
  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const { appData, dataLoadingStatus, updateData, isDataAvailable, hasDataError, getDataError } = useAppData();

  // Get end sem results data from context
  const endSemResults = appData.endSemResults;
  const isLoading = dataLoadingStatus.endSemResults === 'pending';

  // AbortController for request cancellation
  const [abortController, setAbortController] = useState(null);

  useEffect(() => {
    // Set error state based on context data
    if (hasDataError('endSemResults')) {
      setError(getDataError('endSemResults'));
    } else {
      setError(null);
    }
  }, [hasDataError, getDataError]);

  // Update filtered semesters when endSemResults changes
  useEffect(() => {
    if (endSemResults && !hasDataError('endSemResults')) {
      processEndSemResults(endSemResults);
    }
  }, [endSemResults, hasDataError]);

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
      setError(null);

      // IMPORTANT: use freshToken returned by /app/login here — do NOT read SecureStore for this first fetch. 
      // This prevents showing another user's data due to stale tokens.
      console.log('Fetching end-semester results...');
      const endSemResultsData = await fetchEndSemResultsWithToken(token, newAbortController.signal);
      
      console.log(`End-semester results loaded: ${endSemResultsData.length} semesters found`);
      
      // Only update state if request wasn't cancelled
      if (!newAbortController.signal.aborted) {
        // Update centralized data store
        updateData('endSemResults', endSemResultsData, 'success');
      }
    } catch (error) {
      if (error.name !== 'AbortError' && !newAbortController.signal.aborted) {
        console.error('End-sem results fetch error:', error);
        const errorMessage = error.message || 'Failed to fetch end-semester results';
        setError(errorMessage);
        
        // Update centralized data store with error
        updateData('endSemResults', { error: errorMessage }, 'error');
      }
    } finally {
      if (!newAbortController.signal.aborted) {
        setAbortController(null);
      }
    }
  };

  // Process end sem results to filter out empty semesters
  const processEndSemResults = (data) => {
    if (!data || !Array.isArray(data)) return;
    
    // Filter out semesters with empty results arrays
    const nonEmptySemesters = data.filter(semester => 
      semester.grades && 
      semester.grades.results && 
      Array.isArray(semester.grades.results) && 
      semester.grades.results.length > 0
    );
    
    console.log(`Filtered to ${nonEmptySemesters.length} semesters with results`);
    setFilteredSemesters(nonEmptySemesters);
  };

  const handleRetry = () => {
    fetchEndSemResults();
  };

  const renderCourseItem = ({ item: course }) => {
    return (
      <Card variant="small" withMargin onPress={() => {}}>
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
      </Card>
    );
  };

  const renderSemesterSection = ({ item: semester }) => (
    <View style={styles.semesterSection}>
      <Card variant="secondary" withMargin marginSize="large" onPress={() => {}}>
        <Card.Header>
          <Text style={styles.examTitle}>{semester.exam_title}</Text>
          <View style={styles.semesterInfo}>
            <View style={[commonStyles.badge, commonStyles.badgeSuccess]}>
              <Text style={[commonStyles.badgeText, commonStyles.badgeSuccessText]}>
                Semester {semester.semester} • {semester.year}
              </Text>
            </View>
            <View style={[commonStyles.badge, { backgroundColor: Colors.accentLight, marginLeft: 8 }]}>
              <Text style={[commonStyles.badgeText, { color: Colors.accent }]}>{semester.exam_type}</Text>
            </View>
          </View>
        </Card.Header>
      </Card>
      
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
      <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
        <View style={commonStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={commonStyles.loadingText}>Loading end-semester results...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
        <View style={commonStyles.errorContainer}>
          <Text style={commonStyles.errorTitle}>Failed to Load Results</Text>
          <Text style={commonStyles.errorText}>{error}</Text>
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
      <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
        <View style={commonStyles.errorContainer}>
          <Text style={styles.noResultsTitle}>No end-semester results available</Text>
          <Text style={commonStyles.errorText}>No end-semester exam results found for your account.</Text>
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
    <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
      <View style={commonStyles.container}>
        <View style={commonStyles.header}>
          <Text style={commonStyles.headerTitle}>End-Semester Results</Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={handleRetry}
            accessibilityLabel="Refresh end-semester results"
          >
            <RefreshIcon size={20} color="#4F46E5" />
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