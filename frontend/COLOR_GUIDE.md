# Color System Guide

## Overview

This application now uses a **centralized color system** with a single source of truth for all colors. This ensures consistency across the entire application and makes it easy to maintain and update the color scheme.

## Central Color File

**Location:** `constants/colors.js`

This file contains ALL colors used throughout the application. **Always import colors from this file.**

## How to Import Colors

### In JavaScript/JSX files:

```javascript
import { Colors } from '../constants/colors';

// Usage examples:
<Text style={{ color: Colors.primary }}>Primary Text</Text>
<View style={{ backgroundColor: Colors.background }} />
<ActivityIndicator color={Colors.spinner} />
```

### In Style files:

Style files should import through the central export:

```javascript
// For common styles
import { Colors } from './commonStyles';

// OR directly from constants
import { Colors } from '../constants/colors';
```

## Available Color Categories

### Primary Colors
- `Colors.primary` - Main brand color (Indigo-600)
- `Colors.primaryDark` - Darker variant
- `Colors.primaryLight` - Light background variant

### Secondary Colors
- `Colors.secondary` - Purple-600
- `Colors.secondaryDark`
- `Colors.secondaryLight`

### Accent Colors
- `Colors.accent` - Sky-500
- `Colors.accentDark`
- `Colors.accentLight`

### Status Colors

#### Success (Green)
- `Colors.success`
- `Colors.successDark`
- `Colors.successLight`
- `Colors.successGrade`

#### Warning (Orange/Amber)
- `Colors.warning`
- `Colors.warningLight`
- `Colors.warningText`
- `Colors.warningOrange`

#### Danger/Error (Red)
- `Colors.danger`
- `Colors.dangerDark`
- `Colors.dangerLight`
- `Colors.dangerGrade`

#### Info (Blue)
- `Colors.info`
- `Colors.infoLight`

### Grade Colors
- `Colors.gradeExcellent` - For S, A+, A grades
- `Colors.gradeGood` - For B+, B, B- grades
- `Colors.gradeAverage` - For C+, C, C- grades
- `Colors.gradePoor` - For D+, D, F grades
- `Colors.gradePass` - For P grade
- `Colors.gradeNeutral` - Default/unknown grade

### Neutral Colors
- `Colors.background` - Main app background
- `Colors.backgroundDark`
- `Colors.backgroundLight`
- `Colors.white`
- `Colors.black`

### Text Colors
- `Colors.textPrimary` - Main text
- `Colors.textSecondary` - Secondary text
- `Colors.textTertiary` - Tertiary text
- `Colors.textLight` - Light text

### Border Colors
- `Colors.border` - Default border
- `Colors.borderLight`
- `Colors.borderLighter`
- `Colors.borderLightest`

### Input/Form Colors
- `Colors.inputBackground`
- `Colors.placeholderText`

### Shadow Colors
- `Colors.shadow` - Primary shadow for elevation
- `Colors.shadowBlack` - Standard black shadow

### Component-Specific Colors
- `Colors.tabInactive` - Inactive tab color
- `Colors.timetablePrimary`
- `Colors.timetableInactive`
- `Colors.timetablePressOverlay`
- `Colors.spinner` - Activity indicators

### Utility Colors
- `Colors.transparent`
- `Colors.overlay`

## Migration Status

✅ **COMPLETED:**
- Created central `constants/colors.js` file
- Updated `constants/theme.ts` to reference central colors
- Updated `styles/commonStyles.js` to import from central colors
- Updated `styles/index.js` to export from central colors
- Updated all screens to import from `constants/colors`:
  - ✅ AttendanceScreen.jsx
  - ✅ ResultsScreen.jsx
  - ✅ EndSemResultsScreen.jsx
  - ✅ TimetableScreen.jsx
  - ✅ AIScreen.jsx
  - ✅ HomeScreen.jsx
  - ✅ LoginScreen.jsx
  - ✅ CardShowcaseScreen.jsx (uses commonStyles)
- Updated components:
  - ✅ AIFloatingButton.jsx
- Replaced hardcoded hex values:
  - ✅ `#4F46E5` → `Colors.primary` or `Colors.spinner`
  - ✅ `#FF6B35` → `Colors.warningOrange`
  - ✅ `#27ae60` → `Colors.gradeExcellent` or `Colors.successGrade`
  - ✅ `#3498db` → `Colors.gradeGood`
  - ✅ `#f39c12` → `Colors.gradeAverage`
  - ✅ `#e74c3c` → `Colors.gradePoor` or `Colors.dangerGrade`
  - ✅ `#9b59b6` → `Colors.gradePass`
  - ✅ `#666` → `Colors.gradeNeutral`
  - ✅ `#64748B` → `Colors.timetableInactive`
  - ✅ `rgba(79, 70, 229, 0.1)` → `Colors.timetablePressOverlay`
  - ✅ `#000` → `Colors.shadowBlack`
  - ✅ `"white"` → `Colors.white`

## Rules & Best Practices

### ✅ DO:
1. **Always** import colors from `constants/colors.js`
2. Use semantic color names (e.g., `Colors.primary`, `Colors.success`)
3. Add new colors to `constants/colors.js` with descriptive comments
4. Use the appropriate color category for your use case

### ❌ DON'T:
1. **Never** use hardcoded hex values (e.g., `#4F46E5`)
2. **Never** use string literals for colors (e.g., `"red"`, `"blue"`)
3. **Never** define colors in individual component/screen files
4. **Never** duplicate color definitions

## Adding New Colors

If you need to add a new color:

1. Open `constants/colors.js`
2. Add the color to the appropriate category
3. Add a descriptive comment explaining its use
4. Update this guide if it's a new category

Example:
```javascript
export const Colors = {
  // ... existing colors ...
  
  // New category
  newFeature: '#YOUR_HEX',  // Description of when to use
};
```

## Updating Colors

To change a color used throughout the app:

1. Open `constants/colors.js`
2. Update the hex value
3. The change will automatically apply everywhere

This is the power of centralized color management!

## Legacy Support

For backward compatibility with the old theme system:

- `constants/theme.ts` now imports from `constants/colors.js`
- Old imports from `'../constants/theme'` still work
- Gradually migrate to `'../constants/colors'` for clarity

## Questions?

If you're unsure which color to use, refer to the color definitions in `constants/colors.js` - each has a comment explaining its purpose.
