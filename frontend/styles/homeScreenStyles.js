import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from './commonStyles';

/**
 * Styles specific to HomeScreen component
 */
const homeScreenStyles = StyleSheet.create({
  contentContainer: {
    padding: Spacing.lg,
    paddingTop: Spacing.xxxl,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLighter,
  },
  
  welcomeSection: {
    flex: 1,
  },
  
  logoutIconButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.backgroundLight,
  },
  
  compactInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLighter,
  },
  
  compactInfoLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textLight,
    flex: 1,
  },
  
  compactInfoValue: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    flex: 1.2,
    textAlign: 'right',
    fontWeight: Typography.fontWeight.medium,
  },
  
  welcomeText: {
    fontSize: Typography.fontSize.xl,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  
  nameText: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  
  profileCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xxl,
    ...Shadows.medium,
  },
  
  cardTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLighter,
  },
  
  infoLabel: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textLight,
    flex: 1,
  },
  
  infoValue: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    flex: 1.5,
    textAlign: 'right',
    fontWeight: Typography.fontWeight.medium,
  },
  
  actionContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  
  logoutButton: {
    backgroundColor: Colors.danger,
    borderRadius: BorderRadius.md,
    paddingVertical: 15,
    paddingHorizontal: Spacing.xxxl,
    alignItems: 'center',
    minWidth: 120,
  },
  
  logoutButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  footerContainer: {
    padding: Spacing.lg,
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  
  footerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.base,
  },

  // Data Loading Progress Styles
  loadingProgressContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },

  loadingSpinner: {
    marginBottom: Spacing.md,
  },

  loadingProgressText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },

  loadingProgressSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },

  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
  },

  // Data Status Styles
  dataStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLighter,
  },

  dataStatusLabel: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    flex: 1,
  },

  dataStatusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.sm,
  },

  statusPending: {
    backgroundColor: Colors.textLight,
  },

  statusSuccess: {
    backgroundColor: Colors.success,
  },

  statusError: {
    backgroundColor: Colors.danger,
  },

  dataStatusText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    fontWeight: Typography.fontWeight.medium,
  },

  dataStatusSuccess: {
    color: Colors.success,
  },

  dataStatusError: {
    color: Colors.danger,
  },

  // Button Styles
  refreshButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },

  refreshButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },

  retryButton: {
    backgroundColor: Colors.warning,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.md,
  },

  retryButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },

  // Summary Styles
  summaryText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },

  summarySubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
  },

  errorText: {
    fontSize: Typography.fontSize.base,
    color: Colors.danger,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },

  // Attendance Summary Styles
  attendanceSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  attendanceTotalSection: {
    flex: 1,
    alignItems: 'center',
    paddingRight: Spacing.lg,
    borderRightWidth: 1,
    borderRightColor: Colors.borderLighter,
  },

  attendanceTotalLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },

  attendanceTotalPercentage: {
    fontSize: Typography.fontSize.massive,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },

  attendanceTotalHours: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  attendanceDetailsSection: {
    flex: 1,
    paddingLeft: Spacing.lg,
  },

  fullAttendanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },

  fullAttendanceText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.success,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },

  fullAttendanceSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.base,
  },

  lowestAttendanceContainer: {
    flex: 1,
  },

  lowestAttendanceTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textLight,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },

  lowestAttendanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xs,
  },

  lowestAttendanceCode: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    flex: 1,
  },

  lowestAttendancePercentage: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
});

export default homeScreenStyles;
