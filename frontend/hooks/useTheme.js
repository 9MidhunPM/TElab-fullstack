import { useEffect, useState } from 'react';
import { Colors, getThemeMode, subscribeToThemeChanges } from '../constants/colors';
import { getAIScreenStyles } from '../styles/aiScreenStyles';
import { getAttendanceScreenStyles } from '../styles/attendanceScreenStyles';
import { getCardStyles } from '../styles/cardStyles';
import { getCommonStyles } from '../styles/commonStyles';
import { getEndSemResultsScreenStyles } from '../styles/endSemResultsScreenStyles';
import { getHomeScreenStyles } from '../styles/homeScreenStyles';
import { getMarkdownStyles } from '../styles/markdownStyles';
import { getResultsScreenStyles } from '../styles/resultsScreenStyles';
import { getTimetableScreenStyles } from '../styles/timetableScreenStyles';

/**
 * Hook to use theme colors and get notified when theme changes
 * This will cause components to re-render when theme is toggled
 */
export const useTheme = () => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    // Subscribe to theme changes
    const unsubscribe = subscribeToThemeChanges(() => {
      // Force component to re-render when theme changes
      forceUpdate(prev => prev + 1);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Create a new Colors object on each render to ensure React detects changes
  const currentColors = { ...Colors };

  return {
    Colors: currentColors,
    isDarkMode: getThemeMode() === 'DARK',
    themeMode: getThemeMode(),
    commonStyles: getCommonStyles(currentColors),
    aiScreenStyles: getAIScreenStyles(currentColors),
    markdownStyles: getMarkdownStyles(currentColors),
    homeScreenStyles: getHomeScreenStyles(currentColors),
    attendanceScreenStyles: getAttendanceScreenStyles(currentColors),
    resultsScreenStyles: getResultsScreenStyles(currentColors),
    timetableScreenStyles: getTimetableScreenStyles(currentColors),
    endSemResultsScreenStyles: getEndSemResultsScreenStyles(currentColors),
    cardStyles: getCardStyles(currentColors),
  };
};
