/**
 * Centralized Color Palette
 * 
 * This file contains ALL colors used throughout the application.
 * Import colors from this file ONLY to ensure consistency.
 * 
 * Usage:
 * import { Colors } from '../constants/colors';
 * 
 * Then use: Colors.primary, Colors.success, etc.
 * 
 * TO SWITCH THEMES: Change the export at the bottom from LightColors to DarkColors
 */

// ============================================
// 🌞 LIGHT MODE COLORS
// ============================================
export const LightColors = {
  // ===== PRIMARY COLORS - Blue/Indigo =====
  primary: '#4F46E5',        // Indigo-600 - Main brand color
  primaryDark: '#4338CA',    // Indigo-700 - Darker variant
  primaryLight: '#EEF2FF',   // Indigo-50 - Light background variant
  
  // ===== SECONDARY COLORS - Purple =====
  secondary: '#9333EA',      // Purple-600
  secondaryDark: '#7E22CE',  // Purple-700
  secondaryLight: '#FAF5FF', // Purple-50
  
  // ===== ACCENT COLORS - Cyan/Sky Blue =====
  accent: '#0EA5E9',         // Sky-500
  accentDark: '#0284C7',     // Sky-600
  accentLight: '#E0F2FE',    // Sky-100
  
  // ===== STATUS COLORS =====
  // Success - Green
  success: '#10B981',        // Green-500
  successDark: '#059669',    // Green-600
  successLight: '#D1FAE5',   // Green-100
  successGrade: '#27ae60',   // Grade A/S color
  
  // Warning - Orange/Amber
  warning: '#F59E0B',        // Amber-500
  warningLight: '#FEF3C7',   // Amber-100
  warningText: '#92400E',    // Amber-800
  warningOrange: '#FF6B35',  // Orange variant for attendance warnings
  
  // Danger/Error - Red
  danger: '#EF4444',         // Red-500
  dangerDark: '#DC2626',     // Red-600
  dangerLight: '#FEE2E2',    // Red-100
  dangerGrade: '#e74c3c',    // Grade D/F color
  
  // Info - Blue
  info: '#3B82F6',           // Blue-500
  infoLight: '#DBEAFE',      // Blue-100
  
  // ===== GRADE COLORS =====
  gradeExcellent: '#27ae60', // S, A+, A grades
  gradeGood: '#3498db',      // B+, B, B- grades
  gradeAverage: '#f39c12',   // C+, C, C- grades
  gradePoor: '#e74c3c',      // D+, D, F grades
  gradePass: '#9b59b6',      // P grade (pass)
  gradeNeutral: '#666',      // Default/unknown grade
  
  // ===== NEUTRAL COLORS =====
  // Backgrounds
  background: '#F8FAFC',     // Slate-50 - Main app background
  backgroundDark: '#F1F5F9', // Slate-100 - Darker background
  backgroundLight: '#F1F5F9', // Slate-100 - Light background
  cardBackground: '#FFFFFF', // White - Card/elevated surface background
  
  // Pure colors
  white: '#FFFFFF',
  black: '#000000',
  
  // ===== TEXT COLORS =====
  text: '#1E293B',           // Alias for textPrimary - Main text (for backward compatibility)
  textPrimary: '#1E293B',    // Slate-800 - Main text
  textSecondary: '#64748B',  // Slate-500 - Secondary text
  textTertiary: '#94A3B8',   // Slate-400 - Tertiary text
  textLight: '#475569',      // Slate-600 - Light text
  
  // ===== BORDER COLORS =====
  border: '#CBD5E1',         // Slate-300 - Default border
  borderLight: '#E2E8F0',    // Slate-200 - Light border
  borderLighter: '#F1F5F9',  // Slate-100 - Lighter border
  borderLightest: '#F8FAFC', // Slate-50 - Lightest border
  
  // ===== INPUT/FORM COLORS =====
  inputBackground: '#F8FAFC',
  placeholderText: '#94A3B8',
  
  // ===== SHADOW COLORS =====
  shadow: '#4F46E5',         // Shadow for elevation effects
  shadowBlack: '#000000',    // Standard black shadow
  
  // ===== ADDITIONAL COMPONENT COLORS =====
  // Tab Bar
  tabInactive: '#64748B',    // Inactive tab color
  
  // Timetable
  timetablePrimary: '#4F46E5',
  timetableInactive: '#64748B',
  timetablePressOverlay: 'rgba(79, 70, 229, 0.1)',
  
  // Activity Indicators & Loading States
  spinner: '#4F46E5',
  
  // AI Icon Color
  aiIconOnButton: '#FFFFFF',  // White icon on colored button for light mode
  
  // Transparent/Overlay colors
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

// ============================================
// 🌙 DARK MODE COLORS
// ============================================
export const DarkColors = {
  // ===== PRIMARY COLORS - Purple (Dark Mode) =====
  primary: '#A78BFA',        // Purple-400 - Main brand color for dark mode
  primaryDark: '#8B5CF6',    // Purple-500 - Darker variant
  primaryLight: '#2D1B4E',   // Deep purple - Light background variant
  
  // ===== SECONDARY COLORS - Purple =====
  secondary: '#C084FC',      // Purple-400
  secondaryDark: '#A855F7',  // Purple-500
  secondaryLight: '#1E1436', // Very dark purple
  
  // ===== ACCENT COLORS - Cyan/Sky Blue =====
  accent: '#38BDF8',         // Sky-400
  accentDark: '#0EA5E9',     // Sky-500
  accentLight: '#1E293B',    // Dark slate
  
  // ===== STATUS COLORS =====
  // Success - Green
  success: '#34D399',        // Green-400
  successDark: '#10B981',    // Green-500
  successLight: '#1A3A2E',   // Dark green background
  successGrade: '#34D399',   // Grade A/S color for dark mode
  
  // Warning - Orange/Amber
  warning: '#FBBF24',        // Amber-400
  warningLight: '#2D2410',   // Dark amber background
  warningText: '#FCD34D',    // Amber-300
  warningOrange: '#FB923C',  // Orange-400 for attendance warnings
  
  // Danger/Error - Red
  danger: '#F87171',         // Red-400
  dangerDark: '#EF4444',     // Red-500
  dangerLight: '#3A1A1A',    // Dark red background
  dangerGrade: '#F87171',    // Grade D/F color for dark mode
  
  // Info - Blue
  info: '#60A5FA',           // Blue-400
  infoLight: '#1E293B',      // Dark blue background
  
  // ===== GRADE COLORS (Dark Mode Variants) =====
  gradeExcellent: '#34D399', // S, A+, A grades - Green-400
  gradeGood: '#60A5FA',      // B+, B, B- grades - Blue-400
  gradeAverage: '#FBBF24',   // C+, C, C- grades - Amber-400
  gradePoor: '#F87171',      // D+, D, F grades - Red-400
  gradePass: '#C084FC',      // P grade (pass) - Purple-400
  gradeNeutral: '#9CA3AF',   // Default/unknown grade - Gray-400
  
  // ===== NEUTRAL COLORS =====
  // Backgrounds
  background: '#000000',     // Pure black - Main app background
  backgroundDark: '#0F0F0F', // Almost black - Darker sections
  backgroundLight: '#1A1A1A',// Dark gray - Lighter sections
  cardBackground: '#1F1F1F', // Dark gray - Card/elevated surface background
  
  // Pure colors
  white: '#FFFFFF',          // For white elements
  black: '#000000',          // For black elements
  
  // ===== TEXT COLORS (Purple tinted for dark mode) =====
  text: '#E9D5FF',           // Alias for textPrimary - Main text (for backward compatibility)
  textPrimary: '#E9D5FF',    // Purple-200 - Main text (light purple)
  textSecondary: '#C4B5FD',  // Purple-300 - Secondary text
  textTertiary: '#A78BFA',   // Purple-400 - Tertiary text
  textLight: '#DDD6FE',      // Purple-200 - Light text variant
  
  // ===== BORDER COLORS =====
  border: '#374151',         // Gray-700 - Default border
  borderLight: '#4B5563',    // Gray-600 - Light border
  borderLighter: '#6B7280',  // Gray-500 - Lighter border
  borderLightest: '#9CA3AF', // Gray-400 - Lightest border
  
  // ===== INPUT/FORM COLORS =====
  inputBackground: '#1A1A1A',// Dark input background
  placeholderText: '#9CA3AF',// Gray-400 - Placeholder text
  
  // ===== SHADOW COLORS =====
  shadow: '#A78BFA',         // Purple shadow for elevation
  shadowBlack: '#000000',    // Black shadow
  
  // ===== ADDITIONAL COMPONENT COLORS =====
  // Tab Bar
  tabInactive: '#9CA3AF',    // Gray-400 - Inactive tab
  
  // Timetable
  timetablePrimary: '#A78BFA',      // Purple-400
  timetableInactive: '#9CA3AF',     // Gray-400
  timetablePressOverlay: 'rgba(167, 139, 250, 0.1)', // Purple overlay
  
  // Activity Indicators & Loading States
  spinner: '#A78BFA',        // Purple-400 spinner
  
  // AI Icon Color
  aiIconOnButton: '#E9D5FF',  // Light purple icon on button for dark mode
  
  // Transparent/Overlay colors
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.8)', // Darker overlay for dark mode
};

// ============================================
// 🎨 ACTIVE COLOR THEME
// ============================================
/**
 * TO SWITCH BETWEEN LIGHT AND DARK MODE:
 * Simply change the line below from LightColors to DarkColors (or vice versa)
 * 
 * export const Colors = LightColors;  // <-- For Light Mode
 * export const Colors = DarkColors;   // <-- For Dark Mode
 */

// 👇 CHANGE THIS LINE TO SWITCH THEMES 👇
export const Colors = DarkColors;  // Change to DarkColors for dark mode
// export const Colors = DarkColors;  // Uncomment this and comment above for dark mode

/**
 * Legacy color mappings for backward compatibility
 * These map old theme.ts color names to the new Colors object
 */
export const ThemeColors = {
  light: {
    text: LightColors.textPrimary,
    background: LightColors.white,
    tint: LightColors.primary,
    icon: LightColors.textSecondary,
    tabIconDefault: LightColors.textSecondary,
    tabIconSelected: LightColors.primary,
  },
  dark: {
    text: DarkColors.textPrimary,
    background: DarkColors.background,
    tint: DarkColors.primary,
    icon: DarkColors.textSecondary,
    tabIconDefault: DarkColors.tabInactive,
    tabIconSelected: DarkColors.primary,
  },
};

