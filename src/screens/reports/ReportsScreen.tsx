import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Animated,
  Switch,
  Dimensions,
} from 'react-native';
import { Colors } from '../../theme/colors';
import ReportCard from './components/ReportCard';
import EmptyState from './components/EmptyState';
import QuickActions from './components/QuickActions';

const { width } = Dimensions.get('window');

interface Report {
  id: string;
  title: string;
  date: string;
  preview: string;
  provider: string;
  location?: string;
  type: 'physical' | 'lab' | 'insurance' | 'specialist' | 'prescription' | 'imaging' | 'mental';
  status?: 'ready' | 'processing';
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Annual Physical Examination',
    date: 'Nov 7, 2024',
    preview: 'Comprehensive health screening showing normal cardiovascular function, blood panels within standard ranges, BMI at 22.4. All vital signs stable and within healthy parameters.',
    provider: 'Dr. Sarah Chen',
    location: 'Seimeo Medical Center',
    type: 'physical',
    status: 'ready',
  },
  {
    id: '2',
    title: 'Blood Work Analysis',
    date: 'Oct 15, 2024',
    preview: 'CBC results indicate healthy red and white cell counts. Cholesterol levels: Total 185 mg/dL, HDL 62 mg/dL, LDL 98 mg/dL. Glucose fasting: 92 mg/dL.',
    provider: 'Quest Diagnostics',
    type: 'lab',
    status: 'ready',
  },
  {
    id: '3',
    title: 'Insurance Claim #4829',
    date: 'Oct 3, 2024',
    preview: 'Claim processed for cardiology consultation. Coverage approved at 80% after deductible. Patient responsibility: $240. EOB available for download.',
    provider: 'Blue Cross Blue Shield',
    type: 'insurance',
    status: 'ready',
  },
  {
    id: '4',
    title: 'Cardiology Consultation',
    date: 'Sep 28, 2024',
    preview: 'ECG shows normal sinus rhythm. No significant arrhythmias detected. Exercise stress test completed successfully with good functional capacity.',
    provider: 'Dr. Michael Torres',
    location: 'Heart & Vascular Institute',
    type: 'specialist',
    status: 'ready',
  },
  {
    id: '5',
    title: 'Prescription History Q3 2024',
    date: 'Sep 30, 2024',
    preview: 'Quarterly summary of medications: Lisinopril 10mg (30-day supply x3), Vitamin D3 2000IU (90-day supply), Atorvastatin 20mg (90-day supply).',
    provider: 'CVS Pharmacy',
    type: 'prescription',
    status: 'ready',
  },
  {
    id: '6',
    title: 'Chest X-Ray Results',
    date: 'Aug 14, 2024',
    preview: 'Lungs are clear bilaterally. No acute cardiopulmonary process. Heart size normal. No pleural effusion or pneumothorax identified.',
    provider: 'Radiology Associates',
    location: 'Seimeo Imaging Center',
    type: 'imaging',
    status: 'ready',
  },
];

const ReportsScreen: React.FC = () => {
  const [showMockData, setShowMockData] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const toggleMockData = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowMockData(!showMockData);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleReportPress = (report: Report) => {
    // Navigate to detail screen
    console.log('Navigate to report detail:', report.id);
  };

  const handleLongPress = (reportId: string) => {
    if (selectedReports.includes(reportId)) {
      setSelectedReports(selectedReports.filter(id => id !== reportId));
    } else {
      setSelectedReports([...selectedReports, reportId]);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>Reports</Text>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Mock Data</Text>
          <Switch
            value={showMockData}
            onValueChange={toggleMockData}
            trackColor={{ false: Colors.borderLight, true: Colors.black }}
            thumbColor={Colors.white}
            ios_backgroundColor={Colors.borderLight}
            style={styles.switch}
          />
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );

  const renderReport = ({ item, index }: { item: Report; index: number }) => (
    <ReportCard
      report={item}
      onPress={() => handleReportPress(item)}
      onLongPress={() => handleLongPress(item.id)}
      isSelected={selectedReports.includes(item.id)}
      index={index}
    />
  );

  const displayData = showMockData ? mockReports : [];

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        {!showMockData || displayData.length === 0 ? (
          <EmptyState onGeneratePress={(type) => console.log('Generate:', type)} />
        ) : (
          <>
            <QuickActions onPress={(type) => console.log('Generate:', type)} />
            <FlatList
              data={displayData}
              renderItem={renderReport}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={Colors.black}
                />
              }
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    backgroundColor: Colors.white,
    paddingTop: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.black,
    letterSpacing: -0.5,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleLabel: {
    fontSize: 13,
    color: Colors.textTertiary,
    fontWeight: '500',
  },
  switch: {
    transform: [{ scale: 0.8 }],
  },
  divider: {
    height: 0.5,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  separator: {
    height: 12,
  },
});

export default ReportsScreen;