# NextClassCard Dev Mode - Testing All States

## Overview
Added a developer mode that allows you to cycle through all possible states of the NextClassCard component with sample data. This makes it easy to preview and test the design without needing specific real data conditions.

## How to Use

### 1. **Activate Dev Mode**
- Look for the **floating eye button (👁️)** at the bottom-right corner of the Home screen
- Tap it to enable Dev Mode
- The button turns into a wrench (🔧) and changes to red when active

### 2. **Dev Mode Control Panel**
When Dev Mode is active, you'll see a yellow banner at the top showing:
- Current state name (e.g., "Ongoing Class with Teacher")
- State counter (e.g., "State 1 of 7")
- **"Next State →"** button to cycle through states

### 3. **Cycle Through States**
- Tap the **"Next State →"** button to see the next variation
- It automatically loops back to the first state after the last one

### 4. **Disable Dev Mode**
- Tap the red wrench button (🔧) at the bottom-right to disable
- Returns to showing real data from your timetable

## Available Sample States

### State 1: Ongoing Class with Teacher
```javascript
{
  currentClass: {
    subject: "Advanced Mathematics",
    teacher: "Dr. Sarah Johnson",
    timing: "10:00 AM - 11:00 AM"
  },
  isClassOngoing: true,
  currentTime: "10:30 AM"
}
```
**Shows:** 
- Green "LIVE" badge with pulsing dot
- Thick border with tinted background
- Time badge with clock icon
- Large subject with icon badge
- Teacher info with circular avatar
- "Currently in session" subtitle

### State 2: Ongoing Free Period
```javascript
{
  currentClass: {
    subject: "Free Period",
    teacher: null,
    timing: "11:00 AM - 12:00 PM"
  },
  isClassOngoing: true,
  currentTime: "11:15 AM"
}
```
**Shows:**
- "LIVE" badge for ongoing status
- Italic "Free Period" text in muted color
- No teacher section (since it's free)
- Muted icon color

### State 3: Next Class (Not Started)
```javascript
{
  nextClass: {
    subject: "Physics Laboratory",
    teacher: "Prof. Michael Chen",
    timing: "2:00 PM - 4:00 PM"
  },
  isClassOngoing: false,
  currentTime: "1:45 PM"
}
```
**Shows:**
- No "LIVE" badge (not started yet)
- Normal border (thinner than ongoing)
- Clear background (not tinted)
- "Coming up next" subtitle
- Full teacher information

### State 4: Next Class (Free Period)
```javascript
{
  nextClass: {
    subject: "Free Period",
    teacher: null,
    timing: "3:00 PM - 4:00 PM"
  },
  isClassOngoing: false,
  currentTime: "2:50 PM"
}
```
**Shows:**
- Upcoming free period
- Muted styling
- No teacher info
- "Coming up next" context

### State 5: Tomorrow's Schedule
```javascript
{
  showTomorrowSchedule: true,
  currentTime: "9:13 PM"
}
```
**Shows:**
- Large calendar icon in circular badge
- "Day Complete! 🌙" heading
- Description: "No more classes today..."
- Empty state design

### State 6: No Upcoming Classes
```javascript
{
  currentClass: null,
  nextClass: null,
  isClassOngoing: false,
  showTomorrowSchedule: false,
  currentTime: "3:30 PM"
}
```
**Shows:**
- Large checkmark icon in circular badge (green)
- "All Clear! ✨" heading
- "No upcoming classes scheduled"
- Positive empty state

### State 7: Real Data
Uses actual data from `getNextClassInfo(appData.timetable)`

**Shows:**
- Whatever your current timetable state is
- Useful to compare with sample states

## Visual Features to Check

### When Testing Each State, Verify:

#### ✅ **Colors & Theme**
- [ ] All colors update when toggling theme (dark ↔ light)
- [ ] Background tints work correctly
- [ ] Icon colors are appropriate for context
- [ ] Text hierarchy (primary, secondary, tertiary)
- [ ] Border colors match theme

#### ✅ **Layout & Spacing**
- [ ] Time badge positioned correctly at top
- [ ] Subject icon badge (40x40px) properly sized
- [ ] Teacher avatar (32px) aligned correctly
- [ ] Proper padding and margins throughout
- [ ] Border divider between content and teacher

#### ✅ **Special Elements**
- [ ] "LIVE" badge appears only on ongoing classes
- [ ] Pulsing dot (6px) visible in LIVE badge
- [ ] Free periods show italic, muted text
- [ ] Teacher section hidden for free periods
- [ ] Context subtitles show correct text

#### ✅ **Icons**
- [ ] SchoolIcon in header (academic building)
- [ ] ClockIcon in time badge
- [ ] BookIcon in subject badge
- [ ] TeacherIcon in circular avatar
- [ ] CalendarIcon for "tomorrow" state
- [ ] CheckCircleIcon for "no classes" state

#### ✅ **Empty States**
- [ ] Large 64px icon circles
- [ ] Friendly emoji in headings
- [ ] Proper descriptions with line breaks
- [ ] Centered layout

## Code Implementation

### State Management
```javascript
const [devMode, setDevMode] = useState(false);
const [devStateIndex, setDevStateIndex] = useState(0);

const DEV_SAMPLE_STATES = [ /* 7 states */ ];

const cycleDevState = () => {
  const nextIndex = (devStateIndex + 1) % DEV_SAMPLE_STATES.length;
  setDevStateIndex(nextIndex);
};

const displayNextClassInfo = devMode 
  ? DEV_SAMPLE_STATES[devStateIndex].data 
  : nextClassInfo;
```

### UI Components
- **Floating Button:** Bottom-right, z-index 1000
- **Dev Banner:** Yellow warning color, full-width
- **State Info:** Shows name and counter
- **Cycle Button:** Orange warning color

## Benefits

### 🎯 **For Development**
1. **Instant Preview** - See all designs without waiting for specific conditions
2. **Theme Testing** - Quickly verify colors in dark/light mode
3. **Edge Cases** - Test rare scenarios (free periods, empty states)
4. **Design Iteration** - Make changes and see all states immediately
5. **No Dependencies** - Don't need real timetable data

### 🎯 **For Demo/Presentation**
1. **Showcase All Features** - Show every possible state
2. **Controlled Demo** - Know exactly what will display
3. **Professional** - No waiting for "right" data conditions
4. **Complete Coverage** - Demonstrate handling of all scenarios

### 🎯 **For QA/Testing**
1. **Systematic Testing** - Check each state methodically
2. **Regression Testing** - Quickly verify nothing broke
3. **Screenshot/Documentation** - Capture all states easily
4. **Comparison** - Side-by-side before/after testing

## Quick Test Checklist

```
□ Enable Dev Mode (tap 👁️)
□ State 1: Ongoing with teacher - Check LIVE badge
□ State 2: Ongoing free period - Check muted styling
□ State 3: Next class - Check "Coming up next"
□ State 4: Next free period - Check italic text
□ State 5: Tomorrow - Check calendar icon & emoji
□ State 6: No classes - Check checkmark & emoji
□ State 7: Real data - Verify actual data works
□ Toggle theme (each state) - Check colors update
□ Disable Dev Mode (tap 🔧)
□ Verify real data displays correctly
```

## Technical Notes

- Dev mode only affects NextClassCard display
- Other cards (Attendance, Results) show real data
- State persists during navigation within tab
- Resets on app reload
- Floating button has highest z-index (1000)
- Dev banner has warning color scheme

## Future Enhancements

Possible additions to dev mode:
- [ ] Add more edge cases (very long subject names, etc.)
- [ ] Export sample states to JSON
- [ ] Record/playback state sequences
- [ ] Time-based auto-cycling for demo mode
- [ ] Save favorite states for quick access

## Status
✅ **COMPLETE** - Fully functional dev mode with 7 sample states

**Last Updated:** October 17, 2025
