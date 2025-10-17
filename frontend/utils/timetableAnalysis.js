/**
 * Timetable Analysis Utilities
 * 
 * This file contains utility functions for analyzing timetable data:
 * - Calculate classes per subject per week
 * - Calculate classes per subject up to a specific date
 */

/**
 * Extracts and counts the number of classes for each subject per week from timetable data
 * 
 * @param {Object} timetableData - The timetable data object containing days and periods
 * @returns {Object} Object with subject names as keys and weekly class counts as values
 * 
 * Example return:
 * {
 *   "Mathematics": 4,
 *   "Physics": 3,
 *   "Chemistry": 2,
 *   "English": 1
 * }
 */
export const getSubjectClassesPerWeek = (timetableData) => {
  if (!timetableData || typeof timetableData !== 'object') {
    return {};
  }

  const subjectCounts = {};
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  days.forEach(day => {
    const dayData = timetableData[day];
    if (!dayData) return;

    // Get periods for the day (handling both period-1 and period1 formats)
    for (let i = 1; i <= 7; i++) {
      const key1 = `period-${i}`;
      const key2 = `period${i}`;
      const periodData = dayData[key1] || dayData[key2];

      if (periodData && periodData.name) {
        let subjectName = periodData.name.trim();
        
        // Skip free periods or empty subjects
        if (!subjectName || subjectName.toLowerCase().includes('free')) {
          continue;
        }

        // Apply hardcoded mappings
        subjectName = applyHardcodedMappings(subjectName, day, i);
        
        // Skip if mapping resulted in null (means ignore this period)
        if (!subjectName) {
          continue;
        }

        // Count the subject
        if (subjectCounts[subjectName]) {
          subjectCounts[subjectName]++;
        } else {
          subjectCounts[subjectName] = 1;
        }
      }
    }
  });

  return subjectCounts;
};

const applyHardcodedMappings = (subjectName, day, period) => {
  const nameLower = subjectName.toLowerCase();
  
  // Wednesday Period 7: TA -> Skill course period (SC3)
  if (day === 'wednesday' && period === 7 && nameLower.includes('ta')) {
    return 'Skill course';
  }
  
  // Friday Period 4: TA,SGA -> SGA (remove TA part)
  if (day === 'friday' && period === 4) {
    if (nameLower.includes('ta') && nameLower.includes('sga')) {
      return 'SGA';
    }
  }
  
  // Hardware Lab -> Hardware Lab (will be mapped to 24CSL307 in attendance matching)
  if (nameLower.includes('hardware lab')) {
    return 'Hardware Lab';
  }
  
  return subjectName;
};

/**
 * Calculates the number of classes for each subject up to a particular date
 * 
 * @param {Object} timetableData - The timetable data object containing days and periods
 * @param {Date|string} targetDate - The target date up to which to count classes
 * @param {Date|string} startDate - The start date from which to begin counting (optional, defaults to current semester start)
 * @returns {Object} Object with subject names as keys and total class counts up to target date as values
 * 
 * Example return:
 * {
 *   "Mathematics": 24,
 *   "Physics": 18,
 *   "Chemistry": 12,
 *   "English": 6
 * }
 */
export const getSubjectClassesUpToDate = (timetableData, targetDate, startDate = null) => {
  if (!timetableData || typeof timetableData !== 'object') {
    return {};
  }

  // Convert dates to Date objects if they're strings
  const target = new Date(targetDate);
  const start = startDate ? new Date(startDate) : getDefaultSemesterStart();

  if (isNaN(target.getTime()) || isNaN(start.getTime())) {
    console.error('Invalid date provided to getSubjectClassesUpToDate');
    return {};
  }

  if (target < start) {
    console.warn('Target date is before start date');
    return {};
  }

  // Get weekly class counts
  const weeklyClassCounts = getSubjectClassesPerWeek(timetableData);
  
  // Calculate total weeks between start and target date
  const totalDays = Math.floor((target - start) / (1000 * 60 * 60 * 24)) + 1; // +1 to include target date
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  const subjectTotals = {};

  // Calculate classes for complete weeks
  Object.entries(weeklyClassCounts).forEach(([subject, weeklyCount]) => {
    subjectTotals[subject] = weeklyCount * totalWeeks;
  });

  // Add classes from remaining days (if any)
  if (remainingDays > 0) {
    const remainingDaysCounts = getSubjectClassesForDays(timetableData, start, remainingDays, totalWeeks);
    
    Object.entries(remainingDaysCounts).forEach(([subject, additionalCount]) => {
      if (subjectTotals[subject]) {
        subjectTotals[subject] += additionalCount;
      } else {
        subjectTotals[subject] = additionalCount;
      }
    });
  }

  return subjectTotals;
};

/**
 * Helper function to get classes for specific remaining days in a week
 * 
 * @param {Object} timetableData - The timetable data
 * @param {Date} startDate - The semester start date
 * @param {number} remainingDays - Number of remaining days to count
 * @param {number} weeksPassed - Number of complete weeks that have passed
 * @returns {Object} Subject counts for the remaining days
 */
const getSubjectClassesForDays = (timetableData, startDate, remainingDays, weeksPassed) => {
  const subjectCounts = {};
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Calculate which day of the week the start date falls on
  const startDayIndex = startDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Adjust for our days array (Monday = 0, Tuesday = 1, etc.)
  const adjustedStartDay = startDayIndex === 0 ? 6 : startDayIndex - 1; // Convert Sunday to index 6
  
  // Count classes for the remaining days
  for (let i = 0; i < remainingDays; i++) {
    const currentDayIndex = (adjustedStartDay + (weeksPassed * 7) + i) % 7;
    const dayName = days[currentDayIndex];
    
    // Skip Sunday as it's typically not in timetable
    if (dayName === 'sunday') continue;
    
    const dayData = timetableData[dayName];
    if (!dayData) continue;

    // Count periods for this day
    for (let periodNum = 1; periodNum <= 7; periodNum++) {
      const key1 = `period-${periodNum}`;
      const key2 = `period${periodNum}`;
      const periodData = dayData[key1] || dayData[key2];

      if (periodData && periodData.name) {
        const subjectName = periodData.name.trim();
        
        // Skip free periods
        if (!subjectName || subjectName.toLowerCase().includes('free')) {
          continue;
        }

        if (subjectCounts[subjectName]) {
          subjectCounts[subjectName]++;
        } else {
          subjectCounts[subjectName] = 1;
        }
      }
    }
  }

  return subjectCounts;
};

/**
 * Helper function to get a reasonable default semester start date
 * This assumes a typical academic calendar - you may want to adjust this based on your institution
 * 
 * @returns {Date} Default semester start date
 */
const getDefaultSemesterStart = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed

  // Simple logic: if we're in Jan-May, assume spring semester started in January
  // If we're in Aug-Dec, assume fall semester started in August
  if (currentMonth >= 0 && currentMonth <= 4) {
    // Spring semester - assume it started in January
    return new Date(currentYear, 0, 15); // January 15th
  } else if (currentMonth >= 7 && currentMonth <= 11) {
    // Fall semester - assume it started in August
    return new Date(currentYear, 7, 15); // August 15th
  } else {
    // Summer or transition period - use a reasonable default
    return new Date(currentYear, 0, 15); // January 15th
  }
};

/**
 * Utility function to format the results in a more readable way
 * 
 * @param {Object} subjectCounts - Object with subject names and counts
 * @param {string} type - Type of count ('weekly' or 'total')
 * @returns {Array} Array of formatted objects with subject info
 */
export const formatSubjectCounts = (subjectCounts, type = 'weekly') => {
  return Object.entries(subjectCounts)
    .map(([subject, count]) => ({
      subject,
      count,
      displayText: `${subject}: ${count} ${type === 'weekly' ? 'classes per week' : 'total classes'}`
    }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
};

/**
 * Get total classes from attendance data by matching subject names with attendance codes
 * 
 * @param {Object} timetableData - The timetable data object
 * @param {Object} attendanceData - The attendance data object
 * @returns {Object} Object with subject names as keys and total class counts from attendance as values
 */
export const getSubjectClassesFromAttendance = (timetableData, attendanceData) => {
  if (!timetableData || !attendanceData || typeof timetableData !== 'object' || typeof attendanceData !== 'object') {
    return {};
  }

  // Get all unique subjects from timetable
  const weeklyClasses = getSubjectClassesPerWeek(timetableData);
  const timetableSubjects = Object.keys(weeklyClasses);

  // Extract subject codes and their total hours from attendance data
  const excludeKeys = ['roll_no', 'total_hours', 'total_present_hours', 'total_percentage', 'university_reg_no', 'name', 'note'];
  const attendanceSubjects = {};
  
  Object.entries(attendanceData)
    .filter(([key]) => !excludeKeys.includes(key))
    .forEach(([code, data]) => {
      attendanceSubjects[code] = {
        code,
        totalHours: parseInt(data.total_hours) || 0,
        presentHours: parseInt(data.present_hours) || 0,
        percentage: data.attendance_percentage
      };
    });

  // Create mapping between timetable subject names and attendance codes
  const subjectMapping = createSubjectMapping(timetableSubjects, Object.keys(attendanceSubjects));
  
  // Build result object using attendance data
  const result = {};
  timetableSubjects.forEach(subject => {
    const attendanceCode = subjectMapping[subject];
    if (attendanceCode && attendanceSubjects[attendanceCode]) {
      result[subject] = attendanceSubjects[attendanceCode].totalHours;
    } else {
      // Fallback to calculated value if no attendance match found
      result[subject] = 0;
    }
  });

  return result;
};

/**
 * Create a mapping between timetable subject names and attendance subject codes
 * This function uses heuristics to match subject names with codes
 * 
 * @param {Array} timetableSubjects - Array of subject names from timetable
 * @param {Array} attendanceCodes - Array of subject codes from attendance
 * @returns {Object} Mapping object { subjectName: attendanceCode }
 */
const createSubjectMapping = (timetableSubjects, attendanceCodes) => {
  const mapping = {};
  
  timetableSubjects.forEach(subject => {
    const subjectLower = subject.toLowerCase().trim();
    
    // Apply hardcoded mappings first
    const hardcodedMapping = getHardcodedAttendanceMapping(subject);
    if (hardcodedMapping && attendanceCodes.includes(hardcodedMapping)) {
      mapping[subject] = hardcodedMapping;
      return;
    }
    
    // Find best match from attendance codes
    let bestMatch = null;
    let bestScore = 0;
    
    attendanceCodes.forEach(code => {
      const score = calculateMatchScore(subjectLower, code);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = code;
      }
    });
    
    // Only use the match if it has a reasonable score
    if (bestScore > 0.3) {
      mapping[subject] = bestMatch;
    }
  });
  
  return mapping;
};

const getHardcodedAttendanceMapping = (subject) => {
  const subjectLower = subject.toLowerCase().trim();
  
  // Skill course period -> SC3
  if (subjectLower.includes('skill course')) {
    return 'SC3';
  }
  
  // Data structure LAB -> 24CSL306
  if (subjectLower.includes('data structure') && subjectLower.includes('lab')) {
    return '24CSL306';
  }
  
  // Hardware Lab -> 24CSL307
  if (subjectLower.includes('hardware lab')) {
    return '24CSL307';
  }
  
  return null;
};

/**
 * Calculate match score between subject name and attendance code
 * 
 * @param {string} subjectName - Subject name from timetable (lowercase)
 * @param {string} attendanceCode - Subject code from attendance
 * @returns {number} Match score between 0 and 1
 */
const calculateMatchScore = (subjectName, attendanceCode) => {
  const codeLower = attendanceCode.toLowerCase();
  
  // Direct exact match
  if (subjectName === codeLower) return 1.0;
  
  // Check if subject name contains the code or vice versa
  if (subjectName.includes(codeLower) || codeLower.includes(subjectName)) {
    return 0.8;
  }
  
  // Keyword matching for common subjects
  const subjectKeywords = {
    'mathematics': ['math', 'mat', 'maths'],
    'physics': ['phy', 'phys'],
    'chemistry': ['chem', 'che'],
    'computer science': ['cs', 'cse', 'comp', 'computer'],
    'english': ['eng', 'engl'],
    'biology': ['bio', 'biol'],
    'history': ['hist', 'his'],
    'economics': ['econ', 'eco'],
    'statistics': ['stat', 'stats'],
    'programming': ['prog', 'prg'],
    'database': ['db', 'dbms'],
    'software engineering': ['se', 'swe', 'software'],
    'data structures': ['ds', 'dsa'],
    'algorithms': ['algo', 'alg'],
    'operating system': ['os', 'opsys'],
    'computer networks': ['cn', 'networks', 'net'],
    'artificial intelligence': ['ai', 'artif'],
    'machine learning': ['ml', 'mach'],
  };
  
  // Check keyword matches
  for (const [fullName, keywords] of Object.entries(subjectKeywords)) {
    if (subjectName.includes(fullName)) {
      for (const keyword of keywords) {
        if (codeLower.includes(keyword)) {
          return 0.7;
        }
      }
    }
  }
  
  // Partial word matching
  const subjectWords = subjectName.split(' ');
  const codeWords = codeLower.split(/[\s\d]+/).filter(w => w.length > 2);
  
  let matchedWords = 0;
  subjectWords.forEach(word => {
    if (word.length > 2) {
      codeWords.forEach(codeWord => {
        if (word.includes(codeWord) || codeWord.includes(word)) {
          matchedWords++;
        }
      });
    }
  });
  
  if (matchedWords > 0 && subjectWords.length > 0) {
    return Math.min(0.6, matchedWords / subjectWords.length);
  }
  
  return 0;
};

/**
 * Get summary statistics for timetable analysis with attendance integration
 * 
 * @param {Object} timetableData - The timetable data
 * @param {Object} attendanceData - The attendance data (optional)
 * @param {Date|string} targetDate - Optional target date for up-to-date calculations
 * @returns {Object} Summary statistics
 */
export const getTimetableSummary = (timetableData, attendanceData = null, targetDate = null) => {
  const weeklyClasses = getSubjectClassesPerWeek(timetableData);
  const totalSubjects = Object.keys(weeklyClasses).length;
  const totalWeeklyClasses = Object.values(weeklyClasses).reduce((sum, count) => sum + count, 0);
  
  const summary = {
    totalSubjects,
    totalWeeklyClasses,
    weeklyClassesPerSubject: weeklyClasses,
    averageClassesPerSubject: totalSubjects > 0 ? (totalWeeklyClasses / totalSubjects).toFixed(2) : 0
  };

  // Use attendance data if available, otherwise fall back to calculated values
  if (attendanceData) {
    const classesFromAttendance = getSubjectClassesFromAttendance(timetableData, attendanceData);
    const totalClassesFromAttendance = Object.values(classesFromAttendance).reduce((sum, count) => sum + count, 0);
    
    summary.classesUpToDate = classesFromAttendance;
    summary.totalClassesUpToDate = totalClassesFromAttendance;
  } else if (targetDate) {
    const classesUpToDate = getSubjectClassesUpToDate(timetableData, targetDate);
    const totalClassesUpToDate = Object.values(classesUpToDate).reduce((sum, count) => sum + count, 0);
    
    summary.classesUpToDate = classesUpToDate;
    summary.totalClassesUpToDate = totalClassesUpToDate;
  }

  return summary;
};