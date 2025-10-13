/**
 * Utility functions for processing next class information from timetable data
 */

// Period timings mapping
const PERIOD_TIMINGS = {
  1: { start: "09:00", end: "10:00", display: "9:00 - 10:00 AM" },
  2: { start: "10:00", end: "10:45", display: "10:00 - 10:45 AM" },
  3: { start: "11:00", end: "12:00", display: "11:00 - 12:00 PM" },
  4: { start: "12:00", end: "12:45", display: "12:00 - 12:45 PM" },
  5: { start: "13:30", end: "14:30", display: "1:30 - 2:30 PM" },
  6: { start: "14:30", end: "15:30", display: "2:30 - 3:30 PM" },
  7: { start: "15:45", end: "16:20", display: "3:45 - 4:20 PM" }
};

// Days of the week
const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

/**
 * Convert time string to minutes since midnight for comparison
 */
const timeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Get current time in HH:MM format
 */
const getCurrentTimeString = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};

/**
 * Format time for display
 */
const formatCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

/**
 * Get current day name in lowercase
 */
const getCurrentDay = () => {
  const now = new Date();
  return DAYS[now.getDay()];
};

/**
 * Get periods for a specific day from timetable data
 */
const getPeriodsForDay = (dayData) => {
  if (!dayData) return [];
  
  const periods = [];
  for (let i = 1; i <= 7; i++) {
    const key1 = `period-${i}`;
    const key2 = `period${i}`;
    const periodData = dayData[key1] || dayData[key2] || null;
    
    periods.push({
      number: i,
      data: periodData,
      timing: PERIOD_TIMINGS[i]
    });
  }
  return periods;
};

/**
 * Check if a class is currently ongoing
 */
const isClassOngoing = (period, currentTimeMinutes) => {
  const startMinutes = timeToMinutes(period.timing.start);
  const endMinutes = timeToMinutes(period.timing.end);
  
  return currentTimeMinutes >= startMinutes && currentTimeMinutes < endMinutes;
};

/**
 * Check if a class is upcoming (hasn't started yet)
 */
const isClassUpcoming = (period, currentTimeMinutes) => {
  const startMinutes = timeToMinutes(period.timing.start);
  return currentTimeMinutes < startMinutes;
};

/**
 * Format class information for display
 */
const formatClassInfo = (period) => {
  if (!period || !period.data) {
    return {
      subject: 'Free Period',
      teacher: null,
      timing: period?.timing?.display || '',
      isFree: true
    };
  }

  return {
    subject: period.data.name || 'Free Period',
    teacher: period.data.teacher || null,
    timing: period.timing.display,
    isFree: !period.data.name || period.data.name.toLowerCase().includes('free')
  };
};

/**
 * Get next class information based on current time and timetable
 */
export const getNextClassInfo = (timetableData) => {
  if (!timetableData) {
    return null;
  }

  const currentDay = getCurrentDay();
  const currentTimeString = getCurrentTimeString();
  const currentTimeMinutes = timeToMinutes(currentTimeString);
  const currentTimeDisplay = formatCurrentTime();

  // Skip weekends
  if (currentDay === 'sunday' || currentDay === 'saturday') {
    return {
      currentClass: null,
      nextClass: null,
      isClassOngoing: false,
      showTomorrowSchedule: true,
      currentTime: currentTimeDisplay
    };
  }

  const todayData = timetableData[currentDay];
  const todayPeriods = getPeriodsForDay(todayData);

  let currentClass = null;
  let nextClass = null;
  let isOngoing = false;

  // Check for current ongoing class
  for (const period of todayPeriods) {
    if (isClassOngoing(period, currentTimeMinutes)) {
      currentClass = formatClassInfo(period);
      isOngoing = true;
      break;
    }
  }

  // Find next upcoming class
  for (const period of todayPeriods) {
    if (isClassUpcoming(period, currentTimeMinutes)) {
      nextClass = formatClassInfo(period);
      break;
    }
  }

  // If no more classes today, suggest tomorrow's schedule
  const showTomorrowSchedule = !isOngoing && !nextClass;

  return {
    currentClass,
    nextClass,
    isClassOngoing: isOngoing,
    showTomorrowSchedule,
    currentTime: currentTimeDisplay
  };
};

/**
 * Get a preview of tomorrow's first class (optional enhancement)
 */
export const getTomorrowFirstClass = (timetableData) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDay = DAYS[tomorrow.getDay()];

  if (tomorrowDay === 'sunday' || tomorrowDay === 'saturday') {
    return null;
  }

  const tomorrowData = timetableData[tomorrowDay];
  const tomorrowPeriods = getPeriodsForDay(tomorrowData);

  // Find first non-free class
  for (const period of tomorrowPeriods) {
    if (period.data && period.data.name && !period.data.name.toLowerCase().includes('free')) {
      return formatClassInfo(period);
    }
  }

  return null;
};