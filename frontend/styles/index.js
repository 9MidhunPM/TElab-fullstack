/**
 * Central export point for all stylesheets
 * This allows for cleaner imports across the application
 */

// Export common styles and design tokens
export { BorderRadius, Colors, default as commonStyles, Shadows, Spacing, Typography } from './commonStyles';

// Export component-specific styles
export { default as cardStyles } from './cardStyles';

// Export screen-specific styles
export { default as attendanceScreenStyles } from './attendanceScreenStyles';
export { default as endSemResultsScreenStyles } from './endSemResultsScreenStyles';
export { default as homeScreenStyles } from './homeScreenStyles';
export { default as loginScreenStyles } from './loginScreenStyles';
export { default as resultsScreenStyles } from './resultsScreenStyles';
export { default as timetableScreenStyles } from './timetableScreenStyles';

/**
 * Usage examples:
 * 
 * // Import specific stylesheet
 * import { loginScreenStyles, commonStyles } from '../styles';
 * 
 * // Import design tokens
 * import { Colors, Typography, Spacing } from '../styles';
 * 
 * // Import all at once
 * import * as Styles from '../styles';
 */
