# ETLab App - React Native Authentication & Attendance

A React Native app built with Expo that implements login, profile, and attendance features using the ETLab backend API with swipeable tabs navigation.

## Features

- 🔐 **Secure Authentication**: Login with username/password
- 👤 **Profile Display**: View user profile details
- � **Attendance Tracking**: Subject-wise attendance with summary
- �🔒 **Token Management**: Secure token storage using expo-secure-store
- 🔄 **Fresh Token Validation**: Always uses fresh tokens, never cached ones
- 📱 **Swipeable Tabs**: Material top tabs with left/right swipe navigation
- ⚡ **Dynamic Tab System**: Easy addition of new components as tabs
- 🎯 **Context-Based State Management**: Global authentication state
- 🚫 **Race Condition Prevention**: AbortController for request cancellation

## Backend API

- **Base URL**: Configured via environment variable (`EXPO_PUBLIC_API_BASE_URL`)
- **Default URL**: `https://etlabapp-backendv1.onrender.com`
- **Login Endpoint**: `POST /app/login`
- **Profile Endpoint**: `GET /app/profile`
- **Attendance Endpoint**: `GET /app/attendance`

## Project Structure

```
├── App.jsx                     # Main app with tabs navigation
├── api.jsx                     # API functions (login, profile, attendance)
├── contexts/
│   └── AuthContext.jsx         # Authentication context with race condition handling
├── screens/
│   ├── LoginScreen.jsx         # Login form with validation
│   ├── HomeScreen.jsx          # Profile display and logout
│   └── AttendanceScreen.jsx    # Attendance tracking with summary
├── tabs/
│   └── index.jsx               # Dynamic tabs configuration
├── ADDING_TABS.md              # Guide for adding new components as tabs
└── package.json                # Dependencies and scripts
```

## Setup Instructions

### 1. Prerequisites

Make sure you have the following installed:
- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device (for testing)

### 2. Environment Setup

**Configure environment variables:**

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
# EXPO_PUBLIC_API_BASE_URL=https://your-api-url.com
```

**Environment Variables:**
- `EXPO_PUBLIC_API_BASE_URL` - Backend API base URL (required)
- Additional variables can be added as needed (prefix with `EXPO_PUBLIC_`)

### 3. Installation

```bash
# Navigate to the project
cd frontend

# Install dependencies
npm install

# Install required packages
npm install expo-secure-store @react-navigation/native-stack @react-navigation/material-top-tabs react-native-tab-view react-native-pager-view

# Start the development server
npm start
```

### 4. Running the App

After running `npm start`, you'll see a QR code in the terminal. You can:

- **Mobile Testing**: Scan the QR code with Expo Go app (Android) or Camera app (iOS)
- **Web Testing**: Press `w` to open in web browser
- **Android Emulator**: Press `a` (requires Android Studio)
- **iOS Simulator**: Press `i` (requires Xcode on macOS)

## App Features

### 🏠 Home Tab
- Displays user profile information
- Shows name, SR number, mobile number, university reg number
- Logout functionality with confirmation

### 📊 Attendance Tab
- **Summary Card**: Overall attendance percentage and total hours
- **Subject List**: Individual subject attendance with color coding
- **Real-time Data**: Pull-to-refresh functionality
- **Loading States**: Smooth loading indicators

### ➕ Adding New Tabs

The app is designed for easy extension. To add a new component as a tab:

1. **Create your component** in `screens/YourScreen.jsx`
2. **Add one line** to `tabs/index.jsx`:
   ```jsx
   { key: 'your-key', title: 'Your Tab', component: YourScreen }
   ```

That's it! Your component will automatically appear as a swipeable tab.

**See [ADDING_TABS.md](./ADDING_TABS.md) for detailed instructions and examples.**

## Authentication Flow

1. **Login Process**:
   - User enters username and password
   - App sends POST request to `/app/login`
   - On success, receives fresh token
   - **Immediately** uses fresh token to fetch profile from `/app/profile`
   - Stores both token and user data securely
   - Navigates to tabs interface

2. **Token Management**:
   - Always uses fresh token from login response for first profile/attendance fetch
   - Never reuses or relies on stored tokens for initial authentication
   - Overwrites old tokens on each new login
   - Validates stored tokens on app startup

3. **Race Condition Prevention**:
   - Uses AbortController to cancel previous requests
   - Prevents stale data from appearing in UI
   - Ensures data consistency across tabs

## API Integration

### Login API
```javascript
// POST /app/login
{
  "username": "224789",
  "password": "password123"
}

// Response
{
  "token": "eyJhbGciOiJIUzM4NCJ9...",
  "type": "Bearer",
  "username": "224789",
  "expiresAt": 1760099206215
}
```

### Attendance API
```javascript
// GET /app/attendance
// Headers: Authorization: Bearer <token>

// Response
{
  "SC3": { "attendance_percentage": "100%", "present_hours": "7", "total_hours": "7" },
  "24EST315": { "attendance_percentage": "94%", "present_hours": "33", "total_hours": "35" },
  // ... more subjects
  "total_percentage": "95%",
  "total_present_hours": "272",
  "total_hours": "285",
  "name": "STUDENT NAME",
  "roll_no": "7",
  "university_reg_no": "SHR24CS191"
}
```

## Navigation

### Swipeable Tabs
- **Swipe left/right** to navigate between tabs
- **Tap tab headers** for quick navigation
- **Material Design** styling with smooth animations
- **Accessibility support** with proper labels

### Tab Configuration
Located in `tabs/index.jsx`:
```javascript
export const tabsConfig = [
  { key: 'home', title: 'Home', component: HomeScreen },
  { key: 'attendance', title: 'Attendance', component: AttendanceScreen },
  // Add new tabs here
];
```

## Security Features

- **Fresh Token Policy**: Never reuses old tokens for authentication
- **Secure Storage**: Uses expo-secure-store for token persistence
- **Token Validation**: Validates stored tokens on app startup
- **Request Cancellation**: AbortController prevents race conditions
- **Automatic Cleanup**: Clears all data on logout

## Usage

### Login Credentials
Use your university credentials to log in. Example:
- **Username**: `224789`
- **Password**: Your university password

### Navigation
- **Swipe left/right** between Home and Attendance tabs
- **Pull down** on Attendance to refresh data
- **Tap logout** on Home tab to sign out

## Error Handling

- **Network Errors**: Displays user-friendly error messages
- **Invalid Credentials**: Shows login failure alerts
- **Token Expiration**: Automatically redirects to login
- **Loading States**: Shows activity indicators during API calls
- **Request Cancellation**: Graceful handling of cancelled requests

## Troubleshooting

### Common Issues

1. **Metro bundler errors**: Try clearing cache with `npx expo start --clear`
2. **Network issues**: Check if the backend API is accessible
3. **Dependencies**: Ensure all packages are installed correctly
4. **Tabs not appearing**: Check `tabs/index.jsx` configuration

### Development Tips

- Use Expo Go for quick testing on physical devices
- Check the terminal for real-time logs and errors
- Use React Native Debugger for advanced debugging
- Test swipe gestures on actual devices for best experience

## Contributing

### Git Workflow
- **Environment files**: Never commit `.env` files to version control
- **Template updates**: Update `.env.example` when adding new environment variables
- **Sensitive data**: All sensitive configuration should use environment variables
- **Local setup**: Always copy `.env.example` to `.env` for local development

1. Follow the existing code structure
2. Add new features as separate tabs using the dynamic system
3. Test on multiple devices/simulators
4. Ensure proper error handling and loading states
5. Update documentation for new features
6. Keep sensitive data in environment variables

## License

This project is part of the ETLab application system.
