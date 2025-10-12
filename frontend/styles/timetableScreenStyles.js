import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from './commonStyles';

/**
 * Styles specific to TimetableScreen component
 */
const timetableScreenStyles = StyleSheet.create({
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
  
  refreshButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  
  retryButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  noDataTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContainer: {
    padding: Spacing.base,
  },
  
  dayCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.base,
    ...Shadows.small,
  },
  
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLighter,
  },
  
  dayTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  
  freeDayBadge: {
    backgroundColor: Colors.successLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  
  freeDayText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.success,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  periodsContainer: {
    padding: Spacing.base,
  },
  
  periodRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLightest,
  },
  
  periodLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textSecondary,
    width: 80,
    marginTop: 2,
  },
  
  periodContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  
  subjectName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeight.base,
    marginBottom: Spacing.xs,
  },
  
  freeSubject: {
    color: Colors.textTertiary,
    fontStyle: 'italic',
    fontWeight: Typography.fontWeight.normal,
  },
  
  teacherName: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.tight,
  },
});

export default timetableScreenStyles;
