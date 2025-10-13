# Centralized Data Loading System

## Overview

The app now uses a centralized data loading system that loads all API endpoints sequentially (non-parallel) in a predefined order when the user logs in. This provides several benefits:

1. **No duplicate API calls** - Data is loaded once and shared across all screens
2. **Predictable loading order** - You can control exactly which endpoint loads first, second, etc.
3. **Better user experience** - Users see progress as each endpoint loads
4. **Error handling** - Individual endpoint failures don't break the entire app
5. **Centralized cache** - All screens access the same data store

## Architecture

### Components:

1. **DataContext** (`contexts/DataContext.jsx`) - Centralized storage for all app data
2. **HomeScreen** (`screens/HomeScreen.jsx`) - Manages sequential API loading
3. **Updated Screens** - All other screens now use centralized data instead of individual API calls

### Data Flow:

```
Login → HomeScreen → Sequential API Loading → DataContext → All Screens
```

## Customizing Load Order

The system now uses a configuration-based approach for managing load order. You have several options:

### Method 1: Change Load Preset (Easiest)

In `HomeScreen.jsx`, change the preset name:

```javascript
// Change 'default' to one of: 'academic', 'daily', 'fast'
const API_LOAD_ORDER = getLoadOrderByPreset('default');
```

**Available Presets:**
- `'default'` - Loads by priority (attendance → timetable → results → endSemResults)
- `'academic'` - Results first (results → endSemResults → attendance → timetable)
- `'daily'` - Daily planning focus (timetable → attendance → results → endSemResults)
- `'fast'` - Only fast endpoints (attendance → timetable)

### Method 2: Modify Configuration File

Edit `config/dataLoadingConfig.js` to change priorities:

```javascript
export const API_LOAD_CONFIG = [
  {
    name: 'results',
    displayName: 'Results Data',
    apiFunction: fetchResultsWithToken,
    priority: 4, // Change this to 4 to load first
    timeout: 35000,
    retryCount: 1,
  },
  // ... other endpoints
];
```

### Method 3: Create Custom Preset

Add a new preset in `config/dataLoadingConfig.js`:

```javascript
export const LOAD_ORDER_PRESETS = {
  // ... existing presets
  custom: () => [
    API_LOAD_CONFIG.find(c => c.name === 'timetable'),
    API_LOAD_CONFIG.find(c => c.name === 'results'),
    API_LOAD_CONFIG.find(c => c.name === 'attendance'),
    API_LOAD_CONFIG.find(c => c.name === 'endSemResults'),
  ].filter(Boolean),
};
```

Then use it in HomeScreen:
```javascript
const API_LOAD_ORDER = getLoadOrderByPreset('custom');
```

## Using Centralized Data in Screens

All screens can now access the centralized data using the `useAppData` hook:

```javascript
import { useAppData } from '../contexts/DataContext';

export default function YourScreen() {
  const { 
    appData,           // Contains all loaded data
    dataLoadingStatus, // Loading status for each endpoint
    isDataAvailable,   // Helper function to check if data is ready
    hasDataError,      // Helper function to check if data has errors
    getDataError       // Helper function to get error messages
  } = useAppData();

  // Access specific data
  const attendance = appData.attendance;
  const isAttendanceLoading = dataLoadingStatus.attendance === 'pending';
  const hasAttendanceError = hasDataError('attendance');

  // Check if data is ready to use
  if (isDataAvailable('attendance')) {
    // Render attendance data
    return <AttendanceComponent data={attendance} />;
  }

  if (hasAttendanceError) {
    // Show error state
    return <ErrorComponent message={getDataError('attendance')} />;
  }

  // Show loading state
  return <LoadingComponent />;
}
```

## Adding New API Endpoints

To add a new API endpoint to the system:

1. **Create the API function** in `api.jsx`:
```javascript
export const fetchNewDataWithToken = async (token, signal) => {
  // Your API implementation
};
```

2. **Update DataContext** to include the new endpoint:
```javascript
const [appData, setAppData] = useState({
  attendance: null,
  results: null,
  endSemResults: null,
  timetable: null,
  newData: null, // Add your new endpoint
});

const [dataLoadingStatus, setDataLoadingStatus] = useState({
  attendance: 'pending',
  results: 'pending',
  endSemResults: 'pending',
  timetable: 'pending',
  newData: 'pending', // Add your new endpoint
});
```

3. **Add to load order** in `HomeScreen.jsx`:
```javascript
const API_LOAD_ORDER = [
  // ... existing endpoints
  {
    name: 'newData',
    displayName: 'New Data Description',
    apiFunction: fetchNewDataWithToken,
  },
];
```

## Configuration Options

### Loading Delay
Adjust the delay between API calls in `HomeScreen.jsx`:

```javascript
// Small delay between requests to avoid overwhelming the server
await new Promise(resolve => setTimeout(resolve, 500)); // Change 500ms to your preferred delay
```

### Error Handling
The system continues loading other endpoints even if one fails. You can modify this behavior by changing the error handling logic in the `loadAllDataSequentially` function.

### Retry Logic
Users can retry failed loads using the "Refresh All Data" button, or individual screens can implement their own retry logic.

## Current Loading Order

1. **Attendance Data** - Quick to load, shows user engagement
2. **Timetable Data** - Moderately quick, useful for daily planning
3. **Results Data** - Slower (up to 25 seconds), but important
4. **End Semester Results** - Additional academic data

This order prioritizes faster-loading, frequently-accessed data first, then loads the slower endpoints.