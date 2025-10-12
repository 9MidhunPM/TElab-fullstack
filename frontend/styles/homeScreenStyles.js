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
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  
  welcomeText: {
    fontSize: Typography.fontSize.xxl,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  
  nameText: {
    fontSize: Typography.fontSize.huge,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
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
