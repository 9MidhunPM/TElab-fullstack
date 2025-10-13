import { Text, View } from 'react-native';
import commonStyles from '../styles/commonStyles';
import styles from '../styles/homeScreenStyles';
import Card from './Card';

const AttendanceCard = ({ attendanceSummary }) => {
  if (!attendanceSummary) return null;

  return (
    <Card variant="default" withMargin marginSize="medium">
      <Card.Header>
        <Text style={commonStyles.cardTitle}>Attendance Overview</Text>
      </Card.Header>
      
      <Card.Body>
        <View style={styles.attendanceSummaryContainer}>
          {/* Left side - Total attendance */}
          <View style={styles.attendanceTotalSection}>
            <Text style={styles.attendanceTotalLabel}>Overall Attendance</Text>
            <Text style={styles.attendanceTotalPercentage}>
              {attendanceSummary.totalPercentage}
            </Text>
            <Text style={styles.attendanceTotalHours}>
              {attendanceSummary.totalPresentHours} / {attendanceSummary.totalHours} hours
            </Text>
          </View>

          {/* Right side - Lowest attendance or full attendance message */}
          <View style={styles.attendanceDetailsSection}>
            {attendanceSummary.hasFullAttendance ? (
              <View style={styles.fullAttendanceContainer}>
                <Text style={styles.fullAttendanceText}>🎉 Perfect Attendance!</Text>
                <Text style={styles.fullAttendanceSubtext}>
                  You have 100% attendance in all {attendanceSummary.totalSubjects} subjects. Great job!
                </Text>
              </View>
            ) : (
              <View style={styles.lowestAttendanceContainer}>
                <Text style={styles.lowestAttendanceTitle}>
                  {attendanceSummary.lowestAttendance.length > 0 ? 'Needs Attention' : 'Attendance Status'}
                </Text>
                {attendanceSummary.lowestAttendance.length > 0 ? (
                  attendanceSummary.lowestAttendance.map((subject, index) => (
                    <View key={subject.code} style={styles.lowestAttendanceItem}>
                      <Text style={styles.lowestAttendanceCode}>{subject.code}</Text>
                      <Text style={[
                        styles.lowestAttendancePercentage,
                        { color: subject.percentage >= 75 ? '#10B981' : '#EF4444' }
                      ]}>
                        {subject.attendance_percentage}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.fullAttendanceSubtext}>
                    No attendance data available
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </Card.Body>
    </Card>
  );
};

export default AttendanceCard;
