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
      <ScrollView style={commonStyles.container} contentContainerStyle={styles.contentContainer}>
      
      <Card variant="secondary" withMargin marginSize="large">
        <Card.Header>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.nameText}>{user.name}</Text>
        </Card.Header>
      </Card>

      <Card variant="large" withMargin marginSize="large">
        <Card.Header>
          <Text style={commonStyles.cardTitle}>Profile Information</Text>
        </Card.Header>
        
        <Card.Body>
          <Text style={styles.infoLabel}>SR Number:</Text>
          <Text style={styles.infoValue}>{user.srNumber}</Text>

          <Text style={[styles.infoLabel, { marginTop: 16 }]}>Name:</Text>
          <Text style={styles.infoValue}>{user.name}</Text>

          <Text style={[styles.infoLabel, { marginTop: 16 }]}>Mobile Number:</Text>
          <Text style={styles.infoValue}>{user.mobileNumber}</Text>

          <Text style={[styles.infoLabel, { marginTop: 16 }]}>University Reg No:</Text>
          <Text style={styles.infoValue}>{user.universityRegNo}</Text>
        </Card.Body>
      </Card>

      <TouchableOpacity 
        style={[commonStyles.button, commonStyles.buttonDanger, { marginHorizontal: 20 }]}
        onPress={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <LogoutIcon size={20} color="#fff" />
            <Text style={commonStyles.buttonText}>Logout</Text>
          </View>
        )}
      </TouchableOpacity>

      <Card variant="primary" withMargin marginSize="large" style={{ marginTop: 20 }}>
        <Text style={commonStyles.infoText}>
          This profile data was fetched using your current session token.
        </Text>
      </Card>
    </ScrollView>
    </SafeAreaView>
  );
}