# ETLab App - Adding New Components as Tabs

## How to Add a New Component as a Tab

The app is designed for easy extension. To add any new component as a swipeable tab, follow these simple steps:

### Step 1: Create Your Component

Create your new component in the `screens/` directory:

```jsx
// screens/YourNewScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function YourNewScreen() {
  const { user, token } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your New Feature</Text>
      {/* Your component content here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
```

### Step 2: Add to Tabs Configuration

Open `tabs/index.jsx` and add **one line** to register your new component:

```jsx
// tabs/index.jsx
import HomeScreen from '../screens/HomeScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import YourNewScreen from '../screens/YourNewScreen'; // Import your component

export const tabsConfig = [
  { key: 'home', title: 'Home', component: HomeScreen },
  { key: 'attendance', title: 'Attendance', component: AttendanceScreen },
  { key: 'yournew', title: 'Your Tab', component: YourNewScreen }, // Add this line
];
```

### That's it! 

Your new component will automatically:
- ✅ Appear as a swipeable tab
- ✅ Support left/right swipe navigation
- ✅ Have proper tab styling and animations
- ✅ Be accessible with proper labels

## Example: Adding a Grades Component

Here's a complete example of adding a grades component:

### 1. Create the component (`screens/GradesScreen.jsx`):

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { fetchGradesWithToken } from '../api'; // You'd add this to api.jsx

export default function GradesScreen() {
  const [grades, setGrades] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchGrades();
    }
  }, [token]);

  const fetchGrades = async () => {
    setIsLoading(true);
    try {
      const gradesData = await fetchGradesWithToken(token);
      setGrades(gradesData);
    } catch (error) {
      console.error('Failed to fetch grades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading grades...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Academic Grades</Text>
      {/* Render grades data */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', padding: 20 },
});
```

### 2. Add to tabs configuration:

```jsx
// tabs/index.jsx
import GradesScreen from '../screens/GradesScreen';

export const tabsConfig = [
  { key: 'home', title: 'Home', component: HomeScreen },
  { key: 'attendance', title: 'Attendance', component: AttendanceScreen },
  { key: 'grades', title: 'Grades', component: GradesScreen }, // Just add this line!
];
```

## Tab Configuration Options

Each tab entry supports these properties:

```jsx
{
  key: 'unique-key',        // Unique identifier (required)
  title: 'Display Name',    // Tab title shown to user (required)
  component: YourComponent, // React component (required)
}
```

## Best Practices

1. **Component Names**: Use descriptive names ending with "Screen" (e.g., `GradesScreen.jsx`)

2. **Tab Keys**: Use lowercase, hyphenated keys (e.g., `'user-profile'`, `'course-schedule'`)

3. **Tab Titles**: Keep titles short and descriptive (e.g., "Grades", "Schedule", "Profile")

4. **Authentication**: Always use the `useAuth` hook to access `token` and `user` data

5. **API Calls**: Follow the pattern of using fresh tokens and AbortController for cancellation

6. **Loading States**: Include loading indicators and error handling

7. **Styling**: Use consistent styling patterns with the existing screens

## Advanced Features

### Adding Icons to Tabs

To add icons to tabs, you can extend the tab configuration:

```jsx
// In tabs/index.jsx
import { Ionicons } from '@expo/vector-icons';

export const tabsConfig = [
  { 
    key: 'home', 
    title: 'Home', 
    component: HomeScreen,
    icon: 'home-outline'
  },
  // ... other tabs
];
```

Then update the `App.jsx` to use the icon in tab options.

### Tab-Specific Styling

You can add tab-specific styling options to the configuration:

```jsx
{
  key: 'special',
  title: 'Special',
  component: SpecialScreen,
  tabBarOptions: {
    activeTintColor: '#ff6b6b',
    // custom options for this tab
  }
}
```

## Current Tabs

The app currently includes:

1. **Home** - User profile and basic information
2. **Attendance** - Subject-wise attendance tracking with summary

Any new tabs will be added alongside these existing tabs in the swipeable interface.