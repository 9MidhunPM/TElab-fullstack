import { Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Card from './Card';
import { StarIcon } from './icons/SvgIcons';

const RecentResultsCard = ({ resultsData }) => {
  const { Colors, commonStyles, homeScreenStyles: styles } = useTheme();
  
  if (!resultsData || resultsData.length === 0) return null;

  // Get the most recent 3 results based on exam and semester
  const recentResults = resultsData
    .sort((a, b) => {
      // Sort by semester first (higher first), then by exam number (higher first)
      const semesterA = parseInt(a.semester.replace(/\D/g, '')) || 0;
      const semesterB = parseInt(b.semester.replace(/\D/g, '')) || 0;
      
      if (semesterA !== semesterB) {
        return semesterB - semesterA;
      }
      
      const examA = parseInt(a.exam) || 0;
      const examB = parseInt(b.exam) || 0;
      return examB - examA;
    })
    .slice(0, 3);

  return (
    <Card variant="default" withMargin marginSize="medium">
      <Card.Header>
        <View style={commonStyles.iconTextRow}>
          <View style={commonStyles.iconContainer}>
            <StarIcon size={20} color={Colors.primary} filled />
          </View>
          <Text style={commonStyles.cardTitle}>Recent Results</Text>
        </View>
      </Card.Header>
      
      <Card.Body>
        <View style={styles.recentResultsContainer}>
          {recentResults.map((result, index) => {
            const percentage = ((parseFloat(result.marksObtained) / parseFloat(result.maximumMarks)) * 100);
            const isGoodScore = percentage >= 75;
            
            return (
              <View key={`${result.subjectCode}-${result.exam}-${index}`} style={styles.recentResultItem}>
                <View style={styles.recentResultSubject}>
                  <Text style={styles.recentResultCode}>{result.subjectCode}</Text>
                  <Text style={styles.recentResultName} numberOfLines={1}>
                    {result.subjectName}
                  </Text>
                </View>
                <View style={styles.recentResultScore}>
                  <Text style={styles.recentResultMarks}>
                    {result.marksObtained}/{result.maximumMarks}
                  </Text>
                  <Text style={[
                    styles.recentResultPercentage,
                    { color: isGoodScore ? '#10B981' : percentage >= 50 ? '#F59E0B' : '#EF4444' }
                  ]}>
                    {percentage.toFixed(1)}%
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </Card.Body>
    </Card>
  );
};

export default RecentResultsCard;
