/**
 * Markdown styles for AI response rendering
 */

import { Colors } from '../styles/commonStyles';

export const markdownStyles = {
  body: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 24,
  },
  heading1: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 12,
    marginBottom: 8,
  },
  heading2: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 10,
    marginBottom: 6,
  },
  heading3: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  strong: {
    fontWeight: '700',
    color: Colors.primary,
  },
  em: {
    fontStyle: 'italic',
  },
  bullet_list: {
    marginTop: 8,
    marginBottom: 8,
  },
  ordered_list: {
    marginTop: 8,
    marginBottom: 8,
  },
  list_item: {
    marginBottom: 6,
    flexDirection: 'row',
  },
  bullet_list_icon: {
    color: Colors.primary,
    fontSize: 16,
    marginRight: 8,
  },
  paragraph: {
    marginBottom: 12,
  },
  code_inline: {
    backgroundColor: Colors.backgroundLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'monospace',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  code_block: {
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 8,
    fontFamily: 'monospace',
    fontSize: 14,
    marginVertical: 8,
    color: Colors.textPrimary,
  },
  blockquote: {
    backgroundColor: Colors.backgroundLight,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    paddingLeft: 12,
    paddingVertical: 8,
    marginVertical: 8,
  },
};
