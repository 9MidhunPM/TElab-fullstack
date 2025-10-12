import { Ionicons } from '@expo/vector-icons';

// Static icon mapping - no dynamic string concatenation
export const TabIcons = {
  home: {
    focused: (props) => <Ionicons name="home" {...props} />,
    unfocused: (props) => <Ionicons name="home-outline" {...props} />,
  },
  attendance: {
    focused: (props) => <Ionicons name="calendar" {...props} />,
    unfocused: (props) => <Ionicons name="calendar-outline" {...props} />,
  },
  'end-sem': {
    focused: (props) => <Ionicons name="school" {...props} />,
    unfocused: (props) => <Ionicons name="school-outline" {...props} />,
  },
  results: {
    focused: (props) => <Ionicons name="trophy" {...props} />,
    unfocused: (props) => <Ionicons name="trophy-outline" {...props} />,
  },
  timetable: {
    focused: (props) => <Ionicons name="time" {...props} />,
    unfocused: (props) => <Ionicons name="time-outline" {...props} />,
  },
};

// Helper function to get the right icon
export const getTabIcon = (tabKey, focused, color, size = 24) => {
  const IconComponent = focused 
    ? TabIcons[tabKey]?.focused 
    : TabIcons[tabKey]?.unfocused;
  
  return IconComponent ? IconComponent({ color, size }) : null;
};
