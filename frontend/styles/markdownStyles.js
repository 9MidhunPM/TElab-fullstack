/**
 * Markdown styles for AI response rendering
 */

import { BorderRadius, Spacing, Typography } from './commonStyles';

// Function to generate markdown styles based on theme colors
export const getMarkdownStyles = (Colors) => ({
  body: {
    fontSize: Typography.fontSize.base,
    color: Colors.text,
    lineHeight: Typography.lineHeight.relaxed,
  },
  heading1: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  heading2: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  heading3: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  strong: {
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  em: {
    fontStyle: 'italic',
  },
  bullet_list: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  ordered_list: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  list_item: {
    marginBottom: Spacing.xs,
    flexDirection: 'row',
  },
  bullet_list_icon: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
    marginRight: Spacing.sm,
  },
  paragraph: {
    marginBottom: Spacing.md,
  },
  code_inline: {
    backgroundColor: Colors.backgroundLight,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
    fontFamily: 'monospace',
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
  },
  code_block: {
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    fontFamily: 'monospace',
    fontSize: Typography.fontSize.sm,
    marginVertical: Spacing.sm,
    color: Colors.textPrimary,
  },
  blockquote: {
    backgroundColor: Colors.backgroundLight,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    paddingLeft: Spacing.md,
    paddingVertical: Spacing.sm,
    marginVertical: Spacing.sm,
  },
});

// Note: No default export - use getMarkdownStyles(Colors) from useTheme hook instead
