// SVG icon implementation to replace MaterialIcons dependency

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleProp, TextStyle } from 'react-native';

// Define the available icon names
type IconSymbolName = 
  | 'house.fill' 
  | 'paperplane.fill' 
  | 'chevron.left.forwardslash.chevron.right' 
  | 'chevron.right';

/**
 * An icon component that uses SVG icons instead of Material Icons or SF Symbols.
 * This ensures a consistent look across platforms without external dependencies.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string;
  style?: StyleProp<TextStyle>;
}) {
  const renderIcon = () => {
    switch (name) {
      case 'house.fill':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 3L2 12H5V20H19V12H22L12 3Z"
              fill={color}
            />
          </Svg>
        );
      
      case 'paperplane.fill':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M2.01 21L23 12 2.01 3 2 10L17 12 2 14L2.01 21Z"
              fill={color}
            />
          </Svg>
        );
      
      case 'chevron.left.forwardslash.chevron.right':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6ZM14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6ZM11.5 8.5L12.5 8.5L12.5 15.5L11.5 15.5L11.5 8.5Z"
              fill={color}
            />
          </Svg>
        );
      
      case 'chevron.right':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"
              fill={color}
            />
          </Svg>
        );
      
      default:
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
              fill={color}
            />
          </Svg>
        );
    }
  };

  return renderIcon();
}
