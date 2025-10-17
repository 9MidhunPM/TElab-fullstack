import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, AppRegistry, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AIFloatingButton from './components/AIFloatingButton';
import TabIcon from './components/TabIcon';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { useTheme } from './hooks/useTheme';
import AIScreen from './screens/AIScreen';
import LoginScreen from './screens/LoginScreen';
import { tabsConfig } from './tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// TabsNavigator component that renders all tabs dynamically
function TabsNavigator({ navigation }) {
  const { Colors } = useTheme();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={['bottom']}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.tabInactive,
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            textTransform: 'none',
          },
          tabBarStyle: {
            backgroundColor: Colors.cardBackground,
            borderTopWidth: 1,
            borderTopColor: Colors.border,
            elevation: 4,
            shadowColor: Colors.shadow,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            height: 75,
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
      
      {/* Floating AI Button */}
      <AIFloatingButton 
        onPress={() => navigation.navigate('AIScreen')} 
      />
    </SafeAreaView>
  );
}

// AuthNavigator component that handles conditional rendering
function AuthNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  const { Colors } = useTheme();

  // Show loading spinner while checking authentication state
  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={['top']}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.spinner} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // User is authenticated - show tabs interface and AI screen
        <>
          <Stack.Screen name="MainTabs" component={TabsNavigator} />
          <Stack.Screen 
            name="AIScreen" 
            component={AIScreen}
            options={{
              presentation: 'modal',
              gestureEnabled: true,
            }}
          />
        </>
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
        <DataProvider>
          <NavigationContainer independent={true}>
            <AuthNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </DataProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

// Register the app component
AppRegistry.registerComponent('main', () => App);

export default App;