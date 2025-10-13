import { Text, View } from 'react-native';
import commonStyles from '../styles/commonStyles';
import styles from '../styles/homeScreenStyles';
import Card from './Card';

const ResultsOverviewCard = ({ resultsData }) => {
  if (!resultsData || resultsData.length === 0) return null;

  // Calculate total exam percentage
  const totalMarksObtained = resultsData.reduce((sum, result) => 
    sum + parseFloat(result.marksObtained), 0
  );
  const totalMaximumMarks = resultsData.reduce((sum, result) => 
    sum + parseFloat(result.maximumMarks), 0
  );
  const totalPercentage = totalMaximumMarks > 0 
    ? ((totalMarksObtained / totalMaximumMarks) * 100).toFixed(1)
    : 0;

  // Get worst 3 exam results
  const worstResults = resultsData
    .map(result => ({
      ...result,
      percentage: ((parseFloat(result.marksObtained) / parseFloat(result.maximumMarks)) * 100)
    }))
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3);

  const getTotalPerformanceColor = () => {
    const percentage = parseFloat(totalPercentage);
    if (percentage >= 80) return '#10B981'; // Green
    if (percentage >= 70) return '#F59E0B'; // Yellow
    if (percentage >= 60) return '#F97316'; // Orange
    return '#EF4444'; // Red
  };

  const getTotalPerformanceMessage = () => {
    const percentage = parseFloat(totalPercentage);
    if (percentage >= 85) return 'Excellent Performance! 🌟';
    if (percentage >= 75) return 'Good Performance! 👍';
    if (percentage >= 65) return 'Average Performance 📚';
    return 'Needs Improvement 💪';
  };

  return (
    <Card variant="default" withMargin marginSize="medium">
      <Card.Header>
        <Text style={commonStyles.cardTitle}>Results Overview</Text>
      </Card.Header>
      
      <Card.Body>
        <View style={styles.resultsOverviewContainer}>
          {/* Left side - Total performance */}
          <View style={styles.totalPerformanceSection}>
            <Text style={styles.totalPerformanceLabel}>Overall Performance</Text>
            <Text style={[styles.totalPerformancePercentage, { color: getTotalPerformanceColor() }]}>
              {totalPercentage}%
            </Text>
            <Text style={styles.totalPerformanceMessage}>
              {getTotalPerformanceMessage()}
            </Text>
            <Text style={styles.totalExamsText}>
              {resultsData.length} exam{resultsData.length !== 1 ? 's' : ''} completed
            </Text>
          </View>

          {/* Right side - Worst performing exams */}
          <View style={styles.worstResultsSection}>
            <Text style={styles.worstResultsTitle}>
              Areas for Improvement
            </Text>
            {worstResults.length > 0 ? (
              worstResults.map((result, index) => (
                <View key={`${result.subjectCode}-${result.exam}-${index}`} style={styles.worstResultItem}>
                  <Text style={styles.worstResultCode} numberOfLines={1}>
                    {result.subjectCode}
                  </Text>
                  <Text style={[
                    styles.worstResultPercentage,
                    { color: result.percentage >= 50 ? '#F59E0B' : '#EF4444' }
                  ]}>
                    {result.percentage.toFixed(1)}%
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noResultsText}>
                No exam data available
              </Text>
            )}
          </View>
        </View>
      </Card.Body>
    </Card>
  );
};

export default ResultsOverviewCard;