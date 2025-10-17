import { Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Card from './Card';
import {
  BookIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  SchoolIcon,
  TeacherIcon,
} from './icons/SvgIcons';

const NextClassCard = ({ nextClassInfo }) => {
  const { Colors, commonStyles } = useTheme();
  
  if (!nextClassInfo) return null;

  const { 
    currentClass, 
    nextClass, 
    isClassOngoing, 
    showTomorrowSchedule,
    currentTime 
  } = nextClassInfo;

  const renderClassInfo = (classInfo, isOngoing = false) => {
    if (!classInfo) return null;

    const isFree = !classInfo.subject || classInfo.subject.toLowerCase().includes('free');

    return (
      <View style={{
        backgroundColor: isOngoing ? Colors.timetablePrimary + '15' : Colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        borderWidth: isOngoing ? 2 : 1,
        borderColor: isOngoing ? Colors.timetablePrimary : Colors.border,
      }}>
        {isOngoing && (
          <View style={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: Colors.success,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}>
            <View style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: Colors.white,
            }} />
            <Text style={{ 
              fontSize: 11, 
              color: Colors.white, 
              fontWeight: '700',
              letterSpacing: 0.5,
            }}>
              LIVE
            </Text>
          </View>
        )}

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.primary + '15',
          alignSelf: 'flex-start',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
          marginBottom: 12,
        }}>
          <ClockIcon size={14} color={Colors.primary} />
          <Text style={{ 
            fontSize: 13, 
            color: Colors.primary, 
            fontWeight: '700',
            marginLeft: 6,
          }}>
            {classInfo.timing}
          </Text>
        </View>

        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center',
          marginBottom: 8,
        }}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: isFree ? Colors.textTertiary + '20' : Colors.primary + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}>
            <BookIcon 
              size={20} 
              color={isFree ? Colors.textTertiary : Colors.primary} 
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: '700', 
              color: isFree ? Colors.textTertiary : Colors.textPrimary,
              fontStyle: isFree ? 'italic' : 'normal',
              lineHeight: 24,
            }}>
              {classInfo.subject || 'Free Period'}
            </Text>
            {!isFree && (
              <Text style={{ 
                fontSize: 12, 
                color: Colors.textSecondary,
                fontWeight: '500',
                marginTop: 2,
              }}>
                {isOngoing ? 'Currently in session' : 'Coming up next'}
              </Text>
            )}
          </View>
        </View>

        {!isFree && classInfo.teacher && (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: Colors.border,
          }}>
            <View style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: Colors.textSecondary + '15',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}>
              <TeacherIcon size={16} color={Colors.textSecondary} />
            </View>
            <View>
              <Text style={{ 
                fontSize: 11, 
                color: Colors.textTertiary,
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>
                Instructor
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: Colors.textSecondary,
                fontWeight: '600',
                marginTop: 2,
              }}>
                {classInfo.teacher}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = () => {
    if (showTomorrowSchedule) {
      return (
        <View style={{
          alignItems: 'center',
          paddingVertical: 32,
          paddingHorizontal: 20,
        }}>
          <View style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: Colors.primary + '15',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}>
            <CalendarIcon size={32} color={Colors.primary} outline />
          </View>
          <Text style={{ 
            fontSize: 18, 
            color: Colors.textPrimary, 
            fontWeight: '700',
            marginBottom: 8,
            textAlign: 'center',
          }}>
            Day Complete! 
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: Colors.textSecondary,
            textAlign: 'center',
            lineHeight: 20,
          }}>
            No more classes today.{'\n'}Tomorrow's schedule will be available soon.
          </Text>
        </View>
      );
    }

    return (
      <View style={{
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 20,
      }}>
        <View style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: Colors.success + '15',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}>
          <CheckCircleIcon size={32} color={Colors.success} />
        </View>
        <Text style={{ 
          fontSize: 18, 
          color: Colors.textPrimary, 
          fontWeight: '700',
          marginBottom: 8,
          textAlign: 'center',
        }}>
          All Clear! 
        </Text>
        <Text style={{ 
          fontSize: 14, 
          color: Colors.textSecondary,
          textAlign: 'center',
        }}>
          No upcoming classes scheduled
        </Text>
      </View>
    );
  };

  return (
    <Card variant="default" withMargin marginSize="medium">
      <Card.Header>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: Colors.primary + '15',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}>
              <SchoolIcon size={20} color={Colors.primary} />
            </View>
            <View>
              <Text style={commonStyles.cardTitle}>
                {isClassOngoing ? ' Current Class' : showTomorrowSchedule ? "Tomorrow's Classes" : ' Next Class'}
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: Colors.textTertiary,
                fontWeight: '500',
                marginTop: 2,
              }}>
                {currentTime}
              </Text>
            </View>
          </View>
        </View>
      </Card.Header>
      
      <Card.Body>
        {showTomorrowSchedule || (!isClassOngoing && !nextClass) ? (
          renderEmptyState()
        ) : (
          <>
            {isClassOngoing && currentClass && renderClassInfo(currentClass, true)}
            {!isClassOngoing && nextClass && renderClassInfo(nextClass, false)}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default NextClassCard;
