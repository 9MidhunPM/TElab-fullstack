import { Alert, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { MoonIcon, SunIcon } from './icons/SvgIcons';

export default function ThemeToggleButton({ size = 24, onPress }) {
  // Check current theme based on Colors.background
  const isDarkMode = Colors.background === '#000000';

  const handlePress = () => {
    Alert.alert(
      'Switch Theme',
      `Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode?\n\nNote: You'll need to restart the app for changes to take effect.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Switch Theme',
          onPress: () => {
            Alert.alert(
              'Manual Theme Switch Required',
              'To switch themes:\n\n1. Open constants/colors.js\n2. Find line 196\n3. Change "export const Colors = DarkColors" to "export const Colors = LightColors" (or vice versa)\n4. Save the file\n5. Reload the app',
              [{ text: 'OK' }]
            );
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={onPress || handlePress}>
      {isDarkMode ? (
        <SunIcon size={size} color={Colors.warning} />
      ) : (
        <MoonIcon size={size} color={Colors.primary} />
      )}
    </TouchableOpacity>
  );
}
