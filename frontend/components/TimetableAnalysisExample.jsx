/**
 * Example usage of timetable analysis functions
 * 
 * This file demonstrates how to use the timetable analysis utilities
 * in your React Native components.
 */

import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useAppData } from '../contexts/DataContext';
import {
    formatSubjectCounts,
    getSubjectClassesPerWeek,
    getSubjectClassesUpToDate,
    getTimetableSummary
} from '../utils/timetableAnalysis';

export default function TimetableAnalysisExample() {
  const { appData } = useAppData();
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    if (appData.timetable) {
      // Example 1: Get classes per week
      const weeklyClasses = getSubjectClassesPerWeek(appData.timetable);
      
      // Example 2: Get classes up to a specific date (e.g., today)
      const today = new Date();
      const classesUpToToday = getSubjectClassesUpToDate(appData.timetable, today);
      
      // Example 3: Get classes up to a future date (e.g., end of month)
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const classesUpToEndOfMonth = getSubjectClassesUpToDate(appData.timetable, endOfMonth);
      
      // Example 4: Format results for display
      const formattedWeekly = formatSubjectCounts(weeklyClasses, 'weekly');
      const formattedTotal = formatSubjectCounts(classesUpToToday, 'total');
      
      // Example 5: Get comprehensive summary
      const summary = getTimetableSummary(appData.timetable, today);

      setAnalysisData({
        weeklyClasses,
        classesUpToToday,
        classesUpToEndOfMonth,
        formattedWeekly,
        formattedTotal,
        summary
      });
    }
  }, [appData.timetable]);

  if (!analysisData) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading timetable analysis...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Timetable Analysis Example
      </Text>

      {/* Weekly Classes Section */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Classes Per Week
        </Text>
        {analysisData.formattedWeekly.map((item, index) => (
          <Text key={index} style={{ marginBottom: 5 }}>
            {item.displayText}
          </Text>
        ))}
      </View>

      {/* Classes Up To Today Section */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Total Classes Up To Today
        </Text>
        {analysisData.formattedTotal.map((item, index) => (
          <Text key={index} style={{ marginBottom: 5 }}>
            {item.displayText}
          </Text>
        ))}
      </View>

      {/* Summary Section */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Summary Statistics
        </Text>
        <Text>Total Subjects: {analysisData.summary.totalSubjects}</Text>
        <Text>Total Weekly Classes: {analysisData.summary.totalWeeklyClasses}</Text>
        <Text>Average Classes per Subject: {analysisData.summary.averageClassesPerSubject}</Text>
        <Text>Total Classes Up To Today: {analysisData.summary.totalClassesUpToDate}</Text>
      </View>

      {/* Raw Data Examples */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Raw Data Examples
        </Text>
        
        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Weekly Classes Object:</Text>
        <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>
          {JSON.stringify(analysisData.weeklyClasses, null, 2)}
        </Text>
        
        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Classes Up To Today:</Text>
        <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>
          {JSON.stringify(analysisData.classesUpToToday, null, 2)}
        </Text>
      </View>
    </ScrollView>
  );
}

/**
 * Usage in other components:
 * 
 * import { getSubjectClassesPerWeek, getSubjectClassesUpToDate } from '../utils/timetableAnalysis';
 * import { useAppData } from '../contexts/DataContext';
 * 
 * function MyComponent() {
 *   const { appData } = useAppData();
 *   
 *   // Get weekly classes
 *   const weeklyClasses = getSubjectClassesPerWeek(appData.timetable);
 *   console.log('Weekly classes:', weeklyClasses);
 *   // Output: { "Mathematics": 4, "Physics": 3, ... }
 *   
 *   // Get classes up to a specific date
 *   const targetDate = new Date('2025-12-31');
 *   const totalClasses = getSubjectClassesUpToDate(appData.timetable, targetDate);
 *   console.log('Total classes up to end of year:', totalClasses);
 *   // Output: { "Mathematics": 64, "Physics": 48, ... }
 *   
 *   return (
 *     <View>
 *       {Object.entries(weeklyClasses).map(([subject, count]) => (
 *         <Text key={subject}>{subject}: {count} classes per week</Text>
 *       ))}
 *     </View>
 *   );
 * }
 */