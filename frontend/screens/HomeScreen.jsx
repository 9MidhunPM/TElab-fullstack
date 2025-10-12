import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import LogoutIcon from '../components/LogoutIcon';
import { useAuth } from '../contexts/AuthContext';
import commonStyles from '../styles/commonStyles';
import styles from '../styles/homeScreenStyles';

export default function HomeScreen() {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={commonStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={commonStyles.loadingText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={commonStyles.errorContainer}>
        <Text style={commonStyles.errorText}>No user data available</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      {/* Header with Welcome text and Logout button */}
      <View style={styles.header}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.nameText}>{user.name}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutIconButton}
          onPress={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#EF4444" size="small" />
          ) : (
            <LogoutIcon size={24} color="#EF4444" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.container} contentContainerStyle={styles.contentContainer}>
        {/* Compact Profile Information */}
        <Card variant="default" withMargin marginSize="medium">
          <Card.Header>
            <Text style={commonStyles.cardTitle}>Profile Information</Text>
          </Card.Header>
          
          <Card.Body>
            <View style={styles.compactInfoRow}>
              <Text style={styles.compactInfoLabel}>SR Number:</Text>
              <Text style={styles.compactInfoValue}>{user.srNumber}</Text>
            </View>

            <View style={styles.compactInfoRow}>
              <Text style={styles.compactInfoLabel}>Mobile:</Text>
              <Text style={styles.compactInfoValue}>{user.mobileNumber}</Text>
            </View>

            <View style={styles.compactInfoRow}>
              <Text style={styles.compactInfoLabel}>University Reg No:</Text>
              <Text style={styles.compactInfoValue}>{user.universityRegNo}</Text>
            </View>
          </Card.Body>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}