# Quick Color Reference

Import colors in any file:
```javascript
import { Colors } from '../constants/colors';
```

## Most Commonly Used Colors

| Color Name | Hex Value | Usage |
|-----------|-----------|-------|
| `Colors.primary` | `#4F46E5` | Primary buttons, main brand color |
| `Colors.success` | `#10B981` | Success states, positive feedback |
| `Colors.warning` | `#F59E0B` | Warning states, caution |
| `Colors.danger` | `#EF4444` | Error states, critical alerts |
| `Colors.white` | `#FFFFFF` | White backgrounds, light text on dark |
| `Colors.background` | `#F8FAFC` | Main app background |
| `Colors.textPrimary` | `#1E293B` | Main text color |
| `Colors.textSecondary` | `#64748B` | Secondary text, captions |
| `Colors.border` | `#CBD5E1` | Default borders |
| `Colors.spinner` | `#4F46E5` | Loading indicators |

## Quick Copy-Paste Examples

### Buttons
```javascript
// Primary button
<TouchableOpacity style={{ backgroundColor: Colors.primary }}>
  <Text style={{ color: Colors.white }}>Click Me</Text>
</TouchableOpacity>

// Danger button
<TouchableOpacity style={{ backgroundColor: Colors.danger }}>
  <Text style={{ color: Colors.white }}>Delete</Text>
</TouchableOpacity>
```

### Text
```javascript
<Text style={{ color: Colors.textPrimary }}>Main Text</Text>
<Text style={{ color: Colors.textSecondary }}>Secondary Text</Text>
```

### Backgrounds
```javascript
<View style={{ backgroundColor: Colors.background }} />
<View style={{ backgroundColor: Colors.white }} />
```

### Borders
```javascript
<View style={{ borderColor: Colors.border, borderWidth: 1 }} />
```

### Loading Indicators
```javascript
<ActivityIndicator color={Colors.spinner} />
<ActivityIndicator color={Colors.primary} />
```

### Status Badges
```javascript
// Success
<View style={{ backgroundColor: Colors.successLight }}>
  <Text style={{ color: Colors.success }}>Active</Text>
</View>

// Warning
<View style={{ backgroundColor: Colors.warningLight }}>
  <Text style={{ color: Colors.warningText }}>Pending</Text>
</View>

// Danger
<View style={{ backgroundColor: Colors.dangerLight }}>
  <Text style={{ color: Colors.danger }}>Failed</Text>
</View>
```

### Grade Colors (Academic)
```javascript
// Excellent grades (S, A+, A)
<Text style={{ color: Colors.gradeExcellent }}>A+</Text>

// Good grades (B+, B, B-)
<Text style={{ color: Colors.gradeGood }}>B</Text>

// Average grades (C+, C, C-)
<Text style={{ color: Colors.gradeAverage }}>C</Text>

// Poor grades (D+, D, F)
<Text style={{ color: Colors.gradePoor }}>D</Text>

// Pass grade
<Text style={{ color: Colors.gradePass }}>P</Text>
```

## All Available Colors (Alphabetical)

```
Colors.accent
Colors.accentDark
Colors.accentLight
Colors.background
Colors.backgroundDark
Colors.backgroundLight
Colors.black
Colors.border
Colors.borderLight
Colors.borderLighter
Colors.borderLightest
Colors.danger
Colors.dangerDark
Colors.dangerGrade
Colors.dangerLight
Colors.gradeAverage
Colors.gradeExcellent
Colors.gradeGood
Colors.gradeNeutral
Colors.gradePass
Colors.gradePoor
Colors.info
Colors.infoLight
Colors.inputBackground
Colors.overlay
Colors.placeholderText
Colors.primary
Colors.primaryDark
Colors.primaryLight
Colors.secondary
Colors.secondaryDark
Colors.secondaryLight
Colors.shadow
Colors.shadowBlack
Colors.spinner
Colors.success
Colors.successDark
Colors.successGrade
Colors.successLight
Colors.tabInactive
Colors.textLight
Colors.textPrimary
Colors.textSecondary
Colors.textTertiary
Colors.timetableInactive
Colors.timetablePressOverlay
Colors.timetablePrimary
Colors.transparent
Colors.warning
Colors.warningLight
Colors.warningOrange
Colors.warningText
Colors.white
```

## Need More Details?

See `COLOR_GUIDE.md` for complete documentation.
