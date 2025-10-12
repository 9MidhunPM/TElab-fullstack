/**
 * Dynamic Tabs Configuration
 * 
 * This file defines all tabs available in the app. To add a new tab:
 * 1. Create your component in screens/ directory (e.g., screens/NewScreen.jsx)
 * 2. Import it below
 * 3. Add an entry to the tabsConfig array
 * 
 * Example to add a new tab:
 * 
 * import NewScreen from '../screens/NewScreen';
 * 
 * Then add to tabsConfig:
 * { key: 'new', title: 'New Tab', component: NewScreen }
 */

import AttendanceScreen from '../screens/AttendanceScreen';
import EndSemResultsScreen from '../screens/EndSemResultsScreen';
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import TimetableScreen from '../screens/TimetableScreen';

/**
 * Tabs configuration array
 * Each tab must have: key (unique), title (display name), component, iconName
 */
export const tabsConfig = [
  {
    key: 'home',
    title: 'Home',
    component: HomeScreen,
    iconName: 'home',
  },
  {
    key: 'attendance',
    title: 'Attendance',
    component: AttendanceScreen,
    iconName: 'calendar',
  },
  {
    key: 'end-sem',
    title: 'End Sem',
    component: EndSemResultsScreen,
    iconName: 'school',
  },
  {
    key: 'results',
    title: 'Results',
    component: ResultsScreen,
    iconName: 'trophy',
  },
  {
    key: 'timetable',
    title: 'Timetable',
    component: TimetableScreen,
    iconName: 'time',
  },
  // TO ADD A NEW TAB: Add a line like this:
  // { key: 'your-key', title: 'Your Title', component: YourComponent, iconName: 'icon-name' },
];

export default tabsConfig;