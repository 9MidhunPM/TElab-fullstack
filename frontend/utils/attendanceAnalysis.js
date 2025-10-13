/**
 * Attendance Analysis Utilities
 */

import { getSubjectClassesPerWeek } from './timetableAnalysis';

/**
 * Format date to DD-MM-YY format
 */
export const formatDateToDDMMYY = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
};

/**
 * Calculate projected attendance if user attends all remaining classes till target date
 */
export const calculateProjectedAttendance = (attendanceData, timetableData, targetDate) => {
  if (!attendanceData || !timetableData) return {};

  const excludeKeys = ['roll_no', 'total_hours', 'total_present_hours', 'total_percentage', 'university_reg_no', 'name', 'note'];
  const subjects = {};
  const weeklyClasses = getSubjectClassesPerWeek(timetableData);
  const today = new Date();
  const target = new Date(targetDate);
  
  // Calculate weeks between today and target date
  const timeDiff = target.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const weeksDiff = Math.max(0, daysDiff / 7);
  
  Object.entries(attendanceData)
    .filter(([key]) => !excludeKeys.includes(key))
    .forEach(([code, data]) => {
      const currentPresent = parseInt(data.present_hours) || 0;
      const currentTotal = parseInt(data.total_hours) || 0;
      
      // Use hardcoded mappings and fallback to basic matching
      let additionalClasses = 0;
      
      // Direct mappings
      if (code === 'SC3') {
        additionalClasses = Math.ceil((weeklyClasses['Skill course'] || 0) * weeksDiff);
      } else if (code === '24CSL307') {
        additionalClasses = Math.ceil((weeklyClasses['Hardware Lab'] || 0) * weeksDiff);
      } else {
        // Find best match in timetable subjects
        Object.entries(weeklyClasses).forEach(([subject, weeklyCount]) => {
          const subjectLower = subject.toLowerCase();
          const codeLower = code.toLowerCase();
          
          if (subjectLower.includes('math') && codeLower.includes('math')) {
            additionalClasses = Math.ceil(weeklyCount * weeksDiff);
          } else if (subjectLower.includes('phys') && codeLower.includes('phy')) {
            additionalClasses = Math.ceil(weeklyCount * weeksDiff);
          } else if (subjectLower.includes('chem') && codeLower.includes('che')) {
            additionalClasses = Math.ceil(weeklyCount * weeksDiff);
          } else if (subjectLower.includes('computer') && codeLower.includes('cs')) {
            additionalClasses = Math.ceil(weeklyCount * weeksDiff);
          } else if (subjectLower.includes('english') && codeLower.includes('eng')) {
            additionalClasses = Math.ceil(weeklyCount * weeksDiff);
          } else if (codeLower.includes(subjectLower.substring(0, 3)) || 
                     subjectLower.includes(codeLower.substring(0, 3))) {
            additionalClasses = Math.ceil(weeklyCount * weeksDiff);
          }
        });
      }
      
      const projectedTotal = currentTotal + additionalClasses;
      const projectedPresent = currentPresent + additionalClasses;
      const projectedPercentage = projectedTotal > 0 ? ((projectedPresent / projectedTotal) * 100) : 0;
      
      subjects[code] = {
        currentPresent,
        currentTotal,
        currentPercentage: parseFloat(data.attendance_percentage.replace('%', '')),
        additionalClasses,
        projectedTotal,
        projectedPresent,
        projectedPercentage: Math.round(projectedPercentage * 100) / 100
      };
    });

  return subjects;
};

/**
 * Calculate how many classes can be skipped while maintaining target percentage
 */
export const calculateSkippableClasses = (attendanceData, timetableData, targetDate, targetPercentage = 75) => {
  if (!attendanceData || !timetableData) return {};

  const excludeKeys = ['roll_no', 'total_hours', 'total_present_hours', 'total_percentage', 'university_reg_no', 'name', 'note'];
  const subjects = {};
  const weeklyClasses = getSubjectClassesPerWeek(timetableData);
  const today = new Date();
  const target = new Date(targetDate);
  
  const timeDiff = target.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const weeksDiff = Math.max(0, daysDiff / 7);
  
  Object.entries(attendanceData)
    .filter(([key]) => !excludeKeys.includes(key))
    .forEach(([code, data]) => {
      const currentPresent = parseInt(data.present_hours) || 0;
      const currentTotal = parseInt(data.total_hours) || 0;
      
      let additionalClasses = 0;
      
      // Use same mapping logic as perfect attendance
      if (code === 'SC3') {
        additionalClasses = Math.ceil((weeklyClasses['Skill course'] || 0) * weeksDiff);
      } else if (code === '24CSL307') {
        additionalClasses = Math.ceil((weeklyClasses['Hardware Lab'] || 0) * weeksDiff);
      } else {
        Object.entries(weeklyClasses).forEach(([subject, weeklyCount]) => {
          const subjectLower = subject.toLowerCase();
          const codeLower = code.toLowerCase();
          
          if (subjectLower.includes('math') && codeLower.includes('math')) {
            additionalClasses = Math.ceil(weeklyCount * weeksDiff);
          } else if (subjectLower.includes('phys') && codeLower.includes('phy')) {
            additionalClasses = Math.ceil(weeklyCount * weeksDiff);
          } else if (subjectLower.includes('chem') && codeLower.includes('che')) {
            additionalClasses = Math.ceil(weeklyCount * weeksDiff);
          } else if (subjectLower.includes('computer') && codeLower.includes('cs')) {
            additionalClasses = Math.ceil(weeklyCount * weeksDiff);
          } else if (subjectLower.includes('english') && codeLower.includes('eng')) {
            additionalClasses = Math.ceil(weeklyCount * weeksDiff);
          } else if (codeLower.includes(subjectLower.substring(0, 3)) || 
                     subjectLower.includes(codeLower.substring(0, 3))) {
            additionalClasses = Math.ceil(weeklyCount * weeksDiff);
          }
        });
      }
      
      const finalTotal = currentTotal + additionalClasses;
      const minClassesNeeded = Math.ceil((targetPercentage / 100) * finalTotal);
      const maxCanAttend = currentPresent + additionalClasses;
      const canSkip = Math.max(0, maxCanAttend - minClassesNeeded);
      const optimalPresent = Math.min(maxCanAttend, Math.max(minClassesNeeded, currentPresent));
      const optimalPercentage = finalTotal > 0 ? ((optimalPresent / finalTotal) * 100) : 0;
      
      subjects[code] = {
        currentPresent,
        currentTotal,
        currentPercentage: parseFloat(data.attendance_percentage.replace('%', '')),
        additionalClasses,
        finalTotal,
        minClassesNeeded,
        canSkip,
        optimalPresent,
        optimalPercentage: Math.round(optimalPercentage * 100) / 100,
        canMaintainTarget: optimalPercentage >= targetPercentage
      };
    });

  return subjects;
};

/**
 * Get comprehensive analysis for a target date
 */
export const getComprehensiveAnalysis = (attendanceData, timetableData, targetDate) => {
  return {
    perfectAttendance: calculateProjectedAttendance(attendanceData, timetableData, targetDate),
    skip75: calculateSkippableClasses(attendanceData, timetableData, targetDate, 75),
    skip85: calculateSkippableClasses(attendanceData, timetableData, targetDate, 85),
    targetDate: targetDate
  };
};