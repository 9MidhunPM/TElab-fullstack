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
 * Each tab must have: key (unique), title (display name), component
 */
export const tabsConfig = [
  {
    key: 'home',
    title: 'Home',
    component: HomeScreen,
  },
  {
    key: 'attendance',
    title: 'Attendance',
    component: AttendanceScreen,
  },
  {
    key: 'end-sem',
    title: 'End Sem',
    component: EndSemResultsScreen,
  },
  {
    key: 'results',
    title: 'Results',
    component: ResultsScreen,
  },
  {
    key: 'timetable',
    title: 'Timetable',
    component: TimetableScreen,
  },
  // TO ADD A NEW TAB: Add a line like this:
  // { key: 'your-key', title: 'Your Title', component: YourComponent },
];

export default tabsConfig;