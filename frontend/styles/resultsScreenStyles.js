import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from './commonStyles';

/**
 * Styles specific to ResultsScreen component
 */
const resultsScreenStyles = StyleSheet.create({
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
  
  retryContainer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  
  retryButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  continueButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.md,
  },
  
  continueButtonText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  listContainer: {
    padding: Spacing.base,
  },
  
  resultCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    ...Shadows.small,
  },
  
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  
  subjectInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  
  subjectCode: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  
  subjectName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeight.base,
  },
  
  marksInfo: {
    alignItems: 'flex-end',
  },
  
  marks: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  
  percentage: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLighter,
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
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  analysisTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },

  refreshTableButton: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: 'transparent',
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 32,
    minHeight: 32,
  },

  legendContainer: {
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.base,
  },

  legendTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },

  legendItem: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 2,
  },

  // Table styles
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
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
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLightest,
    minHeight: 50,
    alignItems: 'center',
  },

  evenRow: {
    backgroundColor: Colors.backgroundLightest,
  },

  tableCellText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.semibold,
  },

  subjectNameText: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: Typography.fontWeight.regular,
  },

  // Table section styles
  tableSection: {
    marginHorizontal: -10,
    marginVertical: Spacing.base,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    ...Shadows.medium,
  },

  tableSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base + 10,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },

  wideTableContainer: {
    width: '100%',
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.sm,
  },

  // Table container (legacy - keeping for compatibility)
  tableContainer: {
    width: '98%',
    alignSelf: 'center',
  },

  // Column widths - adjusted for wider table
  subjectCol: {
    flex: 1.2,
    paddingRight: Spacing.xs,
  },

  catCol: {
    flex: 1.4,
    alignItems: 'center',
  },

  assignCol: {
    flex: 0.8,
    alignItems: 'center',
  },

  attendCol: {
    flex: 1,
    alignItems: 'center',
  },

  totalCol: {
    flex: 1,
    alignItems: 'center',
  },

  // Score and input styles
  scoreText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.semibold,
    textAlign: 'center',
  },

  editableInput: {
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: 2,
    paddingVertical: 2,
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
    backgroundColor: Colors.white,
    width: 30,
    textAlign: 'center',
  },

  scaleText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  attendanceText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    textAlign: 'center',
  },

  attendanceInfo: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  totalText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    textAlign: 'center',
  },

  noDataContainer: {
    padding: Spacing.lg,
    alignItems: 'center',
  },

  noDataText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // CAT-2 calculation styles
  marksOutOf30: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },

  calculateButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    marginTop: Spacing.base,
  },

  calculateButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },

  // Requirements display styles
  requirementsContainer: {
    marginTop: Spacing.sm,
  },

  requirementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.backgroundLightest,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },

  requirementSubject: {
    flex: 1,
  },

  requirementSubjectCode: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },

  requirementCurrentMarks: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  requirementResult: {
    alignItems: 'flex-end',
  },

  requirementText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary,
  },

  requirementSubtext: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  // Error display styles
  errorContainer: {
    backgroundColor: Colors.dangerLight || '#FEF2F2',
    borderWidth: 1,
    borderColor: Colors.danger,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    marginTop: Spacing.base,
  },

  errorTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.danger,
    marginBottom: Spacing.sm,
  },

  errorText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.danger,
    marginBottom: Spacing.xs,
    lineHeight: Typography.lineHeight.base,
  },
});

export default resultsScreenStyles;
