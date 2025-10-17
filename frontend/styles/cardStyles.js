import { StyleSheet } from 'react-native';
import { Colors as StaticColors } from '../constants/colors';
import { BorderRadius, Spacing, getShadows } from './commonStyles';

/**
 * Styles for the reusable Card component
 * Provides various card variants for different use cases
 */
export const getCardStyles = (Colors) => {
  const Shadows = getShadows(Colors);
  return StyleSheet.create({
  // Base card style
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.medium,
  },
  
  // Card variants
  cardSmall: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    ...Shadows.small,
  },
  
  cardLarge: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    ...Shadows.large,
  },
  
  cardFlat: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    elevation: 0,
    shadowOpacity: 0,
  },
  
  // Card with border (instead of shadow)
  cardOutlined: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 0,
    shadowOpacity: 0,
  },
  
  // Colored card variants
  cardPrimary: {
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  
  cardSecondary: {
    backgroundColor: Colors.secondaryLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  
  cardAccent: {
    backgroundColor: Colors.accentLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  
  cardSuccess: {
    backgroundColor: Colors.successLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    borderLeftWidth: 4,
    borderLeftColor: Colors.success,
  },
  
  cardWarning: {
    backgroundColor: Colors.warningLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  
  cardDanger: {
    backgroundColor: Colors.dangerLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    borderLeftWidth: 4,
    borderLeftColor: Colors.danger,
  },
  
  // Card sections
  cardHeader: {
    marginBottom: Spacing.base,
    paddingBottom: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  
  cardBody: {
    paddingVertical: Spacing.sm,
  },
  
  cardFooter: {
    marginTop: Spacing.base,
    paddingTop: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  
  // Card spacing variants
  cardCompact: {
    padding: Spacing.sm,
  },
  
  cardSpacious: {
    padding: Spacing.xxl,
  },
  
  // Card with margin
  cardWithMargin: {
    marginBottom: Spacing.base,
  },
  
  cardWithMarginLarge: {
    marginBottom: Spacing.lg,
  },
  
  // Pressable card (for touchable cards)
  cardPressable: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    ...Shadows.small,
  },
  
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  });
};

export default getCardStyles(StaticColors);
