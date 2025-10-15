import { CalendarIcon, HomeIcon, SchoolIcon, TimeIcon, TrophyIcon } from './icons/SvgIcons';

// Static icon mapping - no dynamic string concatenation
export const TabIcons = {
  home: {
    focused: (props) => <HomeIcon {...props} outline={false} />,
    unfocused: (props) => <HomeIcon {...props} outline={true} />,
  },
  attendance: {
    focused: (props) => <CalendarIcon {...props} outline={false} />,
    unfocused: (props) => <CalendarIcon {...props} outline={true} />,
  },
  'end-sem': {
    focused: (props) => <SchoolIcon {...props} outline={false} />,
    unfocused: (props) => <SchoolIcon {...props} outline={true} />,
  },
  results: {
    focused: (props) => <TrophyIcon {...props} outline={false} />,
    unfocused: (props) => <TrophyIcon {...props} outline={true} />,
  },
  timetable: {
    focused: (props) => <TimeIcon {...props} outline={false} />,
    unfocused: (props) => <TimeIcon {...props} outline={true} />,
  },
};

// Helper function to get the right icon
export const getTabIcon = (tabKey, focused, color, size = 24) => {
  const IconComponent = focused 
    ? TabIcons[tabKey]?.focused 
    : TabIcons[tabKey]?.unfocused;
  
  return IconComponent ? IconComponent({ color, size }) : null;
};
