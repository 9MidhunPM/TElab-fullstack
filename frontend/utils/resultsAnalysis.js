/**
 * Results Analysis Utilities
 */

/**
 * Calculate attendance marks based on attendance percentage
 * 85%+ = 5/5, 80-85% = 4/5, 75-80% = 3/5, <75% = N/A
 */
export const calculateAttendanceMarks = (attendancePercentage) => {
  if (attendancePercentage >= 85) return 5;
  if (attendancePercentage >= 80) return 4;
  if (attendancePercentage >= 75) return 3;
  return null; // N/A for below 75%
};

/**
 * Convert marks to 12.5 scale (where 100% = 12.5)
 */
export const convertToScale12_5 = (marks, maxMarks) => {
  const percentage = (marks / maxMarks) * 100;
  return (percentage / 100) * 12.5;
};

/**
 * Match result subjects with attendance data
 */
export const matchSubjectWithAttendance = (subjectCode, attendanceData) => {
  if (!attendanceData) return null;
  
  const excludeKeys = ['roll_no', 'total_hours', 'total_present_hours', 'total_percentage', 'university_reg_no', 'name', 'note'];
  
  // Direct match first
  if (attendanceData[subjectCode] && !excludeKeys.includes(subjectCode)) {
    return attendanceData[subjectCode];
  }
  
  // Try partial matches
  const subjectCodeLower = subjectCode.toLowerCase();
  
  for (const [code, data] of Object.entries(attendanceData)) {
    if (excludeKeys.includes(code)) continue;
    
    const codeLower = code.toLowerCase();
    
    // Check if codes contain each other or have common patterns
    if (codeLower.includes(subjectCodeLower.substring(0, 3)) || 
        subjectCodeLower.includes(codeLower.substring(0, 3)) ||
        codeLower === subjectCodeLower ||
        codeLower.replace(/[^a-z0-9]/g, '') === subjectCodeLower.replace(/[^a-z0-9]/g, '')) {
      return data;
    }
  }
  
  return null;
};

/**
 * Generate comprehensive analysis for results with attendance integration
 */
export const getResultsAnalysis = (resultsData, attendanceData) => {
  if (!resultsData || !Array.isArray(resultsData)) return [];
  
  const analysisData = [];
  
  // Group results by subject to avoid duplicates
  const subjectMap = new Map();
  
  resultsData.forEach(result => {
    const key = result.subjectCode;
    if (!subjectMap.has(key) || subjectMap.get(key).exam < result.exam) {
      subjectMap.set(key, result);
    }
  });
  
  // Process each unique subject
  subjectMap.forEach((result, subjectCode) => {
    const attendanceInfo = matchSubjectWithAttendance(subjectCode, attendanceData);
    
    let attendanceMarks = null;
    let attendancePercentage = null;
    
    if (attendanceInfo) {
      attendancePercentage = parseFloat(attendanceInfo.attendance_percentage?.replace('%', '') || '0');
      attendanceMarks = calculateAttendanceMarks(attendancePercentage);
    }
    
    // Convert result marks to 12.5 scale for CAT-1
    const cat1Marks = convertToScale12_5(
      parseFloat(result.marksObtained), 
      parseFloat(result.maximumMarks)
    );
    
    analysisData.push({
      subjectCode: result.subjectCode,
      subjectName: result.subjectName,
      // CAT-1 (converted result marks)
      cat1: cat1Marks,
      // CAT-2 (placeholder - can be filled by user)
      cat2: 0,
      // Assignment (placeholder - can be filled by user) 
      assignment: 0,
      // Attendance marks
      attendanceMarks: attendanceMarks,
      attendancePercentage: attendancePercentage,
      // Calculate total
      get total() {
        const att = this.attendanceMarks || 0;
        return this.cat1 + this.cat2 + this.assignment + att;
      }
    });
  });
  
  return analysisData;
};