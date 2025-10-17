import { Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import commonStyles from '../styles/commonStyles';
import styles from '../styles/homeScreenStyles';
import Card from './Card';
import { ChartIcon, StarIcon, TrendingDownIcon, TrendingUpIcon, TrophyIcon } from './icons/SvgIcons';

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
    if (percentage >= 80) return Colors.success; // Green
    if (percentage >= 70) return Colors.warning; // Yellow
    if (percentage >= 60) return Colors.warningOrange; // Orange
    return Colors.danger; // Red
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
        <View style={commonStyles.iconTextRow}>
          <View style={commonStyles.iconContainer}>
            <TrophyIcon size={20} color={Colors.primary} />
          </View>
          <Text style={commonStyles.cardTitle}>Results Overview</Text>
        </View>
      </Card.Header>
      
      <Card.Body>
        <View style={styles.resultsOverviewContainer}>
          {/* Left side - Total performance */}
          <View style={styles.totalPerformanceSection}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
              <View style={{ width: 20, alignItems: 'center', marginRight: 6, marginTop: 2 }}>
                <ChartIcon size={16} color={Colors.textSecondary} />
              </View>
              <Text style={styles.totalPerformanceLabel}>Overall Performance</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{ width: 28, alignItems: 'center', marginRight: 8, marginTop: 2 }}>
                {parseFloat(totalPercentage) >= 75 ? (
                  <TrendingUpIcon size={24} color={getTotalPerformanceColor()} />
                ) : (
                  <TrendingDownIcon size={24} color={getTotalPerformanceColor()} />
                )}
              </View>
              <Text style={[styles.totalPerformancePercentage, { color: getTotalPerformanceColor() }]}>
                {totalPercentage}%
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 4 }}>
              <View style={{ width: 20, alignItems: 'center', marginRight: 4, marginTop: 2 }}>
                <StarIcon size={14} color={Colors.warning} filled />
              </View>
              <Text style={styles.totalPerformanceMessage}>
                {getTotalPerformanceMessage()}
              </Text>
            </View>
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
                    { color: result.percentage >= 50 ? Colors.warning : Colors.danger }
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
