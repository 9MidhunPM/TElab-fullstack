import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from './commonStyles';

/**
 * Styles specific to AttendanceScreen component
 */
const attendanceScreenStyles = StyleSheet.create({
  // Custom header without bottom border
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    // Remove borderBottomWidth and borderBottomColor to eliminate the bar
  },
  
  refreshButton: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    backgroundColor: 'transparent',
    borderRadius: BorderRadius.base,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
    minHeight: 40,
  },
  
  summaryCard: {
    backgroundColor: Colors.white,
    margin: Spacing.base,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.medium,
  },
  
  summaryTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
    textAlign: 'center',
  },
  
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  
  summaryLabel: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  
  summaryValue: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.semibold,
    flex: 1,
    textAlign: 'right',
  },
  
  totalPercentageContainer: {
    alignItems: 'center',
    marginTop: Spacing.base,
    paddingTop: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  
  totalPercentageLabel: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  
  totalPercentage: {
    fontSize: Typography.fontSize.massive,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  
  totalHours: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textTertiary,
  },
  
  subjectsContainer: {
    margin: Spacing.base,
    marginTop: 0,
  },
  
  subjectsTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    marginLeft: Spacing.xs,
  },
  
  subjectCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    marginBottom: Spacing.sm,
    ...Shadows.small,
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
    color: Colors.textPrimary,
    flex: 1,
  },
  
  subjectPercentage: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  
  subjectDetails: {
    marginTop: Spacing.xs,
  },
  
  subjectHours: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  
  noteContainer: {
    backgroundColor: Colors.warningLight,
    margin: Spacing.base,
    marginTop: 0,
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  
  noteText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.warningText,
    lineHeight: Typography.lineHeight.base,
  },
  
  bottomPadding: {
    height: Spacing.lg,
  },

  // Tab styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundSecondary || '#E5E7EB',
    marginHorizontal: Spacing.base,
    borderRadius: BorderRadius.md,
    padding: Spacing.xs,
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },

  tabButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeTabButton: {
    backgroundColor: Colors.white,
    ...Shadows.small,
  },

  tabButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textSecondary,
  },

  activeTabButtonText: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },

  // Analysis styles
  analysisTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },

  dateLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },

  dateInput: {
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
    justifyContent: 'center',
    minHeight: 44,
  },

  dateInputText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },

  analyzeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },

  analyzeButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },

  scenarioDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    fontStyle: 'italic',
  },

  analysisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLightest,
  },

  analysisSubject: {
    flex: 1,
    paddingRight: Spacing.sm,
  },

  analysisDetails: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },

  analysisResult: {
    alignItems: 'flex-end',
  },

  percentageText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },

  skipText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    textAlign: 'center',
  },

  missText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  // Analysis table styles
  summaryContainer: {
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.base,
  },

  summaryText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: Typography.fontWeight.medium,
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderTopLeftRadius: BorderRadius.sm,
    borderTopRightRadius: BorderRadius.sm,
  },

  tableHeaderText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    textAlign: 'center',
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLightest,
    minHeight: 60,
    alignItems: 'center',
  },

  evenRow: {
    backgroundColor: Colors.backgroundLightest,
  },

  tableCellText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.semibold,
  },

  currentStats: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },

  detailText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },

  // Column widths
  subjectColumn: {
    flex: 2,
    paddingRight: Spacing.sm,
  },

  perfectColumn: {
    flex: 1.2,
    alignItems: 'center',
  },

  skip75Column: {
    flex: 1.2,
    alignItems: 'center',
  },

  skip85Column: {
    flex: 1.2,
    alignItems: 'center',
  },
});

export default attendanceScreenStyles;
