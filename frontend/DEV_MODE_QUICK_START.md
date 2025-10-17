# 🎯 NextClassCard Dev Mode - Quick Start

## TL;DR
**There's now a floating eye button (👁️) at the bottom-right of your Home screen. Tap it to cycle through 7 different versions of the NextClassCard with sample data!**

---

## 🚀 How to Use (3 Steps)

### Step 1: Find the Button
- Open your app
- Go to Home screen
- Look at **bottom-right corner**
- See the green floating button with **👁️** emoji

### Step 2: Activate Dev Mode
- Tap the **👁️** button
- Button turns **red** with **🔧** emoji
- Yellow banner appears at top
- Shows current state name

### Step 3: Cycle Through States
- Tap **"Next State →"** in the yellow banner
- Or tap the **🔧** button again to disable

---

## 📊 What You'll See (7 States)

| # | State Name | What It Shows |
|---|------------|---------------|
| 1 | **Ongoing Class with Teacher** | Class happening NOW with green LIVE badge |
| 2 | **Ongoing Free Period** | Free period with LIVE badge |
| 3 | **Next Class (Not Started)** | Upcoming class with teacher |
| 4 | **Next Class (Free Period)** | Upcoming free period |
| 5 | **Tomorrow's Schedule** | End of day - calendar icon |
| 6 | **No Upcoming Classes** | All done - checkmark icon |
| 7 | **Real Data** | Your actual timetable data |

---

## 🎨 Things to Test

### ✅ Quick Checklist
- [ ] Enable dev mode (tap 👁️)
- [ ] Cycle through all 7 states
- [ ] Toggle theme (dark ↔ light) in each state
- [ ] Check LIVE badge appears on states 1 & 2
- [ ] Verify free periods show italic text
- [ ] Check empty states (5 & 6) show big icons
- [ ] Disable dev mode (tap 🔧)

### 🔍 Visual Elements to Verify
- **LIVE Badge:** Green with pulsing dot (states 1-2)
- **Time Badge:** Blue pill with clock icon
- **Subject Icon:** 40px rounded badge with book
- **Teacher Avatar:** 32px circle with teacher icon
- **Empty States:** 64px icon circles with emojis

---

## 💡 Pro Tips

### For Testing
```
1. Enable dev mode
2. For each state:
   - Check in light mode
   - Toggle to dark mode
   - Toggle back to light
3. Verify colors update instantly
4. Check spacing and alignment
5. Move to next state
```

### For Demos
```
1. Prepare by cycling to interesting state
2. Enable dev mode before showing
3. Walk through states explaining features
4. Toggle theme to show adaptability
5. End on real data (state 7)
```

### For Screenshots
```
1. Enable dev mode
2. Cycle to desired state
3. Take screenshot
4. Next state → Screenshot
5. Repeat for all states
6. Now you have complete docs!
```

---

## 🎯 Why This is Useful

### ✨ **Instant Preview**
No need to wait for specific times or conditions. See all designs immediately!

### 🎨 **Theme Testing**
Quickly verify your theme toggle works across all card states.

### 🐛 **Bug Finding**
Spot layout issues, color problems, or text overflow in edge cases.

### 📱 **Demo Ready**
Perfect for showing off features without depending on real data timing.

### 📚 **Documentation**
Capture all states for README, design docs, or user guides.

---

## 🔧 Sample Data Details

### State 1: Ongoing Class
```javascript
Subject: "Advanced Mathematics"
Teacher: "Dr. Sarah Johnson"
Time: "10:00 AM - 11:00 AM"
Status: Currently happening (LIVE)
```

### State 3: Next Class
```javascript
Subject: "Physics Laboratory"
Teacher: "Prof. Michael Chen"
Time: "2:00 PM - 4:00 PM"
Status: Coming up next
```

### State 5: Day Complete
```javascript
Message: "Day Complete! 🌙"
Description: "No more classes today..."
Icon: Large calendar (64px)
```

---

## 🎪 Demo Script

**Perfect for showing to others:**

> "Let me show you our NextClass card in different states. See this eye button? Watch..."
> 
> *[Tap eye button]*
> 
> "Now we're in dev mode. This is an ongoing class with a LIVE indicator. Notice the green badge and pulsing dot?"
> 
> *[Tap Next State]*
> 
> "Here's an upcoming class. No LIVE badge, but we show the teacher and time clearly."
> 
> *[Tap Next State]*
> 
> "And when the day is done, we show this friendly 'Day Complete' message with a moon emoji."
> 
> *[Toggle theme]*
> 
> "Works perfectly in both dark and light modes - see how everything adapts?"
> 
> *[Tap wrench to disable]*
> 
> "And we're back to real data. Cool, right?"

---

## 📸 Screenshot Checklist

Capture these for documentation:

- [ ] State 1 (Ongoing) - Light Mode
- [ ] State 1 (Ongoing) - Dark Mode
- [ ] State 3 (Next Class) - Light Mode
- [ ] State 3 (Next Class) - Dark Mode
- [ ] State 5 (Day Complete) - Light Mode
- [ ] State 6 (No Classes) - Light Mode
- [ ] Dev Mode Banner (showing controls)
- [ ] Floating Button (both 👁️ and 🔧)

---

## 🚨 Troubleshooting

### "I don't see the eye button"
- Check bottom-right corner (might be scrolled off screen)
- Make sure you're on Home tab (not other tabs)
- Try scrolling to bottom of screen

### "Button is there but nothing happens"
- Make sure app is fully loaded
- Check for JavaScript errors in console
- Try reloading the app

### "Card doesn't change when I tap Next State"
- Verify the yellow banner appeared
- Check state counter is incrementing
- Try disabling and re-enabling dev mode

### "Colors look wrong"
- Try toggling the theme (moon/sun button)
- Reload the app
- Check if you're in the right theme mode

---

## 🎯 Next Steps

### After Testing Dev Mode:
1. ✅ Verify all 7 states look good
2. ✅ Test theme switching
3. ✅ Check on different screen sizes
4. ✅ Disable dev mode when done
5. ✅ App is ready for production!

### For Further Development:
- Could add more edge cases (very long names, etc.)
- Add keyboard shortcuts (D for dev, N for next)
- Export states as JSON for testing
- Add auto-cycle demo mode (rotating every 3 seconds)

---

## 📝 Summary

**What:** Dev mode for NextClassCard with 7 sample states  
**Where:** Floating button (👁️) bottom-right of Home screen  
**Why:** Preview all designs, test themes, demo features  
**How:** Tap 👁️ → Tap "Next State →" → Repeat → Tap 🔧 to exit  

**Status:** ✅ Ready to use!

---

**Last Updated:** October 17, 2025  
**Version:** 1.0  
**Author:** AI Assistant  
**Purpose:** Testing & Development Tool
