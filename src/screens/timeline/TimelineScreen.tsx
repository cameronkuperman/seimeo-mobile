import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
  FlatList,
  Dimensions,
} from 'react-native';
import { Colors } from '../../theme/colors';
import TimelineItem from '../../components/timeline/TimelineItem';
import DateGroup from '../../components/timeline/DateGroup';
import QuickAddButton from '../../components/timeline/QuickAddButton';
import QuickAddModal from '../../components/timeline/QuickAddModal';

const { width } = Dimensions.get('window');

interface TimelineEntry {
  id: string;
  type: 'quickScan' | 'deepDive' | 'photoSession' | 'symptom' | 'report' | 'oracleChat';
  title: string;
  description?: string;
  timestamp: Date;
  data?: any;
  severity?: 'low' | 'medium' | 'high';
  hasFollowUp?: boolean;
  isExpanded?: boolean;
}

interface GroupedData {
  date: string;
  dateLabel: string;
  items: TimelineEntry[];
}

const TimelineScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [quickAddModalVisible, setQuickAddModalVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const filters = ['All', 'Symptoms', 'Assessments', 'Photos', 'Reports'];

  // Mock data - replace with real data from context/API
  const mockTimelineData: TimelineEntry[] = [
    {
      id: '1',
      type: 'symptom',
      title: 'Migraine',
      description: 'Moderate headache on left side',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      severity: 'medium',
      data: { painLevel: 3, location: 'Left temple' },
    },
    {
      id: '2', 
      type: 'quickScan',
      title: 'Jenny Steele Scans',
      description: 'Dr. Anderson | City Health Center',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      data: { imaging: 'MEDICAL IMAGING', status: 'completed' },
    },
    {
      id: '3',
      type: 'report',
      title: 'Complete Blood Count (CBC)',
      description: 'Endo Labs',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      data: { status: 'LAB RESULT', wbc: 39000 },
      hasFollowUp: true,
    },
    {
      id: '4',
      type: 'photoSession',
      title: 'Skin Rash Tracking',
      description: 'Day 3 of 7',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      data: { photos: 3, progress: 42 },
    },
    {
      id: '5',
      type: 'deepDive',
      title: 'Comprehensive Assessment',
      description: 'O3-level analysis completed',
      timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
      data: { risk: 78, recommendations: 5 },
    },
  ];

  // Group data by date
  const groupDataByDate = (data: TimelineEntry[]): GroupedData[] => {
    const grouped = data.reduce((acc: { [key: string]: GroupedData }, item) => {
      const dateKey = item.timestamp.toDateString();
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
      
      let dateLabel = dateKey;
      if (dateKey === today) {
        dateLabel = 'Today';
      } else if (dateKey === yesterday) {
        dateLabel = 'Yesterday';
      } else {
        dateLabel = item.timestamp.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: item.timestamp.getFullYear() !== new Date().getFullYear() 
            ? 'numeric' 
            : undefined
        });
      }

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          dateLabel,
          items: [],
        };
      }
      acc[dateKey].items.push(item);
      return acc;
    }, {});

    // Sort by date (most recent first) and sort items within each group
    return Object.values(grouped)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(group => ({
        ...group,
        items: group.items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
      }));
  };

  const filteredData = mockTimelineData.filter(item => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Symptoms' && item.type === 'symptom') return true;
    if (selectedFilter === 'Assessments' && 
        (item.type === 'quickScan' || item.type === 'deepDive')) return true;
    if (selectedFilter === 'Photos' && item.type === 'photoSession') return true;
    if (selectedFilter === 'Reports' && item.type === 'report') return true;
    return false;
  });

  const groupedData = groupDataByDate(filteredData);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.98],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Text style={styles.headerTitle}>Record Timeline</Text>
        <View style={styles.searchRow}>
          <TouchableOpacity style={styles.searchBar}>
            <Text style={styles.searchPlaceholder}>Search</Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterPill,
                selectedFilter === filter && styles.filterPillActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {groupedData.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No records yet</Text>
            <Text style={styles.emptySubtext}>
              Start tracking your health journey
            </Text>
          </View>
        ) : (
          groupedData.map((group, groupIndex) => (
            <View key={group.date}>
              <DateGroup date={group.dateLabel} />
              {group.items.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  isFirst={index === 0}
                  isLast={index === group.items.length - 1 && groupIndex === groupedData.length - 1}
                />
              ))}
            </View>
          ))
        )}
        <View style={styles.bottomPadding} />
      </Animated.ScrollView>

      <QuickAddButton onPress={() => setQuickAddModalVisible(true)} />

      <QuickAddModal
        visible={quickAddModalVisible}
        onClose={() => setQuickAddModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: Colors.background,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  searchRow: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  searchBar: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  searchPlaceholder: {
    color: Colors.textPlaceholder,
    fontSize: 16,
  },
  filterContainer: {
    paddingHorizontal: 20,
  },
  filterContent: {
    paddingRight: 20,
    gap: 8,
    flexDirection: 'row',
    paddingVertical: 4,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: Colors.black,
  },
  filterText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: Colors.textTertiary,
  },
  bottomPadding: {
    height: 100,
  },
});

export default TimelineScreen;