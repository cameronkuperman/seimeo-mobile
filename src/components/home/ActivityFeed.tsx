import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';

interface Activity {
  id: string;
  date: string;
  type: 'scan' | 'photo' | 'report' | 'deepdive' | 'chat';
  title: string;
  icon: string;
  status: 'complete' | 'ready' | 'pending';
}

const ActivityFeed: React.FC = () => {
  const navigation = useNavigation();

  const activities: Activity[] = [
    {
      id: '1',
      date: 'Nov 6',
      type: 'scan',
      title: 'Headache assessment',
      icon: '✓',
      status: 'complete',
    },
    {
      id: '2',
      date: 'Nov 6',
      type: 'report',
      title: 'Specialist report ready',
      icon: '📄',
      status: 'ready',
    },
    {
      id: '3',
      date: 'Nov 3',
      type: 'photo',
      title: 'Skin tracking (4 photos)',
      icon: '📸',
      status: 'complete',
    },
    {
      id: '4',
      date: 'Oct 28',
      type: 'deepdive',
      title: 'Deep dive completed',
      icon: '🧠',
      status: 'complete',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return Colors.health;
      case 'ready': return Colors.ocean;
      case 'pending': return Colors.textTertiary;
      default: return Colors.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.cardTitle}>Your Health Activity</Text>
        </View>

        <View style={styles.activitiesList}>
          {activities.map((activity, index) => (
            <TouchableOpacity
              key={activity.id}
              style={[
                styles.activityItem,
                index === activities.length - 1 && styles.lastActivityItem,
              ]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Timeline' as never)}
            >
              <View style={styles.activityContent}>
                <View style={styles.dateContainer}>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                </View>
                <View style={styles.activityDetails}>
                  <Text style={styles.activityTitle}>
                    • {activity.title}
                  </Text>
                </View>
                <Text style={[
                  styles.activityIcon,
                  { color: getStatusColor(activity.status) }
                ]}>
                  {activity.icon}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.viewAllButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Timeline' as never)}
        >
          <Text style={styles.viewAllText}>View full timeline</Text>
          <Text style={styles.viewAllChevron}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  activitiesList: {
    paddingHorizontal: 16,
  },
  activityItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderLight,
  },
  lastActivityItem: {
    borderBottomWidth: 0,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    width: 50,
  },
  activityDate: {
    fontSize: 13,
    color: Colors.textTertiary,
    letterSpacing: -0.1,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  activityIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 0.5,
    borderTopColor: Colors.borderLight,
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 15,
    color: Colors.ocean,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  viewAllChevron: {
    fontSize: 20,
    color: Colors.ocean,
  },
});

export default ActivityFeed;