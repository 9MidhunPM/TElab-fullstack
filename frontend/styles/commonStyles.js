import { StyleSheet } from 'react-native';

/**
 * Common styles used across the entire application
 * This file contains reusable style components for consistent UI
 */

// Color palette - Blue & Purple Theme
export const Colors = {
  // Primary colors - Blue
  primary: '#4F46E5',        // Indigo-600
  primaryDark: '#4338CA',    // Indigo-700
  primaryLight: '#EEF2FF',   // Indigo-50
  
  // Secondary colors - Purple
  secondary: '#9333EA',      // Purple-600
  secondaryDark: '#7E22CE',  // Purple-700
  secondaryLight: '#FAF5FF', // Purple-50
  
  // Accent colors - Cyan/Blue
  accent: '#0EA5E9',         // Sky-500
  accentDark: '#0284C7',     // Sky-600
  accentLight: '#E0F2FE',    // Sky-100
  
  // Status colors
  success: '#10B981',        // Green-500
  successLight: '#D1FAE5',   // Green-100
  warning: '#F59E0B',        // Amber-500
  warningLight: '#FEF3C7',   // Amber-100
  warningText: '#92400E',    // Amber-800
  danger: '#EF4444',         // Red-500
  dangerLight: '#FEE2E2',    // Red-100
  
  // Neutral colors
  background: '#F8FAFC',     // Slate-50
  backgroundDark: '#F1F5F9', // Slate-100
  backgroundLight: '#F1F5F9', // Slate-100
  white: '#fff',
  black: '#000',
  
  // Text colors
  textPrimary: '#1E293B',    // Slate-800
  textSecondary: '#64748B',  // Slate-500
  textTertiary: '#94A3B8',   // Slate-400
  textLight: '#475569',      // Slate-600
  
  // Border colors
  border: '#CBD5E1',         // Slate-300
  borderLight: '#E2E8F0',    // Slate-200
  borderLighter: '#F1F5F9',  // Slate-100
  borderLightest: '#F8FAFC', // Slate-50
  
  // Input colors
  inputBackground: '#F8FAFC',
  placeholderText: '#94A3B8',
  
  // Shadow color
  shadow: '#4F46E5',
};

// Typography
export const Typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    huge: 32,
    massive: 36,
  },
  
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Line heights
  lineHeight: {
    tight: 18,
    base: 20,
    relaxed: 22,
    loose: 24,
  },
};

// Spacing system
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 30,
  xxxl: 40,
};

// Border radius
export const BorderRadius = {
  sm: 4,
  base: 6,
  md: 8,
  lg: 10,
  xl: 12,
};

// Shadow presets
export const Shadows = {
  small: {
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  medium: {
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  large: {
    elevation: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
};

const commonStyles = StyleSheet.create({
  // Container styles
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  container: {
    flex: 1,
  },
  
  scrollContainer: {
    flexGrow: 1,
    padding: Spacing.lg,
  },
  
  contentContainer: {
    padding: Spacing.lg,
  },
  
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  
  // Card styles
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    ...Shadows.medium,
  },
  
  cardSmall: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    ...Shadows.small,
  },
  
  cardTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
    textAlign: 'center',
  },
  
  // Button styles
  button: {
    borderRadius: BorderRadius.md,
    paddingVertical: 15,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  
  buttonDanger: {
    backgroundColor: Colors.danger,
  },
  
  buttonDisabled: {
    opacity: 0.6,
  },
  
  buttonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  
  buttonSecondaryText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  // Input styles
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  
  label: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: 15,
    fontSize: Typography.fontSize.base,
    backgroundColor: Colors.inputBackground,
    color: Colors.textPrimary,
  },
  
  inputFocused: {
    borderColor: Colors.primary,
  },
  
  inputError: {
    borderColor: Colors.danger,
  },
  
  // Text styles
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  
  heading: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  
  textPrimary: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
  
  textSecondary: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  
  textCenter: {
    textAlign: 'center',
  },
  
  textBold: {
    fontWeight: Typography.fontWeight.bold,
  },
  
  // Loading states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  
  loadingText: {
    marginTop: Spacing.base,
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed,
  },
  
  // Error states
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  
  errorTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.danger,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  
  errorText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: Typography.lineHeight.base,
  },
  
  // Info boxes
  infoBox: {
    padding: 15,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
  },
  
  infoBoxPrimary: {
    backgroundColor: Colors.primaryLight,
    borderLeftColor: Colors.primary,
  },
  
  infoBoxWarning: {
    backgroundColor: Colors.warningLight,
    borderLeftColor: Colors.warning,
  },
  
  infoBoxSuccess: {
    backgroundColor: Colors.successLight,
    borderLeftColor: Colors.success,
  },
  
  infoBoxDanger: {
    backgroundColor: Colors.dangerLight,
    borderLeftColor: Colors.danger,
  },
  
  infoText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.base,
  },
  
  // Row layouts
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  rowStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: Spacing.base,
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  
  // Badge styles
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
  },
  
  badgeSuccess: {
    backgroundColor: Colors.successLight,
  },
  
  badgeWarning: {
    backgroundColor: Colors.warningLight,
  },
  
  badgeDanger: {
    backgroundColor: Colors.dangerLight,
  },
  
  badgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  badgeSuccessText: {
    color: Colors.success,
  },
  
  badgeWarningText: {
    color: Colors.warningText,
  },
  
  badgeDangerText: {
    color: Colors.danger,
  },
});

export default commonStyles;
