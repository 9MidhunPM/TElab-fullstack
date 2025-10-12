import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, AppRegistry, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import TabIcon from './components/TabIcon';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginScreen from './screens/LoginScreen';
import { tabsConfig } from './tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// TabsNavigator component that renders all tabs dynamically
function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
          textTransform: 'none',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          elevation: 4,
          shadowColor: '#4F46E5',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
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
            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon 
                name={tab.key} 
                size={size || 24} 
                color={color} 
                focused={focused} 
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
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
          <ActivityIndicator size="large" color="#4F46E5" />
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
        <NavigationContainer independent={true}>
          <AuthNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaFull: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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