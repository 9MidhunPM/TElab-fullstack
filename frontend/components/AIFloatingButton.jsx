import { TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';
import { ChatIcon } from './icons/SvgIcons';

export default function AIFloatingButton({ onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <ChatIcon size={28} color={Colors.aiIconOnButton} />
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    position: 'absolute',
    bottom: 100, // Above tab bar
    right: 20,
    zIndex: 1000,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: Colors.shadowBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
};