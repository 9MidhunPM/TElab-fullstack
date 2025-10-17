import { TouchableOpacity } from 'react-native';
import { toggleThemeMode } from '../constants/colors';
import { useTheme } from '../hooks/useTheme';
import { MoonIcon, SunIcon } from './icons/SvgIcons';

export default function ThemeToggleButton({ size = 24, onPress }) {
  const { Colors, isDarkMode } = useTheme();

  const handlePress = () => {
    // Toggle the theme
    toggleThemeMode();
    
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {isDarkMode ? (
        <SunIcon size={size} color={Colors.warning} />
      ) : (
        <MoonIcon size={size} color={Colors.primary} />
      )}
    </TouchableOpacity>
  );
}
