# NextClassCard Dev Mode - Visual Guide

## UI Layout

```
┌─────────────────────────────────────────────────┐
│  Welcome!                    [🌙] [🚪]          │
│  John Doe                                        │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐  ← Dev Banner (when active)
│ 🔧 DEV MODE ACTIVE                              │
│ Ongoing Class with Teacher    [Next State →]   │
│ State 1 of 7                                    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ [🏫] Current Class                 10:30 AM     │  ← NextClassCard Header
├─────────────────────────────────────────────────┤
│                                     [🟢 LIVE]   │  ← LIVE Badge (ongoing)
│ [🕐 10:00 AM - 11:00 AM]                        │  ← Time Badge
│                                                  │
│ [📚] Advanced Mathematics                       │  ← Subject with Icon
│      Currently in session                       │  ← Context Label
│ ─────────────────────────────────────────────   │  ← Divider
│ [👨‍🏫] INSTRUCTOR                                 │  ← Teacher Avatar
│      Dr. Sarah Johnson                          │
└─────────────────────────────────────────────────┘

[Other Cards: Attendance, Results...]




                                           [👁️]    ← Floating Dev Button
                                                     (Bottom-Right Corner)
```

## Button States

### Dev Mode OFF (Default)
```
    [👁️]  ← Green circle, shows eye emoji
           Tap to ENABLE dev mode
```

### Dev Mode ON (Active)
```
    [🔧]  ← Red circle, shows wrench emoji
           Tap to DISABLE dev mode
```

## All 7 Sample States

### 1️⃣ Ongoing Class with Teacher
```
┌──────────────────────────────────┐
│ [🏫] 📍 Current Class   10:30 AM │
├──────────────────────────────────┤
│                     [🟢 LIVE]    │
│ [🕐 10:00 AM - 11:00 AM]         │
│ [📚] Advanced Mathematics        │
│      Currently in session        │
│ ────────────────────────────     │
│ [👨‍🏫] INSTRUCTOR                  │
│      Dr. Sarah Johnson           │
└──────────────────────────────────┘
```

### 2️⃣ Ongoing Free Period
```
┌──────────────────────────────────┐
│ [🏫] 📍 Current Class   11:15 AM │
├──────────────────────────────────┤
│                     [🟢 LIVE]    │
│ [🕐 11:00 AM - 12:00 PM]         │
│ [📚] Free Period (italic, muted) │
│      Currently in session        │
└──────────────────────────────────┘
```

### 3️⃣ Next Class (Not Started)
```
┌──────────────────────────────────┐
│ [🏫] ⏭️ Next Class     1:45 PM   │
├──────────────────────────────────┤
│ [🕐 2:00 PM - 4:00 PM]           │
│ [📚] Physics Laboratory          │
│      Coming up next              │
│ ────────────────────────────     │
│ [👨‍🏫] INSTRUCTOR                  │
│      Prof. Michael Chen          │
└──────────────────────────────────┘
```

### 4️⃣ Next Class (Free Period)
```
┌──────────────────────────────────┐
│ [🏫] ⏭️ Next Class     2:50 PM   │
├──────────────────────────────────┤
│ [🕐 3:00 PM - 4:00 PM]           │
│ [📚] Free Period (italic, muted) │
│      Coming up next              │
└──────────────────────────────────┘
```

### 5️⃣ Tomorrow's Schedule
```
┌──────────────────────────────────┐
│ [🏫] Tomorrow's Classes  9:13 PM │
├──────────────────────────────────┤
│                                  │
│        [Large 📅 Icon]           │
│     Day Complete! 🌙             │
│                                  │
│  No more classes today.          │
│  Tomorrow's schedule will be     │
│  available soon.                 │
│                                  │
└──────────────────────────────────┘
```

### 6️⃣ No Upcoming Classes
```
┌──────────────────────────────────┐
│ [🏫] ⏭️ Next Class     3:30 PM   │
├──────────────────────────────────┤
│                                  │
│        [Large ✅ Icon]           │
│       All Clear! ✨              │
│                                  │
│  No upcoming classes scheduled   │
│                                  │
└──────────────────────────────────┘
```

### 7️⃣ Real Data
```
Shows actual data from your timetable
(Whatever getNextClassInfo returns)
```

## Color Legend

### Light Mode Colors
- **Primary:** Blue (#6366F1 or similar)
- **Success:** Green (#10B981)
- **Warning:** Orange/Yellow (#F59E0B)
- **Danger:** Red
- **Background:** White/Light gray
- **Text Primary:** Dark gray (#1E293B)
- **Text Secondary:** Medium gray (#64748B)
- **Text Tertiary:** Light gray (#94A3B8)

### Dark Mode Colors
- **Primary:** Light purple (#A78BFA or #E9D5FF)
- **Success:** Bright green
- **Warning:** Bright orange
- **Danger:** Bright red
- **Background:** Dark gray/black
- **Text Primary:** Light purple (#E9D5FF)
- **Text Secondary:** Medium purple (#C4B5FD)
- **Text Tertiary:** Muted purple

## Interactive Demo Flow

```
1. Launch App
   ↓
2. Navigate to Home Screen
   ↓
3. See real NextClass card (if data available)
   ↓
4. Tap 👁️ button (bottom-right)
   ↓
5. Dev mode activates:
   - Button changes to 🔧 (red)
   - Yellow banner appears at top
   - Shows "State 1 of 7"
   ↓
6. Tap "Next State →" repeatedly
   ↓
7. Cycle through all 7 states:
   State 1 → State 2 → ... → State 7 → State 1
   ↓
8. Toggle theme while in any state
   (See colors update immediately)
   ↓
9. Tap 🔧 button to disable
   ↓
10. Returns to real data display
```

## Testing Scenarios

### Scenario A: First Time User
```
1. Open app → See eye button
2. Tap eye → "What's this?" (curiosity)
3. Banner explains: "Dev Mode Active"
4. Tap "Next State" → See different design
5. "Oh, this shows different class states!"
6. Cycle through all → Understand the card
7. Tap wrench → Back to normal
```

### Scenario B: Developer Testing
```
1. Make UI changes to NextClassCard
2. Enable dev mode
3. Cycle through all 7 states
4. Verify each looks correct
5. Toggle dark/light theme
6. Check all states in both themes
7. Done testing → Disable dev mode
```

### Scenario C: Design Review
```
1. Join design review meeting
2. Enable dev mode
3. Share screen
4. "Let me show you state 1..."
5. Click through each state
6. Discuss design decisions
7. Make changes live
8. Re-test immediately
```

## Keyboard Shortcuts (Future)
Could add keyboard shortcuts for faster testing:
- `D` - Toggle dev mode
- `N` - Next state
- `P` - Previous state
- `T` - Toggle theme
- `R` - Reset to state 1

## Status: ✅ Complete & Functional
