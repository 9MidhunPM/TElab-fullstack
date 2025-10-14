import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import { useAppData } from '../contexts/DataContext';
import { ArrowBackIcon, SendIcon, CalendarIcon, TrophyIcon } from '../components/icons/SvgIcons';
import commonStyles, { Colors } from '../styles/commonStyles';
import styles from '../styles/aiScreenStyles';

const AI_BASE_URL = Constants.expoConfig?.extra?.AI_BASE_URL || process.env.EXPO_PUBLIC_AI_BASE_URL || 'https://your-ai-api-endpoint.com';

export default function AIScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState('attendance');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  
  const { appData } = useAppData();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const prepareData = (type) => {
    if (type === 'attendance') {
      return appData.attendance || {};
    } else if (type === 'results') {
      return appData.results || {};
    }
    return {};
  };

  const sendAIRequest = async (requestQuery) => {
    setIsLoading(true);
    setResponse('');
    
    try {
      const data = prepareData(queryType);
      
      const requestBody = {
        data: data,
        query: requestQuery
      };

      console.log('AI Request - URL:', `${AI_BASE_URL}/api/ai-query`);
      console.log('AI Request - Body:', JSON.stringify(requestBody, null, 2));
      console.log('AI Request - Query Type:', queryType);
      console.log('AI Request - Data Keys:', Object.keys(data));

      const response = await fetch(`${AI_BASE_URL}/api/ai-query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('AI Response - Status:', response.status);
      console.log('AI Response - Status Text:', response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('AI Response - Result:', result);
      setResponse(result.response || 'No response received');
      
    } catch (error) {
      console.error('AI Request Error:', error);
      Alert.alert(
        'Error',
        'Failed to get AI response. Please check your connection and try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttendanceSummary = () => {
    sendAIRequest('Attendance summary');
  };

  const handleResultsSummary = () => {
    sendAIRequest('Results summary');
  };

  const handleCustomQuery = () => {
    if (!query.trim()) {
      Alert.alert('Error', 'Please enter a query first.');
      return;
    }
    sendAIRequest(query);
  };

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: Colors.background }]}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleGoBack}
          activeOpacity={0.7}
        >
          <ArrowBackIcon size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Assistant</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Query Type Selector */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Query Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={queryType}
              onValueChange={(itemValue) => setQueryType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Attendance Related Queries" value="attendance" />
              <Picker.Item label="Results Based Queries" value="results" />
            </Picker>
          </View>
        </View>

        {/* Text Input Area */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Enter Your Query</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Type your question here..."
            placeholderTextColor={Colors.textSecondary}
            value={query}
            onChangeText={setQuery}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={handleCustomQuery}
            disabled={isLoading}
            activeOpacity={0.7}
          >
            <SendIcon size={20} color="white" />
            <Text style={styles.primaryButtonText}>Send Query</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleAttendanceSummary}
            disabled={isLoading}
            activeOpacity={0.7}
          >
            <CalendarIcon size={20} color={Colors.primary} />
            <Text style={styles.secondaryButtonText}>Attendance Summary</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleResultsSummary}
            disabled={isLoading}
            activeOpacity={0.7}
          >
            <TrophyIcon size={20} color={Colors.primary} />
            <Text style={styles.secondaryButtonText}>Results Summary</Text>
          </TouchableOpacity>
        </View>

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Getting AI response...</Text>
          </View>
        )}

        {/* Response Area */}
        {response ? (
          <View style={styles.responseContainer}>
            <Text style={styles.responseTitle}>AI Response:</Text>
            <View style={styles.responseBox}>
              <Text style={styles.responseText}>{response}</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}