import { StyleSheet } from 'react-native';
import { BorderRadius, Spacing, Typography, getShadows } from './commonStyles';

/**
 * Generate styles specific to EndSemResultsScreen component
 * @param {Object} Colors - The active theme colors
 * @returns {Object} StyleSheet object with themed styles
 */
export const getEndSemResultsScreenStyles = (Colors) => {
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
  
  noResultsTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
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
  
  listContainer: {
    padding: Spacing.base,
  },
  
  semesterSection: {
    marginBottom: Spacing.xl,
  },
  
  semesterTopBar: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    marginBottom: Spacing.sm,
    marginHorizontal: Spacing.base,
    ...Shadows.small,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  semesterTopBarTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    flex: 1,
  },
  
  semesterHeader: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    ...Shadows.small,
  },
  
  examTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    lineHeight: Typography.lineHeight.relaxed,
  },
  
  semesterInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  
  semesterBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  
  semesterText: {
    color: Colors.white,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  examTypeBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  
  examTypeText: {
    color: Colors.white,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  courseCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    marginBottom: Spacing.sm,
    elevation: 1,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  
  courseInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  
  courseCode: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  
  courseName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeight.base,
    marginBottom: Spacing.xs,
  },
  
  courseDetails: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  
  gradeInfo: {
    alignItems: 'flex-end',
  },
  
  grade: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 2,
  },
  
  passStatus: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    textTransform: 'uppercase',
  },
});
};

// Note: No default export - use getEndSemResultsScreenStyles(Colors) from useTheme hook instead