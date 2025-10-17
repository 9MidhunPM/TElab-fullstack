import { StyleSheet } from 'react-native';
import { BorderRadius, Spacing, Typography, getShadows } from './commonStyles';

/**
 * Generate styles specific to TimetableScreen component
 * @param {Object} Colors - The active theme colors
 * @returns {Object} StyleSheet object with themed styles
 */
export const getTimetableScreenStyles = (Colors) => {
  const Shadows = getShadows(Colors);
  return StyleSheet.create({
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
    backgroundColor: Colors.cardBackground,
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

  // Analysis section styles
  analysisContainer: {
    paddingVertical: Spacing.sm,
  },
  
  analysisTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  
  analysisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  
  analysisSubject: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    flex: 1,
  },
  
  analysisCount: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary,
  },
  
  analysisSummary: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Tab styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundLight,
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
    backgroundColor: Colors.primary,
    ...Shadows.medium,
  },

  tabButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textSecondary,
  },

  activeTabButtonText: {
    color: Colors.white,
    fontWeight: Typography.fontWeight.bold,
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
    fontSize: Typography.fontSize.sm,
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
    minHeight: 50,
    alignItems: 'center',
  },

  evenRow: {
    backgroundColor: Colors.backgroundLightest,
  },

  tableCellText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    textAlign: 'left',
  },

  numberText: {
    textAlign: 'center',
    fontWeight: Typography.fontWeight.medium,
  },

  tableFooter: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundLight,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderBottomLeftRadius: BorderRadius.sm,
    borderBottomRightRadius: BorderRadius.sm,
    borderTopWidth: 2,
    borderTopColor: Colors.primary,
  },

  tableFooterText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },

  // Column widths
  subjectColumn: {
    flex: 2,
    paddingRight: Spacing.sm,
  },

  weeklyColumn: {
    flex: 1,
    textAlign: 'center',
  },

  totalColumn: {
    flex: 1,
    textAlign: 'center',
  },

  // New timetable styles for swipeable days
  timetableContainer: {
    flex: 1,
  },

  dayScrollView: {
    flex: 1,
  },

  dayScrollContainer: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
  },

  // Day tab styles
  dayTabBar: {
    backgroundColor: Colors.cardBackground,
    elevation: 2,
    shadowColor: Colors.shadowColor || '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  dayTabIndicator: {
    backgroundColor: Colors.primary || '#4F46E5',
    height: 3,
    borderRadius: 1.5,
  },

  dayTabLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    textTransform: 'capitalize',
  },

  dayTab: {
    width: 'auto',
    minWidth: 80,
  },

  // Period card styles
  periodCard: {
    marginHorizontal: Spacing.base,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    ...Shadows.small,
  },

  periodCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  periodLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },

  periodCardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },

  periodTiming: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary || '#4F46E5',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
  },

  periodStatus: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.successLight,
    color: Colors.success,
  },

  freeStatus: {
    backgroundColor: Colors.backgroundLight,
    color: Colors.textSecondary,
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
    fontStyle: 'italic',
  },
});
};

// Note: No default export - use getTimetableScreenStyles(Colors) from useTheme hook instead