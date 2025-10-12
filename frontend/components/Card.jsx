import React, { useRef } from 'react';
import { Animated, Pressable, View } from 'react-native';
import cardStyles from '../styles/cardStyles';

/**
 * Reusable Card Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be displayed inside the card
 * @param {string} props.variant - Card style variant: 'default', 'small', 'large', 'flat', 'outlined', 'primary', 'success', 'warning', 'danger'
 * @param {string} props.spacing - Padding variant: 'compact', 'default', 'spacious'
 * @param {boolean} props.withMargin - Add bottom margin (default: false)
 * @param {string} props.marginSize - Margin size: 'default', 'large' (default: 'default')
 * @param {function} props.onPress - Function to call when card is pressed (makes card touchable)
 * @param {Object} props.style - Additional custom styles to apply
 * @param {Object} props.contentStyle - Additional styles for the content container
 * @param {boolean} props.disabled - Disable press interaction (default: false)
 * @param {string} props.testID - Test ID for testing
 * @param {string} props.accessibilityLabel - Accessibility label
 */
const Card = ({
  children,
  variant = 'default',
  spacing = 'default',
  withMargin = false,
  marginSize = 'default',
  onPress,
  style,
  contentStyle,
  disabled = false,
  testID,
  accessibilityLabel,
  ...rest
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Determine card style based on variant
  const getCardStyle = () => {
    const styles = [cardStyles.card];
    
    switch (variant) {
      case 'small':
        styles.push(cardStyles.cardSmall);
        break;
      case 'large':
        styles.push(cardStyles.cardLarge);
        break;
      case 'flat':
        styles.push(cardStyles.cardFlat);
        break;
      case 'outlined':
        styles.push(cardStyles.cardOutlined);
        break;
      case 'primary':
        styles.push(cardStyles.cardPrimary);
        break;
      case 'secondary':
        styles.push(cardStyles.cardSecondary);
        break;
      case 'accent':
        styles.push(cardStyles.cardAccent);
        break;
      case 'success':
        styles.push(cardStyles.cardSuccess);
        break;
      case 'warning':
        styles.push(cardStyles.cardWarning);
        break;
      case 'danger':
        styles.push(cardStyles.cardDanger);
        break;
      case 'pressable':
        styles.push(cardStyles.cardPressable);
        break;
      default:
        // Use base card style
        break;
    }
    
    // Apply spacing variants
    if (spacing === 'compact') {
      styles.push(cardStyles.cardCompact);
    } else if (spacing === 'spacious') {
      styles.push(cardStyles.cardSpacious);
    }
    
    // Apply margin if requested
    if (withMargin) {
      if (marginSize === 'large') {
        styles.push(cardStyles.cardWithMarginLarge);
      } else {
        styles.push(cardStyles.cardWithMargin);
      }
    }
    
    // Apply custom style
    if (style) {
      styles.push(style);
    }
    
    return styles;
  };
  
  // If onPress is provided, make the card touchable with scale animation
  if (onPress && !disabled) {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        {...rest}
      >
        <Animated.View
          style={[
            getCardStyle(),
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={contentStyle}>
            {children}
          </View>
        </Animated.View>
      </Pressable>
    );
  }
  
  // Otherwise, render a regular View
  return (
    <View
      style={getCardStyle()}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      {...rest}
    >
      <View style={contentStyle}>
        {children}
      </View>
    </View>
  );
};

/**
 * Card.Header - Semantic component for card header
 */
Card.Header = ({ children, style }) => (
  <View style={[cardStyles.cardHeader, style]}>
    {children}
  </View>
);

/**
 * Card.Body - Semantic component for card body
 */
Card.Body = ({ children, style }) => (
  <View style={[cardStyles.cardBody, style]}>
    {children}
  </View>
);

/**
 * Card.Footer - Semantic component for card footer
 */
Card.Footer = ({ children, style }) => (
  <View style={[cardStyles.cardFooter, style]}>
    {children}
  </View>
);

export default Card;
