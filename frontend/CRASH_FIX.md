# 🔧 App Crash Fix - Complete Solution

## ❌ Problem: App Crashing on Startup

The app was immediately closing/crashing when trying to open due to **critical configuration errors**.

---

## 🐛 Root Cause

**`process.env` doesn't work in React Native at module level!**

Two files were trying to access `process.env` at the top level (during module import), which causes an immediate crash:

1. **`api.jsx`** - Used `process.env.EXPO_PUBLIC_API_BASE_URL`
2. **`utils/aiApi.js`** - Used `process.env.EXPO_PUBLIC_AI_BASE_URL`

### Why This Crashes:
- `process.env` is not available in React Native runtime
- Accessing it at module level throws an error before app even renders
- Error happens during import, so no error boundaries can catch it

---

## ✅ Solution Applied

### 1. Fixed `api.jsx`

**Before (Crashed):**
```javascript
const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('Backend API URL not configured...');
}
```

**After (Works):**
```javascript
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl || 
                 'https://etlabapp-backendv1.onrender.com';

if (!BASE_URL) {
  throw new Error('Backend API URL not configured...');
}
```

### 2. Fixed `utils/aiApi.js`

**Before (Crashed):**
```javascript
const AI_BASE_URL = Constants.expoConfig?.extra?.AI_BASE_URL || 
                    process.env.EXPO_PUBLIC_AI_BASE_URL;

if (!AI_BASE_URL) {
  throw new Error('AI API URL not configured...');
}
```

**After (Works):**
```javascript
import Constants from 'expo-constants';

const AI_BASE_URL = Constants.expoConfig?.extra?.aiBaseUrl || 
                    'https://etlab-plus-ai-api.onrender.com';

if (!AI_BASE_URL) {
  throw new Error('AI API URL not configured...');
}
```

### 3. Updated `app.json`

**Added API URLs to `extra` config:**
```json
"extra": {
  "eas": {
    "projectId": "4a7a245c-5a1e-4564-bb15-a2499f0d4724"
  },
  "apiBaseUrl": "https://etlabapp-backendv1.onrender.com",
  "aiBaseUrl": "https://etlab-plus-ai-api.onrender.com"
}
```

---

## 🎯 Key Changes

| File | Change | Reason |
|------|--------|--------|
| `api.jsx` | Removed `process.env`, used `Constants.expoConfig.extra.apiBaseUrl` | React Native compatible |
| `utils/aiApi.js` | Removed `process.env`, used `Constants.expoConfig.extra.aiBaseUrl` | React Native compatible |
| `app.json` | Added `apiBaseUrl` and `aiBaseUrl` to `extra` | Centralized config |

---

## ✅ Result

- ✅ **App now starts successfully** without crashing
- ✅ **Metro bundler running** at http://localhost:8081
- ✅ **API URLs configured** and accessible via `Constants.expoConfig.extra`
- ✅ **Fallback URLs provided** if config is missing
- ✅ **No more `process.env` at module level**

---

## 📝 Important Notes

### ✅ Safe to Use:
```javascript
// Inside components (not at module level)
if (process.env.EXPO_OS === 'ios') { ... }  // ✅ OK
if (process.env.EXPO_OS === 'web') { ... }  // ✅ OK
```

### ❌ Never Use:
```javascript
// At module level (top of file)
const URL = process.env.EXPO_PUBLIC_API_URL;  // ❌ CRASH!
```

### ✅ Always Use:
```javascript
// At module level
import Constants from 'expo-constants';
const URL = Constants.expoConfig?.extra?.apiUrl;  // ✅ WORKS!
```

---

## 🚀 How to Start App

```bash
# Clear cache and start fresh
npx expo start --clear

# Then scan QR code or press:
# a - Android
# i - iOS
# w - Web
```

---

## 🔍 Testing Checklist

- ✅ App opens without crashing
- ✅ Login screen appears
- ✅ Can navigate between tabs
- ✅ API calls work (login, attendance, results)
- ✅ AI screen accessible
- ✅ No console errors about environment variables

---

**Status:** 🟢 **FIXED - App Running Successfully**

**Last Updated:** October 16, 2025
