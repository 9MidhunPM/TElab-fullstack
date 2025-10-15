import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowBackIcon, CalendarIcon, SendIcon, TrophyIcon } from '../components/icons/SvgIcons';
import { useAppData } from '../contexts/DataContext';
import styles from '../styles/aiScreenStyles';
import commonStyles, { Colors } from '../styles/commonStyles';
import { markdownStyles } from '../styles/markdownStyles';
import { sendAIRequest } from '../utils/aiApi';

/**
 * AI Assistant Screen
 * Provides an interface for users to query AI about their attendance or results data
 */
export default function AIScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState('attendance');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  
  const { appData } = useAppData();

  // Animation values
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Entry animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Navigation handlers with exit animation
  const handleGoBack = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
    });
  };

  // AI request handler
  const handleAIRequest = async (requestQuery) => {
    setIsLoading(true);
    setResponse('');
    
    try {
      const responseText = await sendAIRequest(requestQuery, queryType, appData);
      setResponse(responseText);
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to get AI response. Please check your connection and try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Button action handlers
  const handleAttendanceSummary = async () => {
    setIsLoading(true);
    setResponse('');
    
    try {
      // Force attendance data type for this request
      const responseText = await sendAIRequest('Attendance summary', 'attendance', appData);
      setResponse(responseText);
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to get AI response. Please check your connection and try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultsSummary = async () => {
    setIsLoading(true);
    setResponse('');
    
    try {
      // Force results data type for this request
      const responseText = await sendAIRequest('Results summary', 'results', appData);
      setResponse(responseText);
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to get AI response. Please check your connection and try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomQuery = () => {
    if (!query.trim()) {
      Alert.alert('Error', 'Please enter a query first.');
      return;
    }
    handleAIRequest(query);
  };

  return (
    <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: Colors.background }]}>
      <Animated.View 
        style={[
          styles.animatedContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
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

      {/* Query Type Toggle Slider */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, queryType === 'attendance' && styles.toggleButtonActive]}
          onPress={() => setQueryType('attendance')}
          activeOpacity={0.8}
        >
          <CalendarIcon size={20} color={queryType === 'attendance' ? 'white' : Colors.primary} />
          <Text style={[styles.toggleButtonText, queryType === 'attendance' && styles.toggleButtonTextActive]}>
            Attendance
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.toggleButton, queryType === 'results' && styles.toggleButtonActive]}
          onPress={() => setQueryType('results')}
          activeOpacity={0.8}
        >
          <TrophyIcon size={20} color={queryType === 'results' ? 'white' : Colors.primary} />
          <Text style={[styles.toggleButtonText, queryType === 'results' && styles.toggleButtonTextActive]}>
            Results
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Response Area */}
      <ScrollView 
        style={styles.responseScrollContainer} 
        contentContainerStyle={styles.responseScrollContent}
        showsVerticalScrollIndicator={false}
      >
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
              <Markdown style={markdownStyles}>
                {response}
              </Markdown>
            </View>
          </View>
        ) : !isLoading ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              Ask me anything about your {queryType === 'attendance' ? 'attendance' : 'results'}!
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Type a question or use the quick action buttons below
            </Text>
          </View>
        ) : null}
      </ScrollView>

      {/* Fixed Bottom Input Area */}
      <View style={styles.bottomInputContainer}>
        {/* Text Input with Action Buttons */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your question here..."
            placeholderTextColor={Colors.textSecondary}
            value={query}
            onChangeText={setQuery}
            multiline
            maxLength={500}
            editable={!isLoading}
          />
          
          {/* Quick Action Buttons */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleAttendanceSummary}
            disabled={isLoading}
            activeOpacity={0.7}
          >
            <CalendarIcon size={22} color={Colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleResultsSummary}
            disabled={isLoading}
            activeOpacity={0.7}
          >
            <TrophyIcon size={22} color={Colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
            onPress={handleCustomQuery}
            disabled={isLoading}
            activeOpacity={0.7}
          >
            <SendIcon size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      </Animated.View>
    </SafeAreaView>
  );
}