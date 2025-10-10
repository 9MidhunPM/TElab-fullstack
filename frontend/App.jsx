import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, AppRegistry, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginScreen from './screens/LoginScreen';
import { tabsConfig } from './tabs';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

// TabsNavigator component that renders all tabs dynamically
function TabsNavigator() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#666',
          tabBarIndicatorStyle: {
            backgroundColor: '#007AFF',
            height: 3,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            textTransform: 'none',
          },
          tabBarStyle: {
            backgroundColor: '#fff',
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          swipeEnabled: true, // Enable swipe gestures
          animationEnabled: true,
        }}
        initialRouteName={tabsConfig[0]?.key || 'home'}
      >
        {/* Dynamically render tabs from configuration */}
        {tabsConfig.map((tab) => (
          <Tab.Screen
            key={tab.key}
            name={tab.key}
            component={tab.component}
            options={{
              title: tab.title,
              tabBarAccessibilityLabel: `${tab.title} tab`,
            }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
}

// AuthNavigator component that handles conditional rendering
function AuthNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeAreaFull}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // User is authenticated - show tabs interface
        <Stack.Screen name="MainTabs" component={TabsNavigator} />
      ) : (
        // User is not authenticated - show login screen
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

// Main App component
function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <AuthNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeAreaFull: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Register the app component
AppRegistry.registerComponent('main', () => App);

export default App;