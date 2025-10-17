import { Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Card from './Card';
import { CalendarIcon, CheckCircleIcon, PercentIcon, WarningIcon } from './icons/SvgIcons';

const AttendanceCard = ({ attendanceSummary }) => {
  const { Colors, commonStyles, homeScreenStyles: styles } = useTheme();
  
  if (!attendanceSummary) return null;

  return (
    <Card variant="default" withMargin marginSize="medium">
      <Card.Header>
        <View style={commonStyles.iconTextRow}>
          <View style={commonStyles.iconContainer}>
            <CalendarIcon size={20} color={Colors.primary} />
          </View>
          <Text style={commonStyles.cardTitle}>Attendance Summary</Text>
        </View>
      </Card.Header>
      
      <Card.Body>
        <View style={styles.attendanceSummaryContainer}>
          {/* Left side - Total attendance */}
          <View style={styles.attendanceTotalSection}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
              <View style={{ width: 20, alignItems: 'center', marginRight: 6, marginTop: 2 }}>
                <PercentIcon size={16} color={Colors.textSecondary} />
              </View>
              <Text style={styles.attendanceTotalLabel}>Overall Attendance</Text>
            </View>
            <Text style={styles.attendanceTotalPercentage}>
              {attendanceSummary.totalPercentage}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{ width: 18, alignItems: 'center', marginRight: 6, marginTop: 2 }}>
                <CalendarIcon size={14} color={Colors.textSecondary} outline />
              </View>
              <Text style={styles.attendanceTotalHours}>
                {attendanceSummary.totalPresentHours} / {attendanceSummary.totalHours} hours
              </Text>
            </View>
          </View>

          {/* Right side - Lowest attendance or full attendance message */}
          <View style={styles.attendanceDetailsSection}>
            {attendanceSummary.hasFullAttendance ? (
              <View style={styles.fullAttendanceContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
                  <View style={{ width: 22, alignItems: 'center', marginRight: 8, marginTop: 2 }}>
                    <CheckCircleIcon size={18} color={Colors.success} />
                  </View>
                  <Text style={styles.fullAttendanceText}>Perfect Attendance!</Text>
                </View>
                <Text style={styles.fullAttendanceSubtext}>
                  You have 100% attendance in all {attendanceSummary.totalSubjects} subjects. Great job!
                </Text>
              </View>
            ) : (
              <View style={styles.lowestAttendanceContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
                  <View style={{ width: 20, alignItems: 'center', marginRight: 6, marginTop: 2 }}>
                    <WarningIcon size={16} color={Colors.warning} />
                  </View>
                  <Text style={styles.lowestAttendanceTitle}>
                    {attendanceSummary.lowestAttendance.length > 0 ? 'Needs Attention' : 'Attendance Status'}
                  </Text>
                </View>
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
