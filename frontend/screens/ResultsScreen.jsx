import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchResultsWithToken } from '../api';
import Card from '../components/Card';
import RefreshIcon from '../components/RefreshIcon';
import { useAuth } from '../contexts/AuthContext';
import { useAppData } from '../contexts/DataContext';
import commonStyles, { Colors } from '../styles/commonStyles';
import styles from '../styles/resultsScreenStyles';
import { getResultsAnalysis } from '../utils/resultsAnalysis';

export default function ResultsScreen() {
  const [error, setError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading results...');
  const [showRetryOption, setShowRetryOption] = useState(false);
  const [activeTab, setActiveTab] = useState('results');
  const [analysisData, setAnalysisData] = useState([]);
  const [impossibleSubjects, setImpossibleSubjects] = useState([]);
  const { token } = useAuth();
  const { appData, dataLoadingStatus, updateData, isDataAvailable, hasDataError, getDataError } = useAppData();

  // Get results data from context
  const results = appData.results;
  const attendance = appData.attendance;
  const isLoading = dataLoadingStatus.results === 'pending';

  // AbortController for request cancellation and timeout tracking
  const [abortController, setAbortController] = useState(null);
  const timeoutRefs = useRef({ fiveSecond: null, twentyFiveSecond: null });

  useEffect(() => {
    // Set error state based on context data
    if (hasDataError('results')) {
      setError(getDataError('results'));
    } else {
      setError(null);
    }
  }, [hasDataError, getDataError]);

  const clearTimeouts = () => {
    if (timeoutRefs.current.fiveSecond) {
      clearTimeout(timeoutRefs.current.fiveSecond);
      timeoutRefs.current.fiveSecond = null;
    }
    if (timeoutRefs.current.twentyFiveSecond) {
      clearTimeout(timeoutRefs.current.twentyFiveSecond);
      timeoutRefs.current.twentyFiveSecond = null;
    }
  };

  const fetchResults = async () => {
    if (!token) return;

    // Cancel any existing request and clear previous timeouts
    if (abortController) {
      abortController.abort();
    }
    clearTimeouts();

    // Create new AbortController for this request
    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    try {
      setError(null);
      setLoadingMessage('Fetching results from ETLab...');
      setShowRetryOption(false);

      // Set timeout for 5 seconds to change message
      timeoutRefs.current.fiveSecond = setTimeout(() => {
        if (!newAbortController.signal.aborted) {
          setLoadingMessage('This report is taking longer than usual (may take up to 30s).');
        }
      }, 5000);

      // Set timeout for 25 seconds to show retry option
      timeoutRefs.current.twentyFiveSecond = setTimeout(() => {
        if (!newAbortController.signal.aborted) {
          setShowRetryOption(true);
        }
      }, 25000);

      // CRITICAL: Use the fresh token from AuthContext, never read from SecureStore
      // This ensures we always use the current session token returned by login
      console.log('Fetching results...');
      const resultsData = await fetchResultsWithToken(token, newAbortController.signal);
      console.log(`Results loaded: ${resultsData.length} Exams found`);
      
      // Only update state if request wasn't cancelled
      if (!newAbortController.signal.aborted) {
        // Update centralized data store
        updateData('results', resultsData, 'success');
        clearTimeouts();
      }
    } catch (error) {
      if (error.name !== 'AbortError' && !newAbortController.signal.aborted) {
        console.error('Results fetch error:', error);
        const errorMessage = error.message || 'Failed to fetch results data';
        setError(errorMessage);
        
        // Update centralized data store with error
        updateData('results', { error: errorMessage }, 'error');
        clearTimeouts();
      }
    } finally {
      if (!newAbortController.signal.aborted) {
        setAbortController(null);
      }
    }
  };

  const handleRetry = () => {
    fetchResults();
  };

  const generateAnalysis = () => {
    if (results && attendance) {
      const analysis = getResultsAnalysis(results, attendance);
      
      // Filter out 24PWT208 and apply special rules for 24CSR304
      const filteredAnalysis = analysis
        .filter(item => item.subjectCode !== '24PWT208')
        .map(item => {
          // Special handling for 24CSR304
          if (item.subjectCode === '24CSR304') {
            // Convert CAT-1 from /12.5 to /7.5 scale
            const adjustedCat1 = (item.cat1 / 12.5) * 7.5;
            return {
              ...item,
              cat1: adjustedCat1,
              isSpecialSubject: true,
              total: adjustedCat1 + item.assignment + (item.attendanceMarks || 0)
            };
          }
          
          // Regular subjects
          return {
            ...item,
            total: item.cat1 + item.assignment + (item.attendanceMarks || 0)
          };
        });
      
      setAnalysisData(filteredAnalysis);
    }
  };

  const refreshTable = () => {
    // Clear all input data and regenerate fresh analysis
    generateAnalysis();
  };



  // Generate analysis when both results and attendance are available
  useEffect(() => {
    generateAnalysis();
  }, [results, attendance]);

  const roundToHalf = (num) => {
    return Math.round(num * 2) / 2;
  };

  const updateAnalysisField = (index, field, value, maxValue = 10) => {
    const newData = [...analysisData];
    let numericValue = parseFloat(value) || 0;
    
    // Cap assignment at the appropriate maximum (10 for regular, 30 for 24CSR304)
    if (field === 'assignment' && numericValue > maxValue) {
      numericValue = maxValue;
    }
    
    newData[index] = { 
      ...newData[index], 
      [field]: numericValue,
      // Recalculate total immediately when any field changes (no CAT-2)
      total: newData[index].cat1 + 
             (field === 'assignment' ? numericValue : newData[index].assignment) + 
             (newData[index].attendanceMarks || 0)
    };
    setAnalysisData(newData);
  };

  const renderTabButtons = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'results' && styles.activeTabButton]}
        onPress={() => setActiveTab('results')}
      >
        <Text style={[styles.tabButtonText, activeTab === 'results' && styles.activeTabButtonText]}>
          Results
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

  const renderResultItem = ({ item }) => {
    const percentage = ((parseFloat(item.marksObtained) / parseFloat(item.maximumMarks)) * 100);
    
    return (
      <Card variant="small" withMargin onPress={() => {}}>
        <View style={styles.resultHeader}>
          <View style={styles.subjectInfo}>
            <Text style={styles.subjectCode}>{item.subjectCode}</Text>
            <Text style={styles.subjectName}>{item.subjectName}</Text>
          </View>
          <View style={styles.marksInfo}>
            <Text style={styles.marks}>
              {item.marksObtained}/{item.maximumMarks}
            </Text>
            <Text style={styles.percentage}>
              {percentage.toFixed(1)}%
            </Text>
          </View>
        </View>
        <View style={styles.resultFooter}>
          <Text style={styles.semester}>{item.semester}</Text>
          <Text style={styles.exam}>Exam {item.exam}</Text>
        </View>
      </Card>
    );
  };

  const renderAnalysisContent = () => (
    <ScrollView contentContainerStyle={styles.listContainer}>
      <Card variant="default" withMargin marginSize="medium">
        <Card.Header>
          <Text style={styles.analysisTitle}>Grade Analysis</Text>
        </Card.Header>
        
        <Card.Body>
          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Marking Scale:</Text>
            <Text style={styles.legendItem}>• Regular: CAT-1 & Min CAT-2: /12.5 each, Assignment: /10, Total: /40</Text>
            <Text style={styles.legendItem}>• 24CSR304: CAT-1 & Min CAT-2: /7.5 each, Assignment: /30, Total: /50</Text>
            <Text style={styles.legendItem}>• Min CAT-2 shows marks needed for 26+ total (red = impossible)</Text>
            <Text style={styles.legendItem}>• Attendance: 85%+=5, 80-85%=4, 75-80%=3, Below 75%=N/A</Text>
            <Text style={styles.legendItem}>• 24PWT208 is excluded from analysis</Text>
          </View>
        </Card.Body>
      </Card>

      <View style={styles.tableSection}>
        <View style={styles.tableSectionHeader}>
          <Text style={styles.analysisTitle}>Marks Analysis Table</Text>
          <TouchableOpacity 
            style={styles.refreshTableButton}
            onPress={refreshTable}
            accessibilityLabel="Refresh table"
          >
            <RefreshIcon size={16} color="#4F46E5" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.wideTableContainer}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.subjectCol]}>Subject</Text>
            <Text style={[styles.tableHeaderText, styles.catCol]}>CAT-1</Text>
            <Text style={[styles.tableHeaderText, styles.catCol]}>Min CAT-2</Text>
            <Text style={[styles.tableHeaderText, styles.assignCol]}>Assign</Text>
            <Text style={[styles.tableHeaderText, styles.attendCol]}>Attend</Text>
            <Text style={[styles.tableHeaderText, styles.totalCol]}>Total</Text>
          </View>

          {/* Table Rows */}
          {(() => {
            const impossible = [];
            const rows = analysisData.map((item, index) => {
            // Special handling for 24CSR304
            const isSpecial = item.subjectCode === '24CSR304';
            const targetTotal = 26; // Target remains 26 for all subjects
            const cat1Scale = isSpecial ? 7.5 : 12.5;
            const cat2Scale = isSpecial ? 7.5 : 12.5;
            const assignmentScale = isSpecial ? 30 : 10;
            const totalScale = isSpecial ? 50 : 40;
            
            // Calculate CAT-2 marks needed for target total
            const currentWithoutCat2 = item.cat1 + item.assignment + (item.attendanceMarks || 0);
            const cat2NeededForTarget = Math.max(0, targetTotal - currentWithoutCat2);
            const isImpossible = cat2NeededForTarget > cat2Scale;
            const cat2OutOf30 = ((Math.min(cat2NeededForTarget, cat2Scale) / cat2Scale) * 30).toFixed(1);
            
            // Collect impossible subjects
            if (isImpossible) {
              impossible.push({
                subjectCode: item.subjectCode,
                studentName: attendance?.name || 'Student'
              });
            }
            
            return (
              <View key={item.subjectCode} style={[styles.tableRow, index % 2 === 0 && styles.evenRow]}>
                <View style={styles.subjectCol}>
                  <Text style={styles.tableCellText} numberOfLines={1}>{item.subjectCode}</Text>
                  <Text style={styles.subjectNameText} numberOfLines={1} ellipsizeMode="tail">
                    {item.subjectName}
                  </Text>
                </View>
                
                <View style={styles.catCol}>
                  <Text style={styles.scoreText}>{item.cat1.toFixed(1)}/{cat1Scale}</Text>
                  <Text style={styles.marksOutOf30}>
                    {roundToHalf((item.cat1 / cat1Scale) * 30).toFixed(1)}/30
                  </Text>
                </View>
                
                <View style={styles.catCol}>
                  <Text style={[styles.scoreText, { color: isImpossible ? Colors.danger : Colors.textPrimary }]}>
                    {isImpossible ? `${cat2Scale}+` : cat2NeededForTarget.toFixed(1)}/{cat2Scale}
                  </Text>
                  <Text style={[styles.marksOutOf30, { color: isImpossible ? Colors.danger : Colors.textSecondary }]}>
                    {roundToHalf(parseFloat(cat2OutOf30)).toFixed(1)}/30
                  </Text>
                </View>
                
                <View style={styles.assignCol}>
                  <TextInput
                    style={styles.editableInput}
                    value={item.assignment === 0 ? '' : item.assignment.toString()}
                    onChangeText={(text) => updateAnalysisField(index, 'assignment', text, assignmentScale)}
                    keyboardType="numeric"
                    placeholder="0"
                    maxLength={4}
                  />
                  <Text style={styles.scaleText}>/{assignmentScale}</Text>
                </View>
                
                <View style={styles.attendCol}>
                  <Text style={[styles.attendanceText, {
                    color: item.attendanceMarks ? Colors.success : Colors.danger
                  }]}>
                    {item.attendanceMarks ? `${item.attendanceMarks}/5` : 'N/A'}
                  </Text>
                  {item.attendancePercentage !== null && (
                    <Text style={styles.attendanceInfo}>
                      {item.attendancePercentage.toFixed(1)}%
                    </Text>
                  )}
                </View>
                
                <View style={styles.totalCol}>
                  <Text style={styles.totalText}>{(item.total || 0).toFixed(1)}/{totalScale}</Text>
                </View>
              </View>
            );
          });
          
          // Update impossible subjects state
          setTimeout(() => setImpossibleSubjects(impossible), 0);
          
          return rows;
        })()}

          {analysisData.length === 0 && (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>
                No analysis data available. Ensure both results and attendance are loaded.
              </Text>
            </View>
          )}

          {/* Error Messages for Impossible Subjects */}
          {impossibleSubjects.length > 0 && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorTitle}>⚠️ Cannot Achieve Target</Text>
              {impossibleSubjects.map((subject, index) => (
                <Text key={index} style={styles.errorText}>
                  For subject {subject.subjectCode}, {subject.studentName} cannot obtain the minimum 26 marks with the current assignment marks.
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );

  // Loading state with progressive messages
  if (isLoading) {
    return (
      <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
        <View style={commonStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={commonStyles.loadingText}>{loadingMessage}</Text>
          
          {showRetryOption && (
            <View style={styles.retryContainer}>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={handleRetry}
                accessibilityLabel="Retry loading results"
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={() => setShowRetryOption(false)}
                accessibilityLabel="Continue waiting for results"
              >
                <Text style={styles.continueButtonText}>Keep Waiting</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error && !results) {
    return (
      <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
        <View style={commonStyles.errorContainer}>
          <Text style={commonStyles.errorTitle}>Failed to Load Results</Text>
          <Text style={commonStyles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRetry}
            accessibilityLabel="Retry loading results"
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // No data state
  if (!results || results.length === 0) {
    return (
      <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
        <View style={commonStyles.errorContainer}>
          <Text style={commonStyles.errorTitle}>No Results Available</Text>
          <Text style={commonStyles.errorText}>No academic results found for your account.</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRetry}
            accessibilityLabel="Refresh results"
          >
            <Text style={styles.retryButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Success state - show results
  return (
    <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
      <View style={commonStyles.container}>
        <View style={commonStyles.header}>
          <Text style={commonStyles.headerTitle}>Academic Results</Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={handleRetry}
            accessibilityLabel="Refresh results"
          >
            <RefreshIcon size={20} color="#4F46E5" />
          </TouchableOpacity>
        </View>
        
        {renderTabButtons()}
        
        {activeTab === 'results' ? (
          <FlatList
            data={results}
            renderItem={renderResultItem}
            keyExtractor={(item, index) => `${item.subjectCode}-${item.exam}-${index}`}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          renderAnalysisContent()
        )}
      </View>
    </SafeAreaView>
  );
}