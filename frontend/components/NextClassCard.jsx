import React from 'react';
import { Text, View } from 'react-native';
import Card from './Card';
import commonStyles from '../styles/commonStyles';

/**
 * NextClassCard Component
 * Shows current class and next upcoming class based on timetable
 */
const NextClassCard = ({ nextClassInfo }) => {
  if (!nextClassInfo) return null;

  const { 
    currentClass, 
    nextClass, 
    isClassOngoing, 
    showTomorrowSchedule,
    currentTime 
  } = nextClassInfo;

  const renderClassInfo = (classInfo, label, isFullWidth = false) => {
    if (!classInfo) return null;

    const isFree = !classInfo.subject || classInfo.subject.toLowerCase().includes('free');

    if (isFullWidth) {
      return (
        <View style={styles.classInfoSection}>
          <View style={styles.fullWidthHeader}>
            <Text style={[styles.classLabel, styles.classLabelLarge]}>{label}</Text>
            <Text style={[styles.classTime, styles.classTimeLarge]}>{classInfo.timing}</Text>
          </View>
          <Text style={[styles.className, isFree && styles.freeClass, styles.classNameLarge]}>
            {classInfo.subject || 'Free Period'}
          </Text>
          {!isFree && classInfo.teacher && (
            <Text style={[styles.classTeacher, styles.classTeacherLarge]}>{classInfo.teacher}</Text>
          )}
        </View>
      );
    }

    return (
      <View style={styles.classInfoSection}>
        <Text style={styles.classLabel}>{label}</Text>
        <Text style={[styles.className, isFree && styles.freeClass]}>
          {classInfo.subject || 'Free Period'}
        </Text>
        <Text style={styles.classTime}>{classInfo.timing}</Text>
        {!isFree && classInfo.teacher && (
          <Text style={styles.classTeacher}>{classInfo.teacher}</Text>
        )}
      </View>
    );
  };

  return (
    <Card variant="default" withMargin marginSize="medium">
      <Card.Header>
        <View style={styles.headerContainer}>
          <Text style={commonStyles.cardTitle}>
            {showTomorrowSchedule ? "Tomorrow's Schedule" : "Current Schedule"}
          </Text>
          <Text style={styles.currentTime}>{currentTime}</Text>
        </View>
      </Card.Header>
      
      <Card.Body>
        {showTomorrowSchedule ? (
          <View style={styles.tomorrowContainer}>
            <Text style={styles.tomorrowText}>No more classes today</Text>
            <Text style={styles.tomorrowSubtext}>Tomorrow's schedule will be available</Text>
          </View>
        ) : (
          <View style={[styles.scheduleContainer, !isClassOngoing && nextClass && styles.fullWidthContainer]}>
            {isClassOngoing && currentClass && (
              <View style={styles.currentClassContainer}>
                {renderClassInfo(currentClass, "Current Class")}
                <View style={styles.ongoingIndicator}>
                  <Text style={styles.ongoingText}>ONGOING</Text>
                </View>
              </View>
            )}
            
            {nextClass && (
              <View style={[
                styles.nextClassContainer, 
                isClassOngoing && styles.withCurrentClass,
                !isClassOngoing && styles.fullWidthNextClass
              ]}>
                {renderClassInfo(nextClass, isClassOngoing ? "Next Class" : "Next Class", !isClassOngoing)}
              </View>
            )}
            
            {!isClassOngoing && !nextClass && (
              <View style={styles.noClassContainer}>
                <Text style={styles.noClassText}>No upcoming classes</Text>
              </View>
            )}
          </View>
        )}
      </Card.Body>
    </Card>
  );
};

const styles = {
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  currentTime: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 2,
  },

  scheduleContainer: {
    flexDirection: 'row',
  },

  fullWidthContainer: {
    flexDirection: 'column',
  },

  currentClassContainer: {
    flex: 1,
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    position: 'relative',
  },

  nextClassContainer: {
    flex: 1,
    paddingLeft: 12,
  },

  withCurrentClass: {
    paddingLeft: 12,
  },

  fullWidthNextClass: {
    paddingLeft: 0,
    flex: 1,
  },

  classInfoSection: {
    flex: 1,
  },

  classLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  className: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },

  freeClass: {
    color: '#9CA3AF',
    fontStyle: 'italic',
  },

  classTime: {
    fontSize: 13,
    color: '#4F46E5',
    fontWeight: '600',
    marginBottom: 2,
  },

  classTeacher: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },

  ongoingIndicator: {
    position: 'absolute',
    top: 0,
    right: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  ongoingText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  noClassContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },

  noClassText: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
  },

  tomorrowContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  tomorrowText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
    marginBottom: 4,
  },

  tomorrowSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Full width header layout
  fullWidthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  // Large text styles for full-width next class
  classLabelLarge: {
    fontSize: 14,
    textAlign: 'left',
  },

  classNameLarge: {
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 4,
  },

  classTimeLarge: {
    fontSize: 16,
    textAlign: 'right',
  },

  classTeacherLarge: {
    fontSize: 14,
    textAlign: 'left',
  },
};

export default NextClassCard;
