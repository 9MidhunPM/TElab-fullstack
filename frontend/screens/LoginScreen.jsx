import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../hooks/useTheme';
import styles from '../styles/loginScreenStyles';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { Colors, commonStyles } = useTheme();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setIsLoading(true);
    
    const result = await login(username.trim(), password);
    
    if (!result.success) {
      Alert.alert('Login Failed', result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
      <KeyboardAvoidingView 
        style={commonStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
        <Card variant="large" withMargin marginSize="large">
          <Card.Header>
            <Text style={commonStyles.title}>ETLab App</Text>
            <Text style={commonStyles.subtitle}>Enter your credentials to continue</Text>
          </Card.Header>
          
          <Card.Body>
            <Text style={commonStyles.label}>Username</Text>
            <TextInput
              style={commonStyles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              placeholderTextColor={Colors.placeholderText}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />

            <Text style={[commonStyles.label, { marginTop: 20 }]}>Password</Text>
            <TextInput
              style={commonStyles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={Colors.placeholderText}
              secureTextEntry
              editable={!isLoading}
            />

            <TouchableOpacity 
              style={[commonStyles.button, commonStyles.buttonPrimary, isLoading && commonStyles.buttonDisabled, { marginTop: 20 }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.white} size="small" />
              ) : (
                <Text style={commonStyles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </Card.Body>

          <Card variant="primary" withMargin>
            <Text style={commonStyles.infoText}>
              Use your university credentials to access your profile
            </Text>
          </Card>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

