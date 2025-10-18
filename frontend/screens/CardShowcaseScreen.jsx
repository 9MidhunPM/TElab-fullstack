import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import { useTheme } from '../hooks/useTheme';
import { Spacing, Typography } from '../styles/commonStyles';

/**
 * Card Component Showcase
 * 
 * This file demonstrates all available Card variants and usage patterns.
 * Use this as a reference when implementing cards in your screens.
 * 
 * To view: Import this screen into your navigation or app router.
 */
export default function CardShowcaseScreen() {
  const { Colors } = useTheme();
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Card Component Showcase</Text>
        <Text style={styles.pageSubtitle}>
          All available card variants and examples
        </Text>

        {/* Basic Variants */}
        <Text style={styles.sectionTitle}>Basic Variants</Text>
        
        <Card variant="default" withMargin>
          <Text style={styles.cardTitle}>Default Card</Text>
          <Text style={styles.cardText}>
            Standard card with medium padding and shadow. Best for general content.
          </Text>
        </Card>

        <Card variant="small" withMargin>
          <Text style={styles.cardTitle}>Small Card</Text>
          <Text style={styles.cardText}>
            Compact card for lists. Smaller padding and lighter shadow.
          </Text>
        </Card>

        <Card variant="large" withMargin>
          <Text style={styles.cardTitle}>Large Card</Text>
          <Text style={styles.cardText}>
            Spacious card for important content. Extra padding and prominent shadow.
          </Text>
        </Card>

        <Card variant="flat" withMargin>
          <Text style={styles.cardTitle}>Flat Card</Text>
          <Text style={styles.cardText}>
            Card without shadow. Good for layered designs.
          </Text>
        </Card>

        <Card variant="outlined" withMargin>
          <Text style={styles.cardTitle}>Outlined Card</Text>
          <Text style={styles.cardText}>
            Card with border instead of shadow. Clean, minimal look.
          </Text>
        </Card>

        {/* Colored Variants */}
        <Text style={styles.sectionTitle}>Colored Variants</Text>

        <Card variant="primary" withMargin>
          <Text style={styles.infoTitle}>ℹ️ Primary Card</Text>
          <Text style={styles.infoText}>
            Blue-themed card for general information and highlights.
          </Text>
        </Card>

        <Card variant="success" withMargin>
          <Text style={styles.successTitle}>✓ Success Card</Text>
          <Text style={styles.successText}>
            Green-themed card for success messages and confirmations.
          </Text>
        </Card>

        <Card variant="warning" withMargin>
          <Text style={styles.warningTitle}>⚠ Warning Card</Text>
          <Text style={styles.warningText}>
            Yellow-themed card for warnings and important notices.
          </Text>
        </Card>

        <Card variant="danger" withMargin>
          <Text style={styles.dangerTitle}>✕ Danger Card</Text>
          <Text style={styles.dangerText}>
            Red-themed card for errors and critical information.
          </Text>
        </Card>

        {/* Spacing Variants */}
        <Text style={styles.sectionTitle}>Spacing Variants</Text>

        <Card spacing="compact" withMargin>
          <Text style={styles.cardTitle}>Compact Spacing</Text>
          <Text style={styles.cardText}>Minimal padding (8px)</Text>
        </Card>

        <Card spacing="default" withMargin>
          <Text style={styles.cardTitle}>Default Spacing</Text>
          <Text style={styles.cardText}>Standard padding (20px)</Text>
        </Card>

        <Card spacing="spacious" withMargin>
          <Text style={styles.cardTitle}>Spacious Spacing</Text>
          <Text style={styles.cardText}>Extra padding (30px)</Text>
        </Card>

        {/* Semantic Components */}
        <Text style={styles.sectionTitle}>Semantic Components</Text>

        <Card variant="default" withMargin>
          <Card.Header>
            <Text style={styles.headerText}>Card Header</Text>
          </Card.Header>
          
          <Card.Body>
            <Text style={styles.cardText}>
              Card Body - Main content area
            </Text>
          </Card.Body>
          
          <Card.Footer>
            <Text style={styles.footerText}>Card Footer</Text>
          </Card.Footer>
        </Card>

        {/* Touchable Card */}
        <Text style={styles.sectionTitle}>Interactive Cards</Text>

        <Card 
          variant="small" 
          withMargin
          onPress={() => alert('Card pressed!')}
        >
          <View style={styles.touchableContent}>
            <Text style={styles.cardTitle}>Touchable Card</Text>
            <Text style={styles.cardText}>Tap me! →</Text>
          </View>
        </Card>

        <Card 
          variant="outlined" 
          withMargin
          onPress={() => alert('Another press!')}
        >
          <View style={styles.touchableContent}>
            <Text style={styles.cardTitle}>Another Touchable Card</Text>
            <Text style={styles.cardText}>I'm also tappable! →</Text>
          </View>
        </Card>

        {/* Real-world Examples */}
        <Text style={styles.sectionTitle}>Real-world Examples</Text>

        {/* Profile Card */}
        <Card variant="large" withMargin>
          <Card.Header>
            <Text style={styles.exampleTitle}>Profile Information</Text>
          </Card.Header>
          
          <Card.Body>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>John Doe</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>john@example.com</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>+1 234 567 8900</Text>
            </View>
          </Card.Body>
        </Card>

        {/* Attendance Subject Card */}
        <Card variant="small" withMargin>
          <View style={styles.subjectHeader}>
            <Text style={styles.subjectCode}>CS101</Text>
            <Text style={styles.attendanceGood}>85%</Text>
          </View>
          <Text style={styles.subjectName}>Computer Science Fundamentals</Text>
          <Text style={styles.subjectDetails}>Present: 34 / 40 hours</Text>
        </Card>

        {/* Result Card */}
        <Card variant="small" withMargin>
          <Card.Header>
            <View style={styles.resultHeader}>
              <View>
                <Text style={styles.resultCode}>MATH201</Text>
                <Text style={styles.resultName}>Calculus II</Text>
              </View>
              <View style={styles.resultMarks}>
                <Text style={styles.marks}>92/100</Text>
                <Text style={styles.percentage}>92%</Text>
              </View>
            </View>
          </Card.Header>
          
          <Card.Footer>
            <View style={styles.resultFooter}>
              <Text style={styles.semester}>Semester 3</Text>
              <Text style={styles.exam}>Final Exam</Text>
            </View>
          </Card.Footer>
        </Card>

        {/* Timetable Period */}
        <Card variant="flat" withMargin>
          <View style={styles.periodRow}>
            <Text style={styles.periodLabel}>Period 1</Text>
            <View style={styles.periodContent}>
              <Text style={styles.periodSubject}>Mathematics</Text>
              <Text style={styles.periodTeacher}>Teacher: Dr. Smith</Text>
            </View>
          </View>
        </Card>

        {/* Notification Cards */}
        <Text style={styles.sectionTitle}>Notification Examples</Text>

        <Card variant="success" withMargin>
          <Text style={styles.notificationText}>
            ✓ Your profile has been updated successfully!
          </Text>
        </Card>

        <Card variant="warning" withMargin>
          <Text style={styles.notificationText}>
            ⚠ Your attendance is below 75%. Please improve.
          </Text>
        </Card>

        <Card variant="danger" withMargin>
          <Text style={styles.notificationText}>
            ✕ Failed to load data. Please check your connection.
          </Text>
        </Card>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: Spacing.base,
  },
  pageTitle: {
    fontSize: Typography.fontSize.huge,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  pageSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.base,
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  cardText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.base,
  },
  infoTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  infoText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
  },
  successTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.success,
    marginBottom: Spacing.xs,
  },
  successText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
  },
  warningTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.warningText,
    marginBottom: Spacing.xs,
  },
  warningText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.warningText,
  },
  dangerTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.danger,
    marginBottom: Spacing.xs,
  },
  dangerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.danger,
  },
  headerText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  footerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  touchableContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exampleTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
  },
  value: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  subjectCode: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  attendanceGood: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.success,
  },
  subjectName: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subjectDetails: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  resultCode: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  resultName: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
  resultMarks: {
    alignItems: 'flex-end',
  },
  marks: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  percentage: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  semester: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  exam: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  periodRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  periodLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textSecondary,
    width: 80,
  },
  periodContent: {
    flex: 1,
  },
  periodSubject: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  periodTeacher: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  notificationText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    lineHeight: Typography.lineHeight.base,
  },
  bottomSpace: {
    height: Spacing.xl,
  },
});
