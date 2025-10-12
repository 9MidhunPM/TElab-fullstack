import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from './commonStyles';

/**
 * Styles specific to AttendanceScreen component
 */
const attendanceScreenStyles = StyleSheet.create({
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
});

export default attendanceScreenStyles;
