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
});

export default homeScreenStyles;
